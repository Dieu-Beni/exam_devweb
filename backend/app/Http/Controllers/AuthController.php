<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Panier;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
class AuthController extends Controller
{
// Enregistrement
    public function register(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:100',
            'prenom' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'adresse' => 'required|string|max:255',
            'role' => 'required|in:admin,client',
        ]);
        $user = User::create([
            'nom' => $validated['nom'],
            'prenom' =>$validated['prenom'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'adresse' => $validated['adresse'],
            'role' => $validated['role'],
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
    ], 201);

    }
// Connexion
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $user = User::where('email', $request->email)->first();
        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les informations sont incorrectes.']
            ],401);
        }
        $token = $user->createToken('auth_token')->plainTextToken;

        $panier_id = null;

        // Si c'est un client, on vérifie le panier
        if ($user->role === 'client') {
            $dernierPanier = $user->paniers()->latest()->first();

            if ($dernierPanier && $dernierPanier->statut === 'en cours') {
                $panier_id = $dernierPanier->id;
            } else {
                // Créer un nouveau panier
                $nouveauPanier = Panier::create([
                    'user_id' => $user->id,
                    'statut' => 'en cours',
                ]);
                $panier_id = $nouveauPanier->id;
            }
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'nom' => $user->nom,
                'prenom' => $user->prenom,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'panier_id' => $panier_id,
        ]);
    }
// Déconnexion
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json([
            'message' => 'Déconnecté avec succès'
        ]);
    }
}
