<?php
// app/Filament/Resources/LibraryAttendanceResource.php
namespace App\Filament\Resources;

use App\Filament\Resources\LibraryAttendanceResource\Pages;
use App\Models\LibraryAttendance;
use App\Models\Participant;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use pxlrbt\FilamentExcel\Actions\Tables\ExportBulkAction;
use pxlrbt\FilamentExcel\Actions\Tables\ExportAction;
use pxlrbt\FilamentExcel\Exports\ExcelExport;

class LibraryAttendanceResource extends Resource
{
   protected static ?string $model = LibraryAttendance::class;
   protected static ?string $navigationIcon = 'heroicon-o-book-open';
   protected static ?string $navigationLabel = 'Daftar Hadir Perpustakaan';
   protected static ?string $modelLabel = 'Daftar Hadir';
   protected static ?string $pluralModelLabel = 'Daftar Hadir Perpustakaan';

   public static function form(Form $form): Form
   {
       return $form
           ->schema([
               Forms\Components\Section::make('Informasi Kunjungan')
                   ->schema([
                       Forms\Components\Select::make('participant_type')
                           ->label('Tipe Pengunjung')
                           ->options([
                               'child' => 'Anak-anak',
                               'general' => 'Umum'
                           ])
                           ->required()
                           ->reactive()
                           ->native(false)
                           ->afterStateUpdated(function ($state, Forms\Set $set) {
                               if ($state) {
                                   $participant = Participant::create([
                                       'name' => 'Pengunjung ' . ucfirst($state) . ' - ' . now()->format('d/m/Y H:i'),
                                       'type' => $state
                                   ]);
                                   $set('participant_id', $participant->id);
                               }
                           })
                           ->dehydrated(false),

                       Forms\Components\Hidden::make('participant_id'),

                       Forms\Components\DatePicker::make('visit_date')
                           ->label('Tanggal Kunjungan')
                           ->required()
                           ->default(now())
                           ->native(false),

                       Forms\Components\TimePicker::make('visit_time')
                           ->label('Waktu Kunjungan')
                           ->required()
                           ->default(now())
                           ->seconds(false),
                   ])
                   ->columns(2),

               Forms\Components\Section::make('Data Anak-anak')
                   ->description('Khusus untuk pengunjung anak-anak')
                   ->schema([
                       Forms\Components\TextInput::make('child_name')
                           ->label('Nama Anak')
                           ->required()
                           ->maxLength(255)
                           ->placeholder('Masukkan nama lengkap anak'),
                       
                       Forms\Components\Textarea::make('child_address')
                           ->label('Alamat Anak')
                           ->required()
                           ->rows(2)
                           ->maxLength(300)
                           ->placeholder('Masukkan alamat lengkap'),
                   ])
                   ->visible(fn (Forms\Get $get): bool => $get('participant_type') === 'child'),

               Forms\Components\Section::make('Data Umum')
                   ->description('Khusus untuk pengunjung umum/dewasa')
                   ->schema([
                       Forms\Components\TextInput::make('general_name')
                           ->label('Nama Lengkap')
                           ->required()
                           ->maxLength(255)
                           ->placeholder('Masukkan nama lengkap'),
                       
                       Forms\Components\Textarea::make('general_address')
                           ->label('Alamat')
                           ->required()
                           ->rows(2)
                           ->maxLength(300)
                           ->placeholder('Masukkan alamat lengkap'),
                       
                       Forms\Components\TextInput::make('institution')
                           ->label('Institusi/Lembaga')
                           ->required()
                           ->maxLength(255)
                           ->placeholder('Sekolah, Universitas, Perusahaan, dll')
                           ->helperText('Masukkan nama sekolah, universitas, perusahaan, atau lembaga'),
                       
                       Forms\Components\Textarea::make('notes')
                           ->label('Keterangan')
                           ->rows(2)
                           ->maxLength(200)
                           ->placeholder('Keterangan tambahan (opsional)'),
                   ])
                   ->visible(fn (Forms\Get $get): bool => $get('participant_type') === 'general'),
           ]);
   }

