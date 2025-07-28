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
        Schema::table('produits', function (Blueprint $table) {
            // Drop foreign key constraint (important avant de renommer)
            $table->dropForeign(['id_cat']);

            // Rename column
            $table->renameColumn('id_cat', 'id_categorie');
        });

        // Re-add foreign key with the new name
        Schema::table('produits', function (Blueprint $table) {
            $table->foreign('id_categorie')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('produits', function (Blueprint $table) {
            $table->dropForeign(['id_categorie']);
            $table->renameColumn('id_categorie', 'id_cat');
        });

        Schema::table('produits', function (Blueprint $table) {
            $table->foreign('id_cat')->references('id')->on('categories')->onDelete('cascade');
        });
    }
};
