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
                'nom' => 'Ordinateur Portable HP',
                'description' => 'PC portable performant pour le travail et les études.',
                'prix' => 599.99,
                'stock' => 10,
                'id_categorie' => 1,
                'image_url' => 'https://example.com/images/produits/pc-hp.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Smartphone Samsung Galaxy',
                'description' => 'Smartphone haut de gamme avec excellent appareil photo.',
                'prix' => 799.00,
                'stock' => 15,
                'id_categorie' => 2,
                'image_url' => 'https://example.com/images/produits/galaxy.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
