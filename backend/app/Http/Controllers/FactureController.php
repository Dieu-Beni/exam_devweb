<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Facture;
use PDF;


class FactureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $facture = Facture::all();
        return response()->json($facture, 200);
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
    public function show(string $id)
    {
        $facture = Facture::find($id);

        if (!$facture) {
            return response()->json("Facture non trouvé", 404);
        }

        return response()->json($facture,200);
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

    public function genererPdf($idFacture)
    {
        $facture = \App\Models\Facture::with('commande.articles.produit', 'commande.user')->findOrFail($idFacture);

        $pdf = PDF::loadView('factures.pdf', compact('facture'));

        // Option 1 : Retourner le PDF pour téléchargement direct (frontend peut gérer le flux)
        return $pdf->download("facture_{$idFacture}.pdf");

        // Option 2 : Retourner le PDF en affichage dans navigateur (selon besoin frontend)
        // return $pdf->stream("facture_{$idFacture}.pdf");
    }
}
