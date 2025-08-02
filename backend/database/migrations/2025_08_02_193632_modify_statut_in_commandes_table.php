<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('commandes', function (Blueprint $table) {
            // Modifier le champ en enum (tu peux d'abord le supprimer s'il existe déjà)
            $table->enum('statut', ['en attente', 'expédiée', 'livrée', 'annulée'])->default('en attente')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('commandes', function (Blueprint $table) {
            // Revenir à l’ancien type si besoin (ex. string)
            $table->enum('statut', ['en attente', 'en préparation', 'livrée'])->default('en attente')->change();
        });
    }
};
