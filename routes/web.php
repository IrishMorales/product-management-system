<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

# TODO: Redirect / to /products if authenticated, else redirect to /login
Route::get('/', function () {
    return Inertia::render('Auth/Login');
});

# TODO
Route::get('/register', function () {
    return Inertia::render('Auth/Register');
});

Route::group([
    'prefix' => 'products',
    'as' => 'products.',
    // 'middleware' => ['auth'], TODO
], function () {
    Route::get('/', [ProductController::class, 'index'])->name('index');
    
    Route::get('/create', [ProductController::class, 'create'])->name('create');
    Route::post('/', [ProductController::class, 'store'])->name('store');

    Route::get('/{product}', [ProductController::class, 'show'])->name('show');
});
