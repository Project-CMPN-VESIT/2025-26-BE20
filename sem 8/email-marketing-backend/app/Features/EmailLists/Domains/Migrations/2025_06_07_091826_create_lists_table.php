<?php
namespace App\Features\EmailLists\Domains\Migrations;
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
        Schema::create('email_lists', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->unique();
            $table->longText('description');
            $table->integer('total_subscribers')->default(0);
            $table->uuid('organization_id');
            $table->timestamps();


            $table->foreign('organization_id')
                  ->references('id')
                  ->on('organizations');  
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lists');
    }
};
