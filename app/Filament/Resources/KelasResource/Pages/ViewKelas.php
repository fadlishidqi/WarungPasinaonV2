<?php
// app/Filament/Resources/KelasResource/Pages/ViewKelas.php

namespace App\Filament\Resources\KelasResource\Pages;

use App\Filament\Resources\KelasResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;
use Filament\Infolists;
use Filament\Infolists\Infolist;

class ViewKelas extends ViewRecord
{
    protected static string $resource = KelasResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }

    public function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Infolists\Components\Section::make('Informasi Kelas')
                    ->schema([
                        Infolists\Components\Split::make([
                            Infolists\Components\Group::make([
                                Infolists\Components\TextEntry::make('nama')
                                    ->size(Infolists\Components\TextEntry\TextEntrySize::Large)
                                    ->weight('bold'),

                                Infolists\Components\TextEntry::make('deskripsi'),

                                Infolists\Components\TextEntry::make('kategori')
                                    ->badge(),

                                Infolists\Components\TextEntry::make('grup_wa')
                                    ->label('Grup WhatsApp')
                                    ->url(fn ($record) => $record->grup_wa)
                                    ->openUrlInNewTab(),
                            ]),

                            Infolists\Components\ImageEntry::make('gambar')
                                ->hiddenLabel()
                                ->grow(false),
                        ])->from('lg'),
                    ]),

                Infolists\Components\Section::make('Jadwal & Kapasitas')
                    ->schema([
                        Infolists\Components\TextEntry::make('tanggal')
                            ->date('d F Y'),

                        Infolists\Components\TextEntry::make('hari')
                            ->badge(),

                        Infolists\Components\TextEntry::make('kapasitas')
                            ->badge()
                            ->color('info'),

                        Infolists\Components\TextEntry::make('pendaftarans_count')
                            ->label('Jumlah Pendaftar')
                            ->state(fn ($record) => $record->pendaftarans()->count())
                            ->badge()
                            ->color('success'),

                        Infolists\Components\IconEntry::make('is_active')
                            ->label('Status Aktif')
                            ->boolean(),
                    ])
                    ->columns(3),
            ]);
    }
}