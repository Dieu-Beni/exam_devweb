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
        Schema::create('articles', function (Blueprint $table) {
        $table->id();
        $table->foreignId('id_commande')->constrained('commandes')->onDelete('cascade');
        $table->foreignId('id_produit')->constrained('produits')->onDelete('cascade');
        $table->integer('quantite');
        $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
