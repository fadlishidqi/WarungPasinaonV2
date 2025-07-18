<?php
// app/Filament/Resources/LibraryAttendanceResource/Pages/EditLibraryAttendance.php
namespace App\Filament\Resources\LibraryAttendanceResource\Pages;

use App\Filament\Resources\LibraryAttendanceResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditLibraryAttendance extends EditRecord
{
    protected static string $resource = LibraryAttendanceResource::class;

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