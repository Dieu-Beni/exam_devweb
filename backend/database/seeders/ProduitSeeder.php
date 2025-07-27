<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Produit;

class ProduitSeeder extends Seeder
{
    public function run(): void
    {
        Produit::insert([
            [
                'nom' => 'Télévision Samsung',
                'description' => 'Smart TV 50 pouces',
                'prix' => 250000,
                'stock' => 10,
                'id_cat' => 1, // Électronique
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Lait UHT',
                'description' => 'Brique de lait de 1L',
                'prix' => 500,
                'stock' => 200,
                'id_cat' => 2, // Alimentation
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
