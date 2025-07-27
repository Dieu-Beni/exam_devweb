<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commande;
class CommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $commande = Commande::all();
        return response()->json($commande, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
            $request->validate([
            'id_user' => 'required|exists:users,id',
            'adresse' => 'required|string|max:255',
            'quantite' => 'required|integer|min:1',
            'total' => 'required|numeric|min:0',
            'statut' => 'required|string',
            'id_panier' => 'required|exists:users,id',

        ]);

        $commande = Commande::create($request->all());
        return response()->json($commande, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $commande = Commande::find($id);

        if (!$commande) {
            return response()->json("Commande non trouvé", 404);
        }

        return response()->json($commande,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $commande = Commande::find($id);
        if (!$commande) {
            return response()->json("Commande non trouvé", 404);
        }

        $commande->update($request->all());
        return response()->json($commande,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $commande = Commande::find($id);
        if (!$commande) {
            return response()->json("Commande non trouvé", 404);
        }

        $commande->delete();
        return response()->json("Commande supprime avec succes.", 204);
    }
}