   public static function table(Table $table): Table
   {
       return $table
           ->defaultSort('visit_date', 'desc')
           ->columns([
               Tables\Columns\TextColumn::make('visit_date')
                   ->label('Tanggal')
                   ->date('d/m/Y')
                   ->sortable()
                   ->searchable(),

               Tables\Columns\TextColumn::make('visit_time')
                   ->label('Waktu')
                   ->time('H:i')
                   ->sortable(),

               Tables\Columns\BadgeColumn::make('participant.type')
                   ->label('Kategori')
                   ->colors([
                       'primary' => 'child',
                       'success' => 'general',
                   ])
                   ->formatStateUsing(fn (string $state): string => [
                       'child' => 'Anak-anak',
                       'general' => 'Umum',
                   ][$state] ?? $state),

               Tables\Columns\TextColumn::make('visitor_name')
                   ->label('Nama Pengunjung')
                   ->searchable(['child_name', 'general_name'])
                   ->limit(25)
                   ->tooltip(function (Tables\Columns\TextColumn $column): ?string {
                       $state = $column->getState();
                       return strlen($state) > 25 ? $state : null;
                   })
                   ->getStateUsing(function (LibraryAttendance $record): string {
                       return $record->visitor_name;
                   }),

               Tables\Columns\TextColumn::make('visitor_address')
                   ->label('Alamat')
                   ->limit(30)
                   ->tooltip(function (Tables\Columns\TextColumn $column): ?string {
                       $state = $column->getState();
                       return strlen($state) > 30 ? $state : null;
                   })
                   ->getStateUsing(function (LibraryAttendance $record): string {
                       return $record->visitor_address;
                   }),

               Tables\Columns\TextColumn::make('institution')
                   ->label('Institusi')
                   ->limit(20)
                   ->placeholder('-')
                   ->toggleable(),

               Tables\Columns\TextColumn::make('notes')
                   ->label('Keterangan')
                   ->limit(25)
                   ->placeholder('-')
                   ->toggleable()
                   ->toggledHiddenByDefault(),

               Tables\Columns\TextColumn::make('created_at')
                   ->label('Dicatat')
                   ->dateTime('d/m/Y H:i')
                   ->sortable()
                   ->toggleable()
                   ->toggledHiddenByDefault(),
           ])
           ->filters([
               SelectFilter::make('participant_type')
                   ->label('Kategori')
                   ->options([
                       'child' => 'Anak-anak',
                       'general' => 'Umum'
                   ])
                   ->native(false)
                   ->query(function (Builder $query, array $data): Builder {
                       return $query->when(
                           $data['value'],
                           fn (Builder $query, $value): Builder => $query->whereHas('participant', 
                               fn (Builder $query) => $query->where('type', $value)
                           ),
                       );
                   }),

               Filter::make('hari_ini')
                   ->label('Hari Ini')
                   ->query(fn (Builder $query): Builder => $query->whereDate('visit_date', now()->toDateString()))
                   ->default(),

               Filter::make('bulan_ini')
                   ->label('Bulan Ini')
                   ->query(fn (Builder $query): Builder => $query->whereMonth('visit_date', now()->month)
                       ->whereYear('visit_date', now()->year)),

               Filter::make('tanggal_range')
                   ->form([
                       Forms\Components\DatePicker::make('dari_tanggal')
                           ->label('Dari Tanggal')
                           ->native(false),
                       Forms\Components\DatePicker::make('sampai_tanggal')
                           ->label('Sampai Tanggal')
                           ->native(false),
                   ])
                   ->query(function (Builder $query, array $data): Builder {
                       return $query
                           ->when(
                               $data['dari_tanggal'],
                               fn (Builder $query, $date): Builder => $query->whereDate('visit_date', '>=', $date),
                           )
                           ->when(
                               $data['sampai_tanggal'],
                               fn (Builder $query, $date): Builder => $query->whereDate('visit_date', '<=', $date),
                           );
                   }),
           ])
           ->actions([
               Tables\Actions\ViewAction::make()->iconButton(),
               Tables\Actions\EditAction::make()->iconButton(),
               Tables\Actions\DeleteAction::make()->iconButton(),
           ])
           ->bulkActions([
               Tables\Actions\BulkActionGroup::make([
                   Tables\Actions\DeleteBulkAction::make(),
                   ExportBulkAction::make()
                       ->label('Export ke Excel')
                       ->icon('heroicon-o-document-arrow-down')
                       ->exports([
                           ExcelExport::make()
                               ->fromTable()
                               ->withFilename('daftar-hadir-perpustakaan-' . date('d-m-Y'))
                               ->withWriterType(\Maatwebsite\Excel\Excel::XLSX)
                       ]),
               ]),
           ])
           ->headerActions([
               ExportAction::make()
                   ->label('Export Excel')
                   ->color('success')
                   ->icon('heroicon-o-document-arrow-down')
                   ->exports([
                       ExcelExport::make()
                           ->fromTable()
                           ->withFilename('daftar-hadir-perpustakaan-' . date('d-m-Y'))
                           ->withWriterType(\Maatwebsite\Excel\Excel::XLSX)
                   ]),
           ])
           ->defaultPaginationPageOption(5)
           ->poll(null)
           ->deferLoading()
           ->striped(false)
           ->persistFiltersInSession(false);
   }

   public static function getPages(): array
   {
       return [
           'index' => Pages\ListLibraryAttendances::route('/'),
           'create' => Pages\CreateLibraryAttendance::route('/create'),
           'edit' => Pages\EditLibraryAttendance::route('/{record}/edit'),
           'view' => Pages\ViewLibraryAttendance::route('/{record}'),
       ];
   }

   public static function getNavigationBadge(): ?string
   {
       return cache()->remember('library_attendance_today_count', 300, function () {
           return static::getModel()::whereDate('visit_date', now()->toDateString())->count();
       });
   }

   public static function getNavigationBadgeColor(): string|array|null
   {
       return 'success';
   }
}