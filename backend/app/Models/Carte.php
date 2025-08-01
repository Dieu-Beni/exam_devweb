<?php

namespace App\Models;
use App\Models\Commande;
use App\Models\Paiement;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Carte extends Model
{
    protected $fillable = ['id_commande', 'id_paiement', 'numero', 'date_expiration', 'cvc'];

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'id_commande');
    }

    public function paiement()
    {
        return $this->belongsTo(Paiement::class, 'id_paiement');
    }
}
