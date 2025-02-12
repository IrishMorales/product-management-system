<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Users\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('products.index');
});

Route::group([
    'prefix' => 'auth',
    'as' => 'auth.',
    'middleware' => ['guest'],
], function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login.show');
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login');

    Route::get('/register', [RegisteredUserController::class, 'create'])->name('register.show');
    Route::post('/register', [RegisteredUserController::class, 'store'])->name('register');
});

Route::group([
    'prefix' => 'auth',
    'as' => 'auth.',
    'middleware' => ['auth'],
], function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'logout'])->name('logout');
    Route::post('/refresh', [AuthenticatedSessionController::class, 'refresh'])->name('refresh');
    Route::post('/getUser', [AuthenticatedSessionController::class, 'getUser'])->name('getUser');
});

Route::group([
    'prefix' => 'users',
    'as' => 'users.',
    'middleware' => ['auth'],
], function () {
    Route::get('/me', [UserController::class, 'show'])->name('show');
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
