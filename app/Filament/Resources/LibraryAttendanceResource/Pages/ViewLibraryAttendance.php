<?php
// app/Filament/Resources/LibraryAttendanceResource/Pages/ViewLibraryAttendance.php
namespace App\Filament\Resources\LibraryAttendanceResource\Pages;

use App\Filament\Resources\LibraryAttendanceResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewLibraryAttendance extends ViewRecord
{
    protected static string $resource = LibraryAttendanceResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}