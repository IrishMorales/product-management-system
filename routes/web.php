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
