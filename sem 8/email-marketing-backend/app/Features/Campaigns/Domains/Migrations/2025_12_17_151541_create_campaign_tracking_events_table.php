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
        Schema::create('campaign_tracking_events', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('campaign_id');
            $table->tinyInteger('type');
            $table->dateTime('action_performed_at');
            $table->uuid('contact_id');
            $table->timestamps();

            $table->foreign('campaign_id')
                    ->references('id')
                    ->on('campaigns');
            
            $table->foreign('contact_id')
                    ->references('id')
                    ->on('contacts');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaign_tracking_events');
    }
};
