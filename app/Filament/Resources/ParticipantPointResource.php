<?php
// app/Filament/Resources/ParticipantPointResource.php
namespace App\Filament\Resources;

use App\Filament\Resources\ParticipantPointResource\Pages;
use App\Models\ParticipantPoint;
use App\Models\Participant;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Filament\Notifications\Notification;

class ParticipantPointResource extends Resource
{
   protected static ?string $model = ParticipantPoint::class;
   protected static ?string $navigationIcon = 'heroicon-o-star';
   protected static ?string $navigationLabel = 'Kelola Poin Anak';
   protected static ?string $modelLabel = 'Poin Anak';
   protected static ?string $pluralModelLabel = 'Poin Anak-anak';
   protected static ?string $navigationGroup = 'Manajemen Perpustakaan';
   protected static ?int $navigationSort = 3;

   public static function form(Form $form): Form
   {
       return $form
           ->schema([
               Forms\Components\Section::make('Informasi Poin')
                   ->schema([
                       Forms\Components\Select::make('participant_id')
                           ->label('Pilih Anak')
                           ->options(function () {
                               return Participant::where('type', 'child')
                                   ->orderBy('name')
                                   ->limit(100)
                                   ->pluck('name', 'id')
                                   ->toArray();
                           })
                           ->required()
                           ->searchable()
                           ->native(false)
                           ->helperText('Hanya anak-anak yang bisa mendapat poin'),

                       Forms\Components\TextInput::make('points')
                           ->label('Jumlah Poin')
                           ->required()
                           ->numeric()
                           ->default(50)
                           ->minValue(1)
                           ->maxValue(500)
                           ->suffix('poin')
                           ->helperText('Masukkan jumlah poin yang akan diberikan'),

                       Forms\Components\Select::make('activity_type')
                           ->label('Jenis Aktivitas')
                           ->options([
                               'library_visit' => 'Kunjungan Perpustakaan',
                               'reading_book' => 'Membaca Buku',
                               'quiz_completion' => 'Menyelesaikan Kuis',
                               'event_participation' => 'Mengikuti Acara',
                               'homework_completion' => 'Menyelesaikan PR',
                               'good_behavior' => 'Perilaku Baik',
                               'helping_others' => 'Membantu Orang Lain',
                               'manual_bonus' => 'Bonus Manual',
                               'correction' => 'Koreksi Poin',
                           ])
                           ->required()
                           ->default('manual_bonus')
                           ->native(false),

                       Forms\Components\Textarea::make('description')
                           ->label('Deskripsi/Keterangan')
                           ->required()
                           ->rows(2)
                           ->placeholder('Jelaskan alasan pemberian poin ini...')
                           ->maxLength(300),

                       Forms\Components\DatePicker::make('earned_date')
                           ->label('Tanggal Poin Diperoleh')
                           ->required()
                           ->default(now())
                           ->native(false),
                   ])
                   ->columns(2),
           ]);
   }

