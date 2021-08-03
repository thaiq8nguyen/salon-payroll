<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'first_name' =>'required|string',
            'last_name'=>'required|string',
            'email'=>'required|string|email|unique:users,email',
            'password'=>'required|string|confirmed'
        ]);

        if ($validation->fails()) {
            return response()->json(['error' => 'invalid inputs', 'description' => $validation->errors() ]);
        }

        $user = User::create(['name' => $request['first_name'].' '.$request['last_name'],'email' => $request['email'], 'password' => Hash::make($request['password'])]);

        $token = $user->createToken('accessToken')->plainTextToken;

        return response()->json(['user' => $user, 'token' => $token]);
    }

    public function login(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required'
        ]);

        if ($validation->fails()) {
            return response()->json(['error' => 'invalid inputs', 'description' => $validation->errors() ]);
        }

        if (Auth::attempt(['email' => $request['email'], 'password' => $request['password']])) {
            $user = Auth::user();
            
            $token = $user->createToken('accessToken')->plainTextToken;

            return response()->json(['user' => $user, 'token' => $token]);
        } else {
            return response()->json(['error' => 'invalid inputs', 'description' => 'your credentials do not match our records']);
        }
    }

    public function logout(Request $request)
    {
        if (Auth::check()) {
            Auth::user()->tokens()->delete();
            
            return response()->json(['message' => 'you have logged out']);
        }

        return response()->json(['error' => 'authentication','description' => 'logging out error']);
    }
}
