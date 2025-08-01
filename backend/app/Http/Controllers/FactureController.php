<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Facture;
use PDF;
use Illuminate\Support\Facades\Storage;


class FactureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $factures = Facture::with('commande.user')->get();
        return response()->json($factures, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
        'id_commande' => 'required|exists:commandes,id',
        'montant' => 'required'|'decimal',
        'chemin_pdf' => 'required|string'  // ou file si upload
        ]);

        $facture = Facture::create($request->all());
        return response()->json($facture, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $facture = Facture::with('commande.user')->find($id);

        if (!$facture) {
            return response()->json(['message' => 'Facture non trouvée'], 404);
        }

        return response()->json([
            'facture' => $facture,
            'url_pdf' => asset($facture->fichier_pdf)
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
       
        $facture = Facture::find($id);
        if (!$facture) {
            return response()->json("facture non trouvé", 404);
        }

        $facture->update($request->all());
        return response()->json($facture,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $facture = Facture::find($id);
        if (!$facture) {
            return response()->json("Facture non trouvé", 404);
        }

        $facture->delete();
        return response()->json("Facture supprime avec succes.", 204);
    }


    public function voir($id)
    {
        $facture = Facture::findOrFail($id);

        if (!$facture->fichier_pdf || !Storage::disk('public')->exists(str_replace('storage/', '', $facture->fichier_pdf))) {
            return response()->json(['message' => 'Fichier PDF introuvable.'], 404);
        }

        return view('facture.afficher', compact('facture'));
    }


    public function telecharger($id)
    {
        $facture = Facture::findOrFail($id);

        if (!$facture->fichier_pdf || !Storage::disk('public')->exists(str_replace('storage/', '', $facture->fichier_pdf))) {
            return response()->json(['message' => 'Fichier PDF introuvable.'], 404);
        }

        $path = str_replace('storage/', '', $facture->fichier_pdf);
        return response()->download(storage_path('app/public/' . $path));
    }
    
    
}
