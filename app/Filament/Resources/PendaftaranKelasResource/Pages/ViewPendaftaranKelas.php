<?php
// app/Filament/Resources/PendaftaranKelasResource/Pages/ViewPendaftaranKelas.php

namespace App\Filament\Resources\PendaftaranKelasResource\Pages;

use App\Filament\Resources\PendaftaranKelasResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;
use Filament\Infolists;
use Filament\Infolists\Infolist;

class ViewPendaftaranKelas extends ViewRecord
{
    protected static string $resource = PendaftaranKelasResource::class;

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
                        Infolists\Components\TextEntry::make('kelas.nama')
                            ->label('Nama Kelas')
                            ->size(Infolists\Components\TextEntry\TextEntrySize::Large)
                            ->weight('bold'),

                        Infolists\Components\TextEntry::make('kelas.kategori')
                            ->label('Kategori')
                            ->badge(),

                        Infolists\Components\TextEntry::make('kelas.tanggal')
                            ->label('Tanggal Kelas')
                            ->date('d F Y'),

                        Infolists\Components\TextEntry::make('kelas.hari')
                            ->label('Hari')
                            ->badge(),
                    ])
                    ->columns(2),

                Infolists\Components\Section::make('Data Peserta')
                    ->schema([
                        Infolists\Components\TextEntry::make('nama')
                            ->size(Infolists\Components\TextEntry\TextEntrySize::Large)
                            ->weight('bold'),

                        Infolists\Components\TextEntry::make('no_telp')
                            ->label('No. Telepon')
                            ->copyable(),

                        Infolists\Components\TextEntry::make('alamat')
                            ->columnSpanFull(),

                        Infolists\Components\TextEntry::make('created_at')
                            ->label('Tanggal Pendaftaran')
                            ->dateTime('d F Y, H:i'),
                    ])
                    ->columns(2),
            ]);
    }
}