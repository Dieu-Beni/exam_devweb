<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Panier;
use App\Models\Commande;
class PanierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $panier = Panier::all();
        return response()->json($panier, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
            $userId = $request->user()->id;

            // Cherche un panier actif (statut = 'en cours')
            $panierActif = \App\Models\Panier::where('id_user', $userId)
                                            ->where('statut', 'en cours')
                                            ->first();

            if ($panierActif) {
                return response()->json([
                    'message' => 'Vous avez déjà un panier actif.',
                    'panier' => $panierActif,
                ], 400);
            }

            // Création d’un nouveau panier actif
            $panier = \App\Models\Panier::create([
                'id_user' => $userId,
                'statut' => 'en cours',
            ]);

            return response()->json($panier, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $panier = Panier::find($id);

        if (!$panier) {
            return response()->json("Panier non trouvé", 404);
        }

        return response()->json($panier,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $panier = Panier::find($id);
        if (!$panier) {
            return response()->json("Panier non trouvé", 404);
        }

        $panier->update($request->all());
        return response()->json($panier,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $panier = Panier::find($id);
        if (!$panier) {
            return response()->json("Panier non trouvé", 404);
        }

        $panier->delete();
        return response()->json("Panier supprime avec succes.", 204);
    }

    public function validerPanier($idPanier)
    {
        $panier = \App\Models\Panier::findOrFail($idPanier);

        // Vérifie que l’utilisateur possède ce panier
        if ($panier->id_user !== auth()->id()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        // Change le statut pour indiquer qu’il est validé (par exemple)
        $panier->statut = 'validé';
        $panier->save();

        return response()->json(['message' => 'Panier validé avec succès', 'panier' => $panier]);
    }

    public function valider($id_panier)
    {
        $panier = Panier::with('produits')->findOrFail($id_panier);

        // Vérifier s'il est déjà validé
        if ($panier->statut === 'validé') {
            return response()->json(['message' => 'Ce panier est déjà validé.'], 400);
        }

        // Étape 1 : Marquer le panier comme validé
        $panier->statut = 'validé';
        $panier->save();

        // Étape 2 : Créer la commande liée
        $commande = Commande::create([
            'id_user' => $panier->id_user,
            'id_panier' => $panier->id,
            'statut' => 'en attente', // ou 'payée', 'livrée' etc. selon ton app
            
            'total' => $panier->produits->sum(function ($produit) {
                return $produit->pivot->montant;
            }),
        ]);

        return response()->json([
            'message' => 'Panier validé et commande créée.',
            'commande_id' => $commande->id,
            'total' => $commande->total
        ], 201);
    }

    public function produitsParPanier($id)
    {
        $panier = Panier::with('produits')->find($id);

        if (!$panier) {
            return response()->json(['message' => 'Panier non trouvé'], 404);
        }

        return response()->json([
            'message' => 'Produits récupérés avec succès pour le panier',
            'id_panier' => $panier->id,
            'produits' => $panier->produits
            
        ], 200);
    }

}
