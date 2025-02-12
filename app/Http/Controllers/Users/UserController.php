<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function show(User $user)
    {
      $user = auth()->user();
      return Inertia::render('Users/Show', ['user' => $user]);
    }
}
