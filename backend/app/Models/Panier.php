<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Commande;
use App\Models\Panier;
use App\Models\Produit;
use App\Models\Panier_produit;


class Panier extends Model
{
    protected $fillable = ['id_user', 'statut'];


    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function produits()
    {
        return $this->belongsToMany(Produit::class, 'panier_produits','id_panier','id_produit')
                    ->withPivot('quantite', 'montant','id')
                    ->withTimestamps();
    }

    public function commande()
{
    return $this->hasOne(Commande::class, 'id_panier');
}


}
