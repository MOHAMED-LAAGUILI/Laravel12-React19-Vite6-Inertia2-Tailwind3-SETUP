<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'message' => 'Welcome to your Laravel React Inertia app!',
    ]);
});

// Resource routes for users, roles, and permissions
Route::resource('users', UserController::class);
Route::resource('roles', RoleController::class);
Route::resource('permissions', PermissionController::class);

Route::middleware(['role:admin'])->group(function () {
    Route::get('/admin', fn() => 'Admin Dashboard');
});