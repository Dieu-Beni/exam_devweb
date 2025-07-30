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
        Schema::dropIfExists('drop_panier_produit');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
