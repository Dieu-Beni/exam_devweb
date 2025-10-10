<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
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
               $validated['image_url'] = config('app.url') . '/storage/' . $path; // On remplace l'image par son chemin
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
        $produit = Produit::with('categorie')->find($id);

        if (!$produit) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }

        $produit->image_url = $produit->image_url ? asset("storage/{$produit->image_url}") : null;

        return response()->json($produit, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $produit = Produit::find($id);
        if (!$produit) {
            return response()->json(['message' => 'Produit non trouvé', 'contenu'=> $request->all()], 404);
        }

        // Valider les champs envoyés
        $validated = $request->validate([
            'nom' => 'required|string',
            'description' => 'nullable|string',
            'prix' => 'required|numeric',
            'stock' => 'required|integer',
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png,webp,gif|max:2048',
            'id_categorie' => 'required|exists:categories,id'
        ]);
        
        //Log::info('Produit créé avec succès', ['produit' => $produit]);
        // Gérer le remplacement d’image
        if ($request->hasFile('image_url')) {
            // Supprimer l’ancienne image si elle existe
            if ($produit->image_url && \Storage::disk('public')->exists($produit->image_url)) {
                \Storage::disk('public')->delete($produit->image_url);
            }

            // Stocker la nouvelle image
            $path = $request->file('image_url')->store('images', 'public');
            $validated['image_url'] = config('app.url') . '/storage/' . $path;
         
        }

        // Mise à jour
        $produit->update($validated);

        return response()->json([
            'message' => 'Produit mis à jour avec succès',
            'produit' => [
                ...$produit->toArray(),
                'image_url' => $produit->image_url ? asset("storage/{$produit->image_url}") : null,
                'categorie' => $produit->categorie
            ]
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $produit = Produit::find($id);
        if (!$produit) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }

        // Supprimer l’image du stockage si elle existe
        if ($produit->image_url && \Storage::disk('public')->exists($produit->image_url)) {
            \Storage::disk('public')->delete($produit->image_url);
        }

        $produit->delete();

        return response()->json(['message' => 'Produit supprimé avec succès.'], 200);
    }

    public function produitsByCategorieId($idCategorie)
    {
        $produits = Produit::where('id_categorie', $idCategorie)->get();
        return response()->json($produits);
    }
}
