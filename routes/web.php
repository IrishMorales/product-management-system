<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

# TODO: Redirect / to /products if authenticated, else redirect to login
Route::get('/', function () {
    return Inertia::render('Auth/Login');
});

Route::group([
    'prefix' => 'auth',
    'as' => 'auth.',
], function () {
    // TODO: Change AuthController to AuthenticatedSessionController (follow Laravel conventions)
    Route::get('/login', fn () => Inertia::render('Auth/Login'));
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::get('/register', [RegisteredUserController::class, 'create']);
    Route::post('/register', [RegisteredUserController::class, 'store'])->name('register');
});

Route::group([
    'prefix' => 'auth',
    'as' => 'auth.',
    'middleware' => ['auth'],
], function () {
    // TODO: Fix slashes
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('refresh', [AuthController::class, 'refresh'])->name('refresh');
    Route::post('getUser', [AuthController::class, 'getUser'])->name('getUser');
});

Route::group([
    'prefix' => 'products',
    'as' => 'products.',
    'middleware' => ['auth']
], function () {
    Route::get('/', [ProductController::class, 'index'])->name('index');
    
    Route::get('/create', [ProductController::class, 'create'])->name('create');
    Route::post('/', [ProductController::class, 'store'])->name('store');

    Route::get('/{product}', [ProductController::class, 'show'])->name('show');

    Route::get('/{product}/edit', [ProductController::class, 'edit'])->name('edit');
    Route::put('/{product}', [ProductController::class, 'update'])->name('update');

    Route::delete('/{product}', [ProductController::class, 'destroy'])->name('destroy');
});
