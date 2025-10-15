<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class StatController extends Controller
{
    public function chiffreAffaire()
    {
        // ✅ Chiffre d'affaires par mois (PostgreSQL)
        $parMois = DB::table('factures')
            ->selectRaw('EXTRACT(YEAR FROM created_at)::INT as annee, EXTRACT(MONTH FROM created_at)::INT as mois, SUM(montant) as total')
            ->groupByRaw('EXTRACT(YEAR FROM created_at), EXTRACT(MONTH FROM created_at)')
            ->orderByRaw('EXTRACT(YEAR FROM created_at), EXTRACT(MONTH FROM created_at)')
            ->get();

        // ✅ Chiffre d'affaires par année
        $parAnnee = DB::table('factures')
            ->selectRaw('EXTRACT(YEAR FROM created_at)::INT as annee, SUM(montant) as total')
            ->groupByRaw('EXTRACT(YEAR FROM created_at)')
            ->orderByRaw('EXTRACT(YEAR FROM created_at)')
            ->get();

        // ✅ Produits les plus vendus
        $produitsVendus = DB::table('panier_produits')
            ->join('paniers', 'panier_produits.id_panier', '=', 'paniers.id')
            ->join('produits', 'panier_produits.id_produit', '=', 'produits.id')
            ->where('paniers.statut', 'validé')
            ->select(
                'produits.id',
                'produits.nom',
                'produits.prix',
                DB::raw('SUM(panier_produits.quantite) as total_vendus')
            )
            ->groupBy('produits.id', 'produits.nom', 'produits.prix')
            ->orderByDesc('total_vendus')
            ->get();

        // ✅ Nombre de commandes par mois
        $commandesParMois = DB::table('commandes')
            ->selectRaw('EXTRACT(YEAR FROM created_at)::INT as annee, EXTRACT(MONTH FROM created_at)::INT as mois, COUNT(*) as total_commandes')
            ->groupByRaw('EXTRACT(YEAR FROM created_at), EXTRACT(MONTH FROM created_at)')
            ->orderByRaw('EXTRACT(YEAR FROM created_at), EXTRACT(MONTH FROM created_at)')
            ->get();

        return response()->json([
            'par_mois' => $parMois,
            'par_annee' => $parAnnee,
            'produits' => $produitsVendus,
            'commandes_par_mois' => $commandesParMois,
        ]);
    }
}