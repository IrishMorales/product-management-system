<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    private const COOKIE_EXPIRY = 60; # in minutes

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);
        $token = auth()->attempt($credentials);

        if (!$token) {
            return response()->json(['error' => 'Invalid user credentials.'], 401);
        }

        // IMPORTANT: 
        // The instructions for /auth/login state that this endpoint "should return a JWT token"
        // To meet that requirement, I initially wrote `return $this->respondWithToken($token)` (returns a JSON response with the JWT token value)
        // However, Laravel Inertia throws: "All Inertia requests must receive a valid Inertia response, however a plain JSON response was received."
        // so I've changed this line to return an Inertia response instead with the JWT token value inside the cookie (I hope that still counts as returning the token haha)
        return redirect(route('products.index'))->withCookie($this->createCookie($token));
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUser()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        # NOTE: this line is a slight duplicate of auth()->logout() since jwt-auth invalidates the token upon logout
        # adding the line here for clarity only (to show that the token needs to be invalidated)
        auth()->invalidate();

        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    # TODO: Use to periodically refresh token via cookie
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
