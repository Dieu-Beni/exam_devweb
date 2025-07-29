<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Panier_produit extends Model
{
    protected $fillable = ['id_panier', 'id_produit', 'quantite','montant'];
}