   public static function table(Table $table): Table
   {
       return $table
           ->defaultSort('earned_date', 'desc')
           ->columns([
               Tables\Columns\TextColumn::make('participant.name')
                   ->label('Nama Anak')
                   ->searchable()
                   ->sortable()
                   ->weight('bold')
                   ->limit(20)
                   ->tooltip(function (Tables\Columns\TextColumn $column): ?string {
                       $state = $column->getState();
                       return strlen($state) > 20 ? $state : null;
                   }),

               Tables\Columns\TextColumn::make('points')
                   ->label('Poin')
                   ->sortable()
                   ->alignCenter()
                   ->badge()
                   ->color(fn (int $state): string => [
                       true => 'success',
                       $state >= 50 => 'warning',
                   ][$state >= 100] ?? ($state >= 50 ? 'warning' : 'gray'))
                   ->formatStateUsing(fn (int $state): string => "+{$state}"),

               Tables\Columns\TextColumn::make('activity_type')
                   ->label('Aktivitas')
                   ->badge()
                   ->color(fn (string $state): string => [
                       'library_visit' => 'info',
                       'reading_book' => 'success',
                       'quiz_completion' => 'warning',
                       'event_participation' => 'purple',
                       'homework_completion' => 'orange',
                       'good_behavior' => 'green',
                       'helping_others' => 'pink',
                       'manual_bonus' => 'indigo',
                       'correction' => 'red',
                   ][$state] ?? 'gray')
                   ->formatStateUsing(fn (string $state): string => [
                       'library_visit' => 'Perpustakaan',
                       'reading_book' => 'Baca Buku',
                       'quiz_completion' => 'Kuis',
                       'event_participation' => 'Acara',
                       'homework_completion' => 'PR',
                       'good_behavior' => 'Perilaku Baik',
                       'helping_others' => 'Membantu',
                       'manual_bonus' => 'Bonus',
                       'correction' => 'Koreksi',
                   ][$state] ?? $state),

               Tables\Columns\TextColumn::make('description')
                   ->label('Deskripsi')
                   ->limit(30)
                   ->tooltip(function (Tables\Columns\TextColumn $column): ?string {
                       $state = $column->getState();
                       return strlen($state) > 30 ? $state : null;
                   }),

               Tables\Columns\TextColumn::make('earned_date')
                   ->label('Tanggal')
                   ->date('d/m/Y')
                   ->sortable(),

               Tables\Columns\TextColumn::make('created_at')
                   ->label('Dicatat')
                   ->dateTime('d/m/Y H:i')
                   ->sortable()
                   ->toggleable()
                   ->toggledHiddenByDefault(),
           ])
           ->filters([
               SelectFilter::make('participant_id')
                   ->label('Nama Anak')
                   ->options(function () {
                       return Participant::where('type', 'child')
                           ->orderBy('name')
                           ->limit(50)
                           ->pluck('name', 'id')
                           ->toArray();
                   })
                   ->searchable()
                   ->native(false),

               SelectFilter::make('activity_type')
                   ->label('Jenis Aktivitas')
                   ->options([
                       'library_visit' => 'Kunjungan Perpustakaan',
                       'reading_book' => 'Membaca Buku',
                       'quiz_completion' => 'Menyelesaikan Kuis',
                       'event_participation' => 'Mengikuti Acara',
                       'homework_completion' => 'Menyelesaikan PR',
                       'good_behavior' => 'Perilaku Baik',
                       'helping_others' => 'Membantu Orang Lain',
                       'manual_bonus' => 'Bonus Manual',
                       'correction' => 'Koreksi Poin',
                   ])
                   ->native(false),

               Filter::make('points_range')
                   ->form([
                       Forms\Components\TextInput::make('from')
                           ->label('Poin Minimum')
                           ->numeric()
                           ->placeholder('0'),
                       Forms\Components\TextInput::make('to')
                           ->label('Poin Maksimum')
                           ->numeric()
                           ->placeholder('500'),
                   ])
                   ->query(function (Builder $query, array $data): Builder {
                       return $query
                           ->when(
                               $data['from'],
                               fn (Builder $query, $value): Builder => $query->where('points', '>=', $value),
                           )
                           ->when(
                               $data['to'],
                               fn (Builder $query, $value): Builder => $query->where('points', '<=', $value),
                           );
                   }),

               Filter::make('earned_date')
                   ->form([
                       Forms\Components\DatePicker::make('from')
                           ->label('Dari Tanggal')
                           ->native(false),
                       Forms\Components\DatePicker::make('to')
                           ->label('Sampai Tanggal')
                           ->native(false),
                   ])
                   ->query(function (Builder $query, array $data): Builder {
                       return $query
                           ->when(
                               $data['from'],
                               fn (Builder $query, $value): Builder => $query->whereDate('earned_date', '>=', $value),
                           )
                           ->when(
                               $data['to'],
                               fn (Builder $query, $value): Builder => $query->whereDate('earned_date', '<=', $value),
                           );
                   }),
           ])
           ->actions([
               Tables\Actions\EditAction::make()
                   ->iconButton()
                   ->color('warning'),
               Tables\Actions\DeleteAction::make()
                   ->iconButton()
                   ->requiresConfirmation()
                   ->modalHeading('Hapus Poin')
                   ->modalDescription('Apakah Anda yakin ingin menghapus poin ini?')
                   ->modalSubmitActionLabel('Ya, Hapus'),
           ])
           ->bulkActions([
               Tables\Actions\BulkActionGroup::make([
                   Tables\Actions\DeleteBulkAction::make()
                       ->requiresConfirmation()
                       ->modalHeading('Hapus Poin Terpilih')
                       ->modalDescription('Apakah Anda yakin ingin menghapus semua poin yang dipilih?'),
               ]),
           ])
           ->headerActions([
               Tables\Actions\CreateAction::make()
                   ->label('Tambah Poin')
                   ->icon('heroicon-o-plus')
                   ->after(function () {
                       Notification::make()
                           ->title('Poin berhasil ditambahkan!')
                           ->success()
                           ->send();
                   }),
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
           'index' => Pages\ListParticipantPoints::route('/'),
           'create' => Pages\CreateParticipantPoint::route('/create'),
           'edit' => Pages\EditParticipantPoint::route('/{record}/edit'),
       ];
   }

   public static function getNavigationBadge(): ?string
   {
       return cache()->remember('participant_points_count', 300, function () {
           return static::getModel()::count();
       });
   }

   public static function getNavigationBadgeColor(): string|array|null
   {
       return 'success';
   }
}