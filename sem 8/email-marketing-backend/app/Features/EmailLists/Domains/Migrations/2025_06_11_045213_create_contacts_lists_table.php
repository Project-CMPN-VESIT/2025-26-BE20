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
        Schema::create('contact_email_list', function (Blueprint $table) {
            $table->uuid('contact_id');
            $table->uuid('email_list_id');

            $table->foreign('contact_id')
                  ->references('id')
                  ->on('contacts');

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
        Schema::dropIfExists('contacts_lists');
    }
};
