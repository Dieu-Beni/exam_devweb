<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class StatController extends Controller
{
    public function chiffreAffaire()
{
    $parMois = DB::table('factures')
        ->selectRaw('YEAR(created_at) as annee, MONTH(created_at) as mois, SUM(montant) as total')
        ->groupByRaw('YEAR(created_at), MONTH(created_at)')
        ->orderByRaw('YEAR(created_at), MONTH(created_at)')
        ->get();

    $parAnnee = DB::table('factures')
        ->selectRaw('YEAR(created_at) as annee, SUM(montant) as total')
        ->groupByRaw('YEAR(created_at)')
        ->orderByRaw('YEAR(created_at)')
        ->get();

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

                $commandesParMois = DB::table('commandes')
                    ->selectRaw('YEAR(created_at) as annee, MONTH(created_at) as mois, COUNT(*) as total_commandes')
                    ->groupByRaw('YEAR(created_at), MONTH(created_at)')
                    ->orderByRaw('YEAR(created_at), MONTH(created_at)')
                    ->get();


    return response()->json([
        'par_mois' => $parMois,
        'par_annee' => $parAnnee,
        'produits'=> $produitsVendus,
        'commandes_par_mois' => $commandesParMois
    ]);
}
}
