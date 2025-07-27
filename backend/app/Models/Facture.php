<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Facture extends Model
{
    protected $fillable = ['id_commande', 'montant','fichier_pdf'];
}
