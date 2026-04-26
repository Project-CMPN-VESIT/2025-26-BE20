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
        Schema::create('predefined_templates', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->longText('html_content')->nullable();
            $table->json('design_json')->nullable();
            $table->string('thumbnail_url')->nullable();
            $table->uuid('template_category_id');
            $table->timestamps();

            $table->foreign('template_category_id')
                  ->references('id')
                  ->on('template_categories');  
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('predefined_templates');
    }
};
