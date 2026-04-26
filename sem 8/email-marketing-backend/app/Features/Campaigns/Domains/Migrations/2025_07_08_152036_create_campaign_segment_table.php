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
        Schema::create('campaign_segment', function (Blueprint $table) {
            $table->uuid('campaign_id');
            $table->uuid('segment_id');
            $table->timestamps();

            $table->foreign('campaign_id')
                    ->references('id')
                    ->on('campaigns');
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
        Schema::dropIfExists('campaigns_segments');
    }
};
