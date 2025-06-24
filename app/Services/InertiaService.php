<?php 
// app/Services/InertiaService.php

namespace App\Services;

use Inertia\Inertia;

class InertiaService
{
    public static function share(): void
    {
        Inertia::share([
            'flash' => fn () => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }
}
