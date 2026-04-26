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
        Schema::create('segments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('organization_id');
            $table->uuid('email_list_id')->nullable();
            $table->string('name');
            $table->timestamps();


            $table->foreign('organization_id')
                  ->references('id') 
                  ->on('organizations');
                  
            $table->foreign('email_list_id')
                  ->references('id') 
                  ->on('email_lists');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('segments');
    }
};
