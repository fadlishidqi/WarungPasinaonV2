<?php

namespace App\Filament\Resources\ParticipantPointResource\Pages;

use App\Filament\Resources\ParticipantPointResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListParticipantPoints extends ListRecords
{
    protected static string $resource = ParticipantPointResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
