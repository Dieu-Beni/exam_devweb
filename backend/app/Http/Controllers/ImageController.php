<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $image = Image::all();
        return response()->json($image, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
        'id_produit' => 'required|exists:produits,id',
        'chemin_image' => 'required|file'  // ou 'file' si c’est un upload

        ]);

        $image = Image::create($request->all());
        return response()->json($image, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $image = Image::find($id);

        if (!$image) {
            return response()->json("Image non trouvé", 404);
        }

        return response()->json($image,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $image = Image::find($id);
        if (!$image) {
            return response()->json("Image non trouvé", 404);
        }

        $image->update($request->all());
        return response()->json($image,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $image = Image::find($id);
        if (!$image) {
            return response()->json("Image non trouvé", 404);
        }

        $image->delete();
        return response()->json("Image supprime avec succes.", 204);
    }
}
