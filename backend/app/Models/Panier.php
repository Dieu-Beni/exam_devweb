<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Panier_produit;


class Panier extends Model
{
    protected $fillable = ['id_user', 'statut'];


    public function utilisateur()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function produits()
    {
        return $this->hasMany(Panier_produit::class, 'id_panier');
    }


}
