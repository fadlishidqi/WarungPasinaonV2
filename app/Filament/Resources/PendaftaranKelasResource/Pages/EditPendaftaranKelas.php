<?php
// app/Filament/Resources/PendaftaranKelasResource/Pages/EditPendaftaranKelas.php

namespace App\Filament\Resources\PendaftaranKelasResource\Pages;

use App\Filament\Resources\PendaftaranKelasResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPendaftaranKelas extends EditRecord
{
    protected static string $resource = PendaftaranKelasResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}