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

    public static function getByCommande($commandeId)
    {
        return self::with('carte')
            ->where('id_commande', $commandeId)
            ->first();
    }

    public function carte()
    {
        return $this->hasOne(Carte::class, 'id_paiement');
    }


}
