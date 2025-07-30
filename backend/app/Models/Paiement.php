<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Facture;
use App\Models\Commande;

class Paiement extends Model
{
    protected $fillable = ['id_commande', 'statut','mode'];

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'id_commande');
    }

}
