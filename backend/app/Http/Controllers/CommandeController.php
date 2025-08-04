<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commande;
use App\Models\Paiement;
use App\Models\Panier;
use App\Models\Carte;
use App\Models\Produit;
use App\Http\Controllers\PanierController;
use App\Notifications\CommandeClientNotification;
use App\Notifications\CommandeStatutNotification;
use App\Notifications\CommandeValideeNotification;
use App\Notifications\PaiementNotification;
use Illuminate\Support\Facades\Notification;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

use App\Models\Facture;
use Illuminate\Support\Carbon;
use PDF;
class CommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $commande = Commande::with('user')->orderBy('created_at', 'desc')
                                        ->get()
        ;
        return response()->json($commande, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validation de la commande
        $validated = $request->validate([
            'id_user'    => 'required|exists:users,id',
            'adresse'    => 'required|string|max:255',
            'telephone'  => 'required|string|max:20',
            'quantite'   => 'required|integer|min:1',
            'total'      => 'required|numeric|min:0',
            'statut'     => 'required|in:en attente,expediée,livrée annulée',
            'id_panier'  => 'required|exists:paniers,id',
            'mode_paiement' => 'required|in:en ligne,apres livraison',

        ]);

        // Création de la commande
        $commande = Commande::create([
            'id_user'   => $validated['id_user'],
            'adresse'   => $validated['adresse'],
            'telephone' => $validated['telephone'],
            'quantite'  => $validated['quantite'],
            'total'     => $validated['total'],
            'statut'    => $validated['statut'],
            'id_panier' => $validated['id_panier'],
        ]);

        

      
        

        // Récupérer l'utilisateur (client)
        $client = $commande->user; /* relation user() à définir dans le modèle Commande

        // Récupérer l’admin (par exemple le 1er utilisateur admin)
        $admin = User::where('role', 'admin')->first(); // ou id = 1 si tu as un seul admin

        if ($admin) {
            Notification::create([
                'titre'   => 'Nouvelle commande de ' . $client->name,
                'message' => "Le client {$client->name} a passé une commande (#{$commande->id}) d’un montant de {$commande->total} FCFA.",
                'id_user' => $admin->id
            ]);
        }  */
        $panier_produit = app(PanierController::class)->produitsParPanier2($validated['id_panier']);

        // Création automatique du paiement associé
        $paiement = Paiement::create([
            'id_commande' => $commande->id,
            'mode'        => $validated['mode_paiement'],
            'montant'     => $commande->total,
            'statut'      => $validated['mode_paiement'] === 'en ligne' ? 'payé' : 'non payé'
        ]);


        // Génération de la facture uniquement si mode = apres livraison
        $facture = null;
        $carte = null;

        if ($validated['mode_paiement'] === 'en ligne') {

            
            // Création de la carte
            $carte = Carte::create([
                'id_commande' => $commande->id,
                'id_paiement' => $paiement->id,
                'numero'          => $request->input('numero'),             
                'date_expiration' => $request->input('date_expiration'),
                'cvc'             => $request->input('cvc')
            ]);

            

        }
        // Générer le PDF de la facture
        $pdf = PDF::loadView('factures.factures', [
            'commande' => $commande,
            'paiement' => $paiement,
            'produits' => $panier_produit,
            'client' => $client
        ]);

        // Nom de fichier
        $fileName = 'facture_commande_' . $commande->id . '_' . time() . '.pdf';

        // Sauvegarde dans storage/app/public/factures
        Storage::disk('public')->put('factures/' . $fileName, $pdf->output());

        // Création de la facture
        $facture = Facture::create([
            'id_commande' => $commande->id,
            'montant'     => $commande->total,
            'date'        => now(),
            'fichier_pdf' => 'storage/factures/' . $fileName
        ]);

        $panier = Panier::findOrFail($validated['id_panier']);
        $panier->statut = 'validé';
        $panier->save();

        $panier2 = Panier::create([
                
                'id_user' => $client->id,
                'statut'  => 'en cours'
            ]);

        //mise a jour du stock du produit
       foreach($panier_produit as $panier_pro){
        $pro = Produit::findOrFail($panier_pro->id);
        $pro->stock = $panier_pro->stock - $panier_pro->pivot->quantite;
        $pro->save();
       }

         $clients = User::findOrFail($validated['id_user']);
        $clients->notify(new CommandeValideeNotification($commande));

        // Récupérer l’admin
        $admins = User::where('role', 'admin')->get();

        if ($admins) {
            // Envoi du mail à l'admin
            foreach($admins as $admin){

                $admin->notify(new CommandeClientNotification($commande, $clients));
            }
        }

       if ($validated['mode_paiement'] === 'en ligne') {
       $clients->notify(new PaiementNotification($commande));
       }



        return response()->json([
            'message'  => 'Commande, paiement, et facture (si applicable) créés.',
            'commande' => $commande,
            'paiement' => $paiement,
            'facture'  => $facture,
            'facture_url' => $facture ? asset($facture->chemin_pdf) : null,
            'panier' => $panier2
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $commande = Commande::find($id);

        if (!$commande) {
            return response()->json(['message' => 'Commande non trouvé'], 404);
        }

        return response()->json($commande,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $commande = Commande::find($id);
        if (!$commande) {
            return response()->json("Commande non trouvé", 404);
        }

        $commande->update($request->all());

        // Si le statut est "validée", on envoie un mail au client

            $client = $commande->user; // relation user() dans le modèle Commande

            if ($commande->statut === 'validée' && $client) {
                $client->notify(new CommandeValideeNotification($commande));
            }else{
                $client->notify(new CommandeStatutNotification($commande));
            }

    // 2. Paiement et facture si la commande est livrée
    if ($commande->statut === 'livrée') {
        $paiement = $commande->paiement; // relation paiement() dans Commande

        if ($paiement) {
            $paiement->statut = 'payé';
            $paiement->save();

            // Recharger les produits du panier
            $panierProduits = app(PanierController::class)->produitsParPanier2($commande->id_panier);

            // Génération nouvelle facture PDF
            $pdf = \PDF::loadView('factures.factures', [
                'commande' => $commande,
                'paiement' => $paiement,
                'produits' => $panierProduits,
                'client' => $client
            ]);

            $fileName = 'facture_commande_' . $commande->id . '_'. time() . '.pdf';
            \Storage::disk('public')->put('factures/' . $fileName, $pdf->output());

            // Mise à jour ou création de la facture
            $facture = $commande->facture;
            if ($facture) {
                $facture->update([
                    'montant'     => $commande->total,
                    'date'        => now(),
                    'fichier_pdf' => 'storage/factures/' . $fileName
                ]);
            } else {
                \App\Models\Facture::create([
                    'id_commande' => $commande->id,
                    'montant'     => $commande->total,
                    'date'        => now(),
                    'fichier_pdf' => 'storage/factures/' . $fileName
                ]);
            }
        }
    }
    }

    public function historiqueClient($id)
    {
        $commandes = Commande::with([
            'panier.produits',      // les produits de chaque panier
            'paiement',             // paiement de la commande
            'facture',              // facture s’il y en a
        ])
        ->where('id_user', $id)
        ->orderBy('created_at', 'desc')
        ->get();

        if ($commandes->isEmpty()) {
            return response()->json(['message' => 'Aucune commande trouvée pour cet utilisateur.'], 404);
        }

        return response()->json([
            'commandes' => $commandes
        ], 200);
    }

    public function commandesParUtilisateurs()
{
    // Vérifie que l'utilisateur est admin (optionnel selon ton système d'auth)
   

    // On récupère les utilisateurs avec leurs commandes associées
    $utilisateurs = \App\Models\User::whereHas('commandes')
        ->with(['commandes' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }])
        ->get();

    return response()->json([
        'utilisateurs' => $utilisateurs
    ], 200);
}

    public function paiementParCommande($id_commande)
    {
        // Récupérer le paiement lié à la commande
        $paiement = Paiement::where('id_commande', $id_commande)->first();

        if (!$paiement) {
            return response()->json(['message' => 'Aucun paiement trouvé pour cette commande.'], 404);
        }

        // Récupérer la carte liée au paiement (si elle existe)
        $carte = Carte::where('id_commande', $id_commande)
                    ->where('id_paiement', $paiement->id)
                    ->first();

        // Récupérer la facture liée à la commande (si elle existe)
        $facture = Facture::where('id_commande', $id_commande)->first();

        return response()->json([
            'paiement' => $paiement,
            'carte'    => $carte,
            'facture'  => $facture
            
        ], 200);
    }



}
