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
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('plan_id');
            $table->uuid('organization_id');
            $table->tinyInteger('status')->default(0);
            $table->date('start_date');
            $table->date('end_date');
            $table->date('trial_ends_at');
            $table->timestamps();

            $table->foreign('plan_id')
                    ->references('id')
                    ->on('plans');

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
        Schema::dropIfExists('subscriptions');
    }
};
