<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Facture;


class FactureSeeder extends Seeder
{
    public function run(): void
    {
        Facture::insert([
            [
                'id_commande' => 1,
                'montant' => 750000,
                'fichier_pdf' => 'facture_1.pdf',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_commande' => 2,
                'montant' => 500,
                'fichier_pdf' => 'facture_2.pdf',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}