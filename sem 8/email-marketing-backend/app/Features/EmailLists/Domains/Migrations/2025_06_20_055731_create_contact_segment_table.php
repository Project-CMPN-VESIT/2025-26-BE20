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
        Schema::create('contact_segment', function (Blueprint $table) {
            $table->uuid('contact_id');
            $table->uuid('segment_id');

            $table->foreign('contact_id')
                   ->references('id')
                   ->on('contacts');
                   
            $table->foreign('segment_id')
                  ->references('id')
                  ->on('segments');  
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_segment');
    }
};
