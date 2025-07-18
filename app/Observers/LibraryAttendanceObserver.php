<?php
// app/Observers/LibraryAttendanceObserver.php
namespace App\Observers;

use App\Models\LibraryAttendance;

class LibraryAttendanceObserver
{
    public function created(LibraryAttendance $libraryAttendance): void
    {
        if ($libraryAttendance->participant->type === 'child') {
            $libraryAttendance->participant->addPoints(
                50,
                'library_visit',
                'Kunjungan perpustakaan pada ' . $libraryAttendance->visit_date->format('d/m/Y')
            );
        }
    }
}