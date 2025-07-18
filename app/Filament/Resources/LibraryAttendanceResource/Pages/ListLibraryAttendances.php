<?php
// app/Filament/Resources/LibraryAttendanceResource/Pages/ListLibraryAttendances.php
namespace App\Filament\Resources\LibraryAttendanceResource\Pages;

use App\Filament\Resources\LibraryAttendanceResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListLibraryAttendances extends ListRecords
{
    protected static string $resource = LibraryAttendanceResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()
                ->label('Tambah Daftar Hadir'),
        ];
    }
}