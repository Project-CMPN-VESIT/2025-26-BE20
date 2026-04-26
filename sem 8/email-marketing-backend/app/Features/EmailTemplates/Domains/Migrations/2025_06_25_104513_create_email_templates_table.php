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
        Schema::create('email_templates', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('organization_id');
            $table->uuid('template_category_id');
            $table->string('name');
            $table->longText('html_content')->nullable()->default(null);
            $table->json('design_json')->nullable()->default(null);
            $table->string('thumbnail_url')->nullable()->default(null);
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('organization_id')
                  ->references('id')
                  ->on('organizations');

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
        Schema::dropIfExists('email_templates');
    }
};
