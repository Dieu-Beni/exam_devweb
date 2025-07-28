<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::all();
        return response()->json($user, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
        'nom' => 'required|string|max:100',
        'prenom' => 'required|string|max:100',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:6',
        'adresse' => 'nullable|string|max:255',
        'role' => 'required|in:admin,client',
        ]);

        $user = User::create($request->all());
        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json("Utilisateur non trouvé", 404);
        }

        return response()->json($user,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json("Utilisateur non trouvé", 404);
        }

        $user->update($request->all());
        return response()->json($user,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json("Utilisateur non trouvé", 404);
        }

        $user->delete();
        return response()->json("Utilisateur supprime avec succes.", 204);
    }
}
