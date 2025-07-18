<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use App\Models\LibraryAttendance;
use App\Observers\LibraryAttendanceObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        LibraryAttendance::observe(LibraryAttendanceObserver::class);
    }
}
