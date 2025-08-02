<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commande;
use App\Models\Produit;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function statistiques()
    {
        // Chiffre d’affaires total (somme des totaux des commandes validées)
        $chiffreAffaires = Commande::where('statut', 'validée')->sum('total');

        // Nombre total de commandes validées
        $nombreCommandes = Commande::where('statut', 'validée')->count();

        // Produits les plus vendus (somme des quantités vendues, tri décroissant, top 5)
        $produitsPlusVendus = DB::table('panier_produit')
            ->select('produit_id', DB::raw('SUM(quantite) as total_vendu'))
            ->groupBy('produit_id')
            ->orderByDesc('total_vendu')
            ->limit(5)
            ->get()
            ->map(function($item) {
                $produit = Produit::find($item->produit_id);
                return [
                    'produit_id' => $item->produit_id,
                    'nom' => $produit ? $produit->nom : 'Produit supprimé',
                    'total_vendu' => $item->total_vendu,
                ];
            });

        return response()->json([
            'chiffre_affaires' => $chiffreAffaires,
            'nombre_commandes' => $nombreCommandes,
            'produits_plus_vendus' => $produitsPlusVendus,
        ]);
    }
}
