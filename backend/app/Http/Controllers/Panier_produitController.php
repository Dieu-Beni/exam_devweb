<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Panier_produit;
use App\Models\Produit;
use App\Models\Panier;
class Panier_produitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $panier_produit = Panier_produit::all();
        return response()->json($panier_produit, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'id_panier' => 'required|exists:paniers,id',
            'id_produit' => 'required|exists:produits,id',
            'quantite' => 'required|integer|min:1'

        ]);

        $panier = Panier::findOrFail($request->id_panier);
        $produit = Produit::findOrFail($request->id_produit);

        $quantite = $request->quantite;
        $montant = $produit->prix * $quantite;

        // Ajoute le produit au panier via la relation many-to-many avec pivot
        $panier->produits()->attach($produit->id, [
            'quantite' => $quantite,
            'montant' => $montant,
        ]);

        return response()->json([
            'message' => 'Produit ajouté au panier',
            'panier_id' => $panier->id,
            'produit_id' => $produit->id,
            'quantite' => $quantite,
            'montant' => $montant,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $panier_produit = Panier_produit::find($id);

        if (!$panier_produit) {
            return response()->json(['message' => 'Panier_produit non trouver'] ,404);
        }

        return response()->json($panier_produit,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $panier_produit = Panier_produit::find($id);
        if (!$panier_produit) {
            return response()->json(['message' => 'Produit_panier non trouver'], 404);
        }

        $panier_produit->update($request->all());
        return response()->json($panier_produit,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $panier_produit = Panier_produit::find($id);
        if (!$panier_produit) {
            return response()->json(['message' => 'Panier_produit non trouver'], 404);
        }

        $panier_produit->delete();
        return response()->json(['message' => 'Panier_produit supprimer avec succes'], 204);
    }
}
