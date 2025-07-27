<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Produit;


class Categorie extends Model
{
    protected $fillable = ['nom'];

    public function produits()
    {
        return $this->hasMany(Produit::class, 'id_cat');
    }

}
