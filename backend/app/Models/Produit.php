<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Image;
use App\Models\Panier_produit;
use App\Models\Categorie;
use App\Models\Article;


class Produit extends Model
{
    protected $fillable = ['nom', 'description', 'prix', 'stock','image_url', 'id_cat'];


    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'id_cat');
    }

    public function images()
    {
        return $this->hasMany(Image::class, 'id_produit');
    }

    public function panierProduits()
    {
        return $this->hasMany(Panier_produit::class, 'id_produit');
    }

    public function articles()
    {
        return $this->hasMany(Article::class, 'id_produit');
    }

}
