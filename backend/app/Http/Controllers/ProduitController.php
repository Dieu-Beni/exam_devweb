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
       
      $validated = $request->validate([
                'nom' => 'required|string',
                'description' => 'nullable|string',
                'prix' => 'required|numeric',
                'stock' => 'required|integer',
                'image_url' => 'nullable|image|mimes:jpg,jpeg,png,webp,gif|max:2048',
                'id_categorie' => 'required|exists:categories,id'
            ]);
           
            // Étape 2 : traitement de l'image
            if ($request->hasFile('image_url')) {
                $path = $request->file('image_url')->store('images', 'public');
                $validated['image_url'] = $path; // On remplace l'image par son chemin
            }

            // 3. Création du produit
            try {
                $produit = Produit::create($validated);
                
                return response()->json([
                    'message' => 'Produit créé avec succès',
                    'produit' => [
                        ...$produit->toArray(),
                        'image_url' => $produit->image_url ? asset("storage/{$produit->image_url}") : null,
                        'categorie' => $produit->categorie
                    ]
                ], 201);

            } catch (\Exception $e) {
                return response()->json([
                    'message' => 'Erreur lors de la création du produit',
                    'error' => $e->getMessage()
                ], 500);
            }

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
        $produits = Produit::where('id_categorie', $idCategorie)->get();
        return response()->json($produits);
    }
}
