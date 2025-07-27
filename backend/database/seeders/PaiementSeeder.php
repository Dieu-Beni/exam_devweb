<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Paiement;

class PaiementSeeder extends Seeder
{
    public function run(): void
    {
        Paiement::insert([
            [
                'id_commande' => 1,
                'statut' => 'payé',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_commande' => 2,
                'statut' => 'en attente',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}