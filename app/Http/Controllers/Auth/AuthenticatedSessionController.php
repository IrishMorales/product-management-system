<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    private const COOKIE_EXPIRY = 60; # in minutes

    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login');
    }

    /**
     * Get a JWT via given credentials.
     *
     */
    public function store(LoginRequest $request)
    {
        $credentials = $request->only(['email', 'password']);
        $token = auth()->attempt($credentials);

        if (!$token) {
            return back()
                ->withInput($request->only('email'))
                ->withErrors([
                    'email' => 'Invalid user credentials.',
                    'password' => 'Invalid user credentials.'
                ]);
        }

        // IMPORTANT: 
        // The instructions for /auth/login state that this endpoint "should return a JWT token"
        // To meet that requirement, I initially wrote `return $this->respondWithToken($token)` (returns a JSON response with the JWT token value)
        // However, Laravel Inertia throws: "All Inertia requests must receive a valid Inertia response, however a plain JSON response was received."
        // so I've changed this line to return an Inertia response instead with the JWT token value inside the cookie (I hope that still counts as returning the token haha)
        return redirect()->intended(route('products.index', absolute: false))->withCookie($this->createCookie($token));
    }

    /**
     * Log the user out (Invalidate the token).
     */
    # NOTE: This function isn't currently used, but should be used to log out if log out functionality were implemented
    public function destroy()
    {
        auth()->logout();
        
        # NOTE: this line is a slight duplicate of auth()->logout() since jwt-auth invalidates the token upon logout
        # adding the line here for clarity only (to show that the token needs to be invalidated)
        auth()->invalidate();

        return redirect('/');
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    # NOTE: This function isn't currently used, but should be used to periodically refresh the user's token
    public function refresh()
    {
        # NOTE: this line is a slight duplicate of auth()->refresh() since jwt-auth invalidates the token upon refresh
        # adding the line here for clarity only (to show that the token needs to be invalidated)
        auth()->invalidate();

        # temporarily blacklists old token upon refresh
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        $cookie = $this->createCookie($token);

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => 60
        ])->withCookie($cookie);
    }

    /**
     * Helper function to create secure HttpOnly cookie with stored token value
     */
    private function createCookie($token)
    {
        return cookie(
            name: 'token',
            value: $token, 
            minutes: self::COOKIE_EXPIRY, 
            path: null, 
            domain: null, 
            secure: true, 
            httpOnly: true
        );
    }
}
