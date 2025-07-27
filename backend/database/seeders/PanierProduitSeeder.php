<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Panier_produit;;

class PanierProduitSeeder extends Seeder
{
    public function run(): void
    {
        Panier_produit::insert([
            [
                'id_panier' => 1,
                'id_produit' => 1,
                'quantite' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_panier' => 2,
                'id_produit' => 2,
                'quantite' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}