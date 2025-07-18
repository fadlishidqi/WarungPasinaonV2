<?php
// app/Filament/Resources/PendaftaranKelasResource.php

namespace App\Filament\Resources;

use App\Filament\Resources\PendaftaranKelasResource\Pages;
use App\Models\PendaftaranKelas;
use App\Models\Kelas;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\Section;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\Filter;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PendaftaranKelasResource extends Resource
{
    protected static ?string $model = PendaftaranKelas::class;
    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    protected static ?string $navigationLabel = 'Pendaftaran Kelas';
    protected static ?string $pluralModelLabel = 'Pendaftaran Kelas';
    protected static ?string $modelLabel = 'Pendaftaran Kelas';
    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Informasi Kelas')
                    ->schema([
                        Forms\Components\Select::make('kelas_id')
                            ->label('Kelas')
                            ->relationship('kelas', 'nama')
                            ->options(function () {
                                return Kelas::where('is_active', true)
                                    ->orderBy('nama')
                                    ->limit(50)
                                    ->pluck('nama', 'id');
                            })
                            ->required()
                            ->searchable()
                            ->native(false)
                            ->columnSpanFull(),
                    ]),

                Section::make('Data Peserta')
                    ->schema([
                        Forms\Components\TextInput::make('nama')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('no_telp')
                            ->label('No. Telepon')
                            ->required()
                            ->tel()
                            ->maxLength(20),

                        Forms\Components\Textarea::make('alamat')
                            ->required()
                            ->rows(2)
                            ->maxLength(300)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('kelas.nama')
                    ->label('Kelas')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->limit(25)
                    ->tooltip(function (Tables\Columns\TextColumn $column): ?string {
                        $state = $column->getState();
                        return strlen($state) > 25 ? $state : null;
                    }),

                Tables\Columns\TextColumn::make('nama')
                    ->label('Nama Peserta')
                    ->searchable()
                    ->sortable()
                    ->limit(20)
                    ->tooltip(function (Tables\Columns\TextColumn $column): ?string {
                        $state = $column->getState();
                        return strlen($state) > 20 ? $state : null;
                    }),

                Tables\Columns\TextColumn::make('no_telp')
                    ->label('No. Telepon')
                    ->searchable()
                    ->copyable()
                    ->copyMessage('Nomor telepon disalin!'),

                Tables\Columns\TextColumn::make('alamat')
                    ->limit(30)
                    ->tooltip(function (Tables\Columns\TextColumn $column): ?string {
                        $state = $column->getState();
                        return strlen($state) > 30 ? $state : null;
                    }),

                Tables\Columns\TextColumn::make('kelas.tanggal')
                    ->label('Tanggal Kelas')
                    ->date('d/m/Y')
                    ->sortable(),

                Tables\Columns\TextColumn::make('kelas.kategori')
                    ->label('Kategori')
                    ->badge()
                    ->color(fn (string $state): string => [
                        'Tari' => 'success',
                        'Masak' => 'warning',
                        'Menulis' => 'info',
                    ][$state] ?? 'gray'),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Tanggal Daftar')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('kelas')
                    ->relationship('kelas', 'nama')
                    ->searchable()
                    ->native(false),

                SelectFilter::make('kategori')
                    ->options([
                        'Tari' => 'Tari',
                        'Masak' => 'Masak', 
                        'Menulis' => 'Menulis',
                    ])
                    ->native(false)
                    ->query(function (Builder $query, array $data): Builder {
                        return $query->when(
                            $data['value'],
                            fn (Builder $query, $value): Builder => $query->whereHas('kelas', fn (Builder $query) => $query->where('kategori', $value)),
                        );
                    }),

                Filter::make('bulan_ini')
                    ->label('Daftar Bulan Ini')
                    ->query(fn (Builder $query): Builder => $query->whereMonth('created_at', now()->month)
                        ->whereYear('created_at', now()->year))
                    ->default(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make()
                    ->iconButton(),
                Tables\Actions\EditAction::make()
                    ->iconButton(),
                Tables\Actions\DeleteAction::make()
                    ->iconButton(),

                Tables\Actions\Action::make('whatsapp')
                    ->label('WA')
                    ->icon('heroicon-m-chat-bubble-left-right')
                    ->color('success')
                    ->iconButton()
                    ->url(fn (PendaftaranKelas $record): string => 
                        "https://wa.me/" . preg_replace('/[^0-9]/', '', $record->no_telp)
                    )
                    ->openUrlInNewTab(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc')
            ->defaultPaginationPageOption(5) // Yang penting ini untuk limit data
            ->poll(null) // Disable auto-refresh
            ->deferLoading() // Load data on demand
            ->striped(false) // Disable striping
            ->persistFiltersInSession(false); // Jangan simpan filter di session
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPendaftaranKelas::route('/'),
            'create' => Pages\CreatePendaftaranKelas::route('/create'),
            'edit' => Pages\EditPendaftaranKelas::route('/{record}/edit'),
            'view' => Pages\ViewPendaftaranKelas::route('/{record}'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return cache()->remember('pendaftaran_kelas_month_count', 300, function () {
            return static::getModel()::whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->count();
        });
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return 'primary';
    }
}