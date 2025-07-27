<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Paiement;
class PaiementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paiement = Paiement::all();
        return response()->json($paiement, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
        'id_commande' => 'required|exists:commandes,id',
        'mode' => 'required|in:en_ligne,apres_livraison',
        'montant' => 'required|numeric|min:0',
        'date' => 'nullable|date',
        'statut' => 'required|in:payé,non_payé'

        ]);

        $paiement = Paiement::create($request->all());
        return response()->json($paiement, 201);
    
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $paiement = Paiement::find($id);

        if (!$paiement) {
            return response()->json("Paiement non trouvé", 404);
        }

        return response()->json($paiement,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $paiement = Paiement::find($id);
        if (!$paiement) {
            return response()->json("Paiement non trouvé", 404);
        }

        $paiement->update($request->all());
        return response()->json($paiement,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $paiement = Paiement::find($id);
        if (!$paiement) {
            return response()->json("Paiement non trouvé", 404);
        }

        $paiement->delete();
        return response()->json("Paiement supprime avec succes.", 204);
    }
}
