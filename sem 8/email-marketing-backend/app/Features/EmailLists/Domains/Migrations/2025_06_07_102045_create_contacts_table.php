<?php
namespace App\Features\EmailLists\Domains\Migrations;
use App\Features\EmailLists\Domains\Enums\ContactStatus;
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
        Schema::create('contacts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at');
            $table->enum('status', array_column(ContactStatus::cases(),'value'))->default(ContactStatus::PENDING->value);
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
        Schema::dropIfExists('contacts');
    }
};
