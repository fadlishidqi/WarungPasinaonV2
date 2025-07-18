<?php
// app/Filament/Resources/PendaftaranKelasResource/Pages/ListPendaftaranKelas.php

namespace App\Filament\Resources\PendaftaranKelasResource\Pages;

use App\Filament\Resources\PendaftaranKelasResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPendaftaranKelas extends ListRecords
{
    protected static string $resource = PendaftaranKelasResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}