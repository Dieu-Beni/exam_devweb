<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::insert([
            [
                'nom' => 'Admin',
                'prenom' => 'Junior',
                'email' => 'admin@example.com',
                'password' => Hash::make('password123'),
                'adresse' => '123 Rue Principale',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Doe',
                'prenom' => 'John',
                'email' => 'john.doe@example.com',
                'password' => Hash::make('secret'),
                'adresse' => '456 Avenue Centrale',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
