<?php
// app/Filament/Resources/KegiatanResource.php

namespace App\Filament\Resources;

use App\Filament\Resources\KegiatanResource\Pages;
use App\Models\Kegiatan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class KegiatanResource extends Resource
{
    protected static ?string $model = Kegiatan::class;
    protected static ?string $navigationIcon = 'heroicon-o-calendar';
    protected static ?string $navigationLabel = 'Kegiatan';
    protected static ?string $pluralLabel = 'Kegiatan';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Kegiatan')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->label('Judul')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (string $operation, $state, Forms\Set $set) => 
                                $operation === 'create' ? $set('slug', Str::slug($state)) : null
                            ),

                        Forms\Components\TextInput::make('slug')
                            ->label('Slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),

                        Forms\Components\Select::make('category')
                            ->label('Kategori')
                            ->options([
                                'literasi' => 'Literasi',
                                'keagamaan' => 'Keagamaan',
                                'kesehatan' => 'Kesehatan',
                                'umkm' => 'UMKM',
                            ])
                            ->required()
                            ->default('literasi')
                            ->native(false),

                        Forms\Components\Textarea::make('description')
                            ->label('Deskripsi Singkat')
                            ->required()
                            ->rows(3)
                            ->columnSpanFull()
                            ->maxLength(500),

                        Forms\Components\DatePicker::make('date')
                            ->label('Tanggal Kegiatan')
                            ->required()
                            ->default(now())
                            ->native(false),

                        Forms\Components\Select::make('status')
                            ->label('Status')
                            ->options([
                                'draft' => 'Draft',
                                'published' => 'Published',
                            ])
                            ->required()
                            ->default('draft')
                            ->native(false),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Konten')
                    ->schema([
                        Forms\Components\FileUpload::make('image')
                            ->label('Gambar Utama')
                            ->image()
                            ->directory('kegiatan')
                            ->maxSize(1024)
                            ->imageResizeMode('cover')
                            ->imageResizeTargetWidth('800')
                            ->imageResizeTargetHeight('600') 
                            ->acceptedFileTypes(['image/jpeg', 'image/png'])
                            ->columnSpanFull()
                            ->helperText('Maksimal 1MB, akan di-resize ke 800x600px'),

                        Forms\Components\RichEditor::make('content')
                            ->label('Konten')
                            ->required()
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'underline',
                                'bulletList',
                                'orderedList',
                                'link',
                                'undo',
                                'redo',
                            ])
                            ->maxLength(10000),
                    ]),

                Forms\Components\Section::make('SEO & Tags')
                    ->schema([
                        Forms\Components\TextInput::make('meta_description')
                            ->label('Meta Description')
                            ->maxLength(160)
                            ->columnSpanFull(),

                        Forms\Components\TagsInput::make('tags')
                            ->label('Tags')
                            ->columnSpanFull()
                            ->separator(',')
                            ->splitKeys(['Tab', ',', ' ']),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('Gambar')
                    ->size(40)
                    ->defaultImageUrl(null),
                
                Tables\Columns\TextColumn::make('title')
                    ->label('Judul')
                    ->searchable()
                    ->sortable()
                    ->limit(30)
                    ->tooltip(function (Tables\Columns\TextColumn $column): ?string {
                        $state = $column->getState();
                        return strlen($state) > 30 ? $state : null;
                    }),

                Tables\Columns\BadgeColumn::make('category')
                    ->label('Kategori')
                    ->formatStateUsing(fn (string $state): string => [
                        'literasi' => 'Literasi',
                        'keagamaan' => 'Keagamaan',
                        'kesehatan' => 'Kesehatan',
                        'umkm' => 'UMKM',
                    ][$state] ?? $state)
                    ->colors([
                        'primary' => 'literasi',
                        'success' => 'keagamaan',
                        'warning' => 'kesehatan',
                        'info' => 'umkm',
                    ]),

                Tables\Columns\TextColumn::make('date')
                    ->label('Tanggal')
                    ->date('d/m/Y')
                    ->sortable(),

                Tables\Columns\BadgeColumn::make('status')
                    ->label('Status')
                    ->colors([
                        'danger' => 'draft',
                        'success' => 'published',
                    ]),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->label('Kategori')
                    ->options([
                        'literasi' => 'Literasi',
                        'keagamaan' => 'Keagamaan',
                        'kesehatan' => 'Kesehatan',
                        'umkm' => 'UMKM',
                    ])
                    ->native(false),

                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                    ])
                    ->native(false),

                Tables\Filters\Filter::make('date_range')
                    ->form([
                        Forms\Components\DatePicker::make('from')
                            ->label('Dari Tanggal'),
                        Forms\Components\DatePicker::make('until')
                            ->label('Sampai Tanggal'),
                    ])
                    ->query(function ($query, array $data) {
                        return $query
                            ->when(
                                $data['from'],
                                fn ($query) => $query->whereDate('date', '>=', $data['from'])
                            )
                            ->when(
                                $data['until'],
                                fn ($query) => $query->whereDate('date', '<=', $data['until'])
                            );
                    }),
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
            ->defaultSort('date', 'desc')
            ->defaultPaginationPageOption(5)
            ->poll(null)
            ->deferLoading()
            ->striped(false)
            ->persistFiltersInSession(false);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListKegiatan::route('/'),
            'create' => Pages\CreateKegiatan::route('/create'),
            'view' => Pages\ViewKegiatan::route('/{record}'),
            'edit' => Pages\EditKegiatan::route('/{record}/edit'),
        ];
    }
}