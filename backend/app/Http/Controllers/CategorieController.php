<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categorie;
class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categorie = Categorie::all();
        return response()->json($categorie, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
        'nom' => 'required|string'
        ]);

        $categorie = Categorie::create($request->all());
        return response()->json($categorie, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $categorie = Categorie::find($id);

    if (!$categorie) {
        return response()->json("Categorie non trouvé", 404);
    }

    return response()->json($categorie,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $categorie = Categorie::find($id);
        if (!$categorie) {
            return response()->json("Categorie non trouvé", 404);
        }

        $categorie->update($request->all());
        return response()->json($categorie,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $categorie = Categorie::find($id);
        if (!$categorie) {
            return response()->json("Categorie non trouvé", 404);
        }

        $categorie->delete();
        return response()->json("Categorie supprime avec succes.", 204);
    }

    public function showProduitsParCategorie($idCategorie)
    {
        $categorie = Categorie::with('produits')->findOrFail($idCategorie);
        
        return response()->json([
            'categorie' => $categorie->nom,
            'produits' => $categorie->produits,
        ]);

    }
}
