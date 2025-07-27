<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Image;

class ImageSeeder extends Seeder
{
    public function run(): void
    {
        Image::insert([
            [
                'url' => 'images/tv_samsung.jpg',
                'id_produit' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'url' => 'images/lait_uht.jpg',
                'id_produit' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
