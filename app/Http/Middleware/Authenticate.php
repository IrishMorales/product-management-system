<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as DefaultAuthenticate;

// Extends the default Laravel Authenticate middleware to redirect users based on authentication state.
class Authenticate extends DefaultAuthenticate
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo($request): string|null
    {
        if (! $request->expectsJson()) {
            return route('auth.login.show');
        }
    }
}
