<?php
// app/Filament/Resources/PendaftaranKelasResource/Pages/CreatePendaftaranKelas.php

namespace App\Filament\Resources\PendaftaranKelasResource\Pages;

use App\Filament\Resources\PendaftaranKelasResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreatePendaftaranKelas extends CreateRecord
{
    protected static string $resource = PendaftaranKelasResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}