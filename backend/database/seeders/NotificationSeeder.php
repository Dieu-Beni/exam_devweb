<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Notification;

class NotificationSeeder extends Seeder
{
    public function run(): void
    {
        Notification::insert([
            [
                'id_user' => 1,
                'message' => 'Votre commande a été expédiée.',
                
            ],
            [
                'id_user' => 2,
                'message' => 'Nouveau message de support disponible.',
                
            ],
        ]);
    }
}
