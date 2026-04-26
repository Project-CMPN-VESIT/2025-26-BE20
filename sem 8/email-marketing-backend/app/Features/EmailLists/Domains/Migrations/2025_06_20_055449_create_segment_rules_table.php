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
        Schema::create('segment_rules', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('segment_id');
            $table->string('field');
            $table->string('operator');
            $table->string('value');

            $table->timestamps();

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
        Schema::dropIfExists('segment_rules');
    }
};
