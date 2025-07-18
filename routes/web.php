<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\LibraryAttendanceController;
use App\Http\Controllers\RankingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route utama mengarah ke Home (one-page)
Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::get('/kegiatan', [KegiatanController::class, 'index'])->name('kegiatan.index');
Route::get('/kegiatan/{slug}', [KegiatanController::class, 'show'])->name('kegiatan.show');

Route::get('/buku-digital', [App\Http\Controllers\BookController::class, 'index'])->name('books.index');
Route::get('/buku-digital/{book:slug}', [App\Http\Controllers\BookController::class, 'show'])->name('books.show');
Route::get('/buku-digital/{book:slug}/baca', [App\Http\Controllers\BookController::class, 'read'])->name('books.read');
Route::get('/buku-digital/{book:slug}/download', [App\Http\Controllers\BookController::class, 'download'])->name('books.download');

Route::get('/ranking', [RankingController::class, 'index'])->name('ranking.index');

Route::get('/kelas', [KelasController::class, 'index'])->name('kelas.index');
Route::get('/kelas/{id}', [KelasController::class, 'show'])->name('kelas.show');
Route::post('/kelas/{id}/daftar', [KelasController::class, 'daftar'])->name('kelas.daftar');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/daftar-hadir', [LibraryAttendanceController::class, 'index'])->name('library.attendance');
Route::post('/daftar-hadir', [LibraryAttendanceController::class, 'store'])->name('library.attendance.store');
Route::get('/daftar-hadir/stats', [LibraryAttendanceController::class, 'getStats'])->name('library.attendance.stats');

require __DIR__.'/auth.php';