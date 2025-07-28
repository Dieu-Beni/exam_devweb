<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Produit;
use App\Http\Controllers\Controller;


class ProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $produit = Produit::with('categorie')->get();
        return response()->json($produit,200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'description' => 'nullable|string',
            'prix' => 'required|numeric',
            'stock' => 'required|integer',
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'id_categorie' => 'required|exists:categories,id'
        ]);

        $produit = Produit::create($request->all());
        return response()->json($produit, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $produit = Produit::find($id);

    if (!$produit) {
        return response()->json("Produit non trouvé", 404);
    }

    $produit = Produit::with('categorie')->findOrFail($id);
    return response()->json($produit,200);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $produit = Produit::find($id);
        if (!$produit) {
            return response()->json("Produit non trouvé", 404);
        }

        $produit->update($request->all());
        return response()->json($produit,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $produit = Produit::find($id);
        if (!$produit) {
            return response()->json("Produit non trouvé", 404);
        }

        $produit->delete();
        return response()->json("Produit supprime avec succes.", 204);

    }

    public function produitsByCategorieId($idCategorie)
    {
        $produits = Produit::where('id_cat', $idCategorie)->get();
        return response()->json($produits);
    }
}
