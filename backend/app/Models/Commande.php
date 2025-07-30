<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Article;
use App\Models\Facture;
use App\Models\Paiement;
use App\Models\Panier;


class Commande extends Model
{
    protected $fillable = ['id_user', 'statut', 'adresse', 'quantite', 'total','id_panier','telephone'];


    public function user()
{
    return $this->belongsTo(User::class, 'id_user');
}

    public function paiement()
    {
        return $this->hasOne(Paiement::class, 'id_commande');
    }

    public function facture()
    {
        return $this->hasOne(Facture::class, 'id_commande');
    }

    public function articles()
    {
        return $this->hasMany(Article::class, 'id_commande');
    }

    public function panier()
{
    return $this->belongsTo(Panier::class, 'id_panier');
}

}
