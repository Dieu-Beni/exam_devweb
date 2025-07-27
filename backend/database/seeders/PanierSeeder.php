<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Panier;

class PanierSeeder extends Seeder
{
    public function run(): void
    {
        Panier::insert([
            [
                'id_user' => 1,
                'statut' => 'en cours',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_user' => 2,
                'statut' => 'validé',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
