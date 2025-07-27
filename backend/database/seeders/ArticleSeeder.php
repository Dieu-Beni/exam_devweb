<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Article;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        Article::insert([
            [
                'id_commande' => 1,
                'id_produit' => 1,
                'quantite' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_commande' => 2,
                'id_produit' => 2,
                'quantite' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
