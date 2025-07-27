<?php

namespace App\Http\Controllers;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $article = Article::all();
        return response()->json($article, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
        'id_commande' => 'required|exists:commandes,id',
        'id_produit' => 'required|exists:produits,id',
        'quantite' => 'required|integer|min:1',
        'prix_unitaire' => 'required|numeric|min:0'
        ]);

        $article = Article::create($request->all());
        return response()->json($article, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json("Article non trouvé", 404);
        }

        return response()->json($article,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $article = Article::find($id);
        if (!$article) {
            return response()->json("Article non trouvé", 404);
        }

        $article->update($request->all());
        return response()->json($article,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $article = Article::find($id);
        if (!$article) {
            return response()->json("Article non trouvé", 404);
        }

        $article->delete();
        return response()->json("Article supprime avec succes.", 204);
    }
}
