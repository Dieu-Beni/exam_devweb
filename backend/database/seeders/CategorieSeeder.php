<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categorie;

class CategorieSeeder extends Seeder
{
    public function run(): void
    {
        Categorie::insert([
            ['nom' => 'Électronique', 'created_at' => now(), 'updated_at' => now()],
            ['nom' => 'Alimentation', 'created_at' => now(), 'updated_at' => now()],
            ['nom' => 'Vêtements', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
