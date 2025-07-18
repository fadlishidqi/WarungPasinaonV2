<?php
// app/Filament/Resources/KelasResource.php

namespace App\Filament\Resources;

use App\Filament\Resources\KelasResource\Pages;
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

class KelasResource extends Resource
{
    protected static ?string $model = Kelas::class;
    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';
    protected static ?string $navigationLabel = 'Kelas';
    protected static ?string $pluralModelLabel = 'Kelas';
    protected static ?string $modelLabel = 'Kelas';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Informasi Kelas')
                    ->description('Detail informasi kelas yang akan ditampilkan')
                    ->schema([
                        Forms\Components\TextInput::make('nama')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),

                        Forms\Components\Textarea::make('deskripsi')
                            ->required()
                            ->rows(3)
                            ->maxLength(500) 
                            ->columnSpanFull(),

                        Forms\Components\FileUpload::make('gambar')
                            ->image()
                            ->directory('kelas')
                            ->maxSize(1024)
                            ->imageResizeMode('cover')
                            ->imageResizeTargetWidth('600')
                            ->imageResizeTargetHeight('400')
                            ->acceptedFileTypes(['image/jpeg', 'image/png'])
                            ->columnSpanFull()
                            ->helperText('Maksimal 1MB, akan di-resize ke 600x400px'),

                        Forms\Components\Select::make('kategori')
                            ->options([
                                'Tari' => 'Tari',
                                'Masak' => 'Masak', 
                                'Menulis' => 'Menulis',
                            ])
                            ->required()
                            ->native(false),

                        Forms\Components\TextInput::make('grup_wa')
                            ->label('Link Grup WhatsApp')
                            ->url()
                            ->prefixIcon('heroicon-m-device-phone-mobile')
                            ->placeholder('https://chat.whatsapp.com/...')
                            ->maxLength(255)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('Jadwal & Kapasitas')
                    ->description('Atur jadwal dan kapasitas peserta kelas')
                    ->schema([
                        Forms\Components\DatePicker::make('tanggal')
                            ->required()
                            ->native(false)
                            ->displayFormat('d/m/Y')
                            ->minDate(now()),

                        Forms\Components\Select::make('hari')
                            ->options([
                                'Senin' => 'Senin',
                                'Selasa' => 'Selasa',
                                'Rabu' => 'Rabu',
                                'Kamis' => 'Kamis',
                                'Jumat' => 'Jumat',
                                'Sabtu' => 'Sabtu',
                                'Minggu' => 'Minggu',
                            ])
                            ->required()
                            ->native(false),

                        Forms\Components\TextInput::make('kapasitas')
                            ->required()
                            ->numeric()
                            ->default(20)
                            ->minValue(1)
                            ->maxValue(50),

                        Forms\Components\Toggle::make('is_active')
                            ->label('Status Aktif')
                            ->default(true)
                            ->helperText('Kelas akan ditampilkan di website jika aktif'),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('gambar')
                    ->size(40)
                    ->circular(),

                Tables\Columns\TextColumn::make('nama')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->limit(25)
                    ->tooltip(function (Tables\Columns\TextColumn $column): ?string {
                        $state = $column->getState();
                        return strlen($state) > 25 ? $state : null;
                    }),

                Tables\Columns\TextColumn::make('kategori')
                    ->badge()
                    ->color(fn (string $state): string => [
                        'Tari' => 'success',
                        'Masak' => 'warning',
                        'Menulis' => 'info',
                    ][$state] ?? 'gray'),

                Tables\Columns\TextColumn::make('tanggal')
                    ->date('d/m/Y')
                    ->sortable(),

                Tables\Columns\TextColumn::make('hari')
                    ->badge()
                    ->color('gray'),

                Tables\Columns\TextColumn::make('pendaftarans_count')
                    ->label('Terdaftar')
                    ->getStateUsing(function ($record) {
                        return $record->pendaftarans_count ?? $record->pendaftarans()->count();
                    })
                    ->badge()
                    ->color('success'),

                Tables\Columns\TextColumn::make('kapasitas')
                    ->badge()
                    ->color('info'),

                Tables\Columns\IconColumn::make('is_active')
                    ->label('Status')
                    ->boolean()
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('kategori')
                    ->options([
                        'Tari' => 'Tari',
                        'Masak' => 'Masak', 
                        'Menulis' => 'Menulis',
                    ])
                    ->native(false),

                SelectFilter::make('is_active')
                    ->label('Status')
                    ->options([
                        1 => 'Aktif',
                        0 => 'Tidak Aktif',
                    ])
                    ->native(false),

                Filter::make('tanggal_akan_datang')
                    ->label('Kelas Akan Datang')
                    ->query(fn (Builder $query): Builder => $query->where('tanggal', '>=', now()->toDateString()))
                    ->default(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make()
                    ->iconButton(),
                Tables\Actions\EditAction::make()
                    ->iconButton(),
                Tables\Actions\DeleteAction::make()
                    ->iconButton(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('tanggal', 'asc')
            ->defaultPaginationPageOption(5)
            ->poll(null)
            ->deferLoading()
            ->striped(false)
            ->persistFiltersInSession(false);
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
            'index' => Pages\ListKelas::route('/'),
            'create' => Pages\CreateKelas::route('/create'),
            'edit' => Pages\EditKelas::route('/{record}/edit'),
            'view' => Pages\ViewKelas::route('/{record}'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return cache()->remember('kelas_active_count', 300, function () {
            return static::getModel()::where('is_active', true)->count();
        });
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return 'success';
    }
}