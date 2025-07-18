<?php
// app/Filament/Resources/LibraryAttendanceResource/Pages/CreateLibraryAttendance.php
namespace App\Filament\Resources\LibraryAttendanceResource\Pages;

use App\Filament\Resources\LibraryAttendanceResource;
use Filament\Resources\Pages\CreateRecord;

class CreateLibraryAttendance extends CreateRecord
{
    protected static string $resource = LibraryAttendanceResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}