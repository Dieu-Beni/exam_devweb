<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    protected $fillable = ['id_commande', 'statut','mode'];

    public function commande()
    {
        return $this->belongsTo(Commande::class);
    }

}
