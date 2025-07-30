<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Commande;

class Facture extends Model
{
    protected $fillable = ['id_commande', 'montant','fichier_pdf'];

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'id_commande');
    }

}
