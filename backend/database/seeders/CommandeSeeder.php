<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Commande;

class CommandeSeeder extends Seeder
{
    public function run(): void
    {
        Commande::insert([
            [
                'id_user' => 1,
                'id_panier' => 1,
                'statut' => 'livrée',
                'adresse' => '123 Rue Principale',
                'quantite' => 3,
                'total' => 750000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_user' => 2,
                'id_panier' => 2,
                'statut' => 'en préparation',
                'adresse' => '456 Avenue Centrale',
                'quantite' => 1,
                'total' => 500,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}