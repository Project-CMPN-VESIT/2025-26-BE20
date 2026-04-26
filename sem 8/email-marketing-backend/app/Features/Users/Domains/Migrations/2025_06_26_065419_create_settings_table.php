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
        Schema::create('settings', function (Blueprint $table) {
            $table->uuid('organization_id')->primary();
            $table->string('sender_name');
            $table->string('sender_email')->unique();
            $table->boolean('add_recipients_name')->default(false);
            $table->string('default_logo')->nullable();
            $table->json('social_links')->nullable();
            $table->boolean('campaign_track_opens')->default(true);
            $table->boolean('campaign_google_analytics_tracking')->default(false);
            $table->boolean('automation_track_opens')->default(true);
            $table->boolean('automation_google_analytics_tracking')->default(false);
            $table->boolean('force_update_social_links')->default(false);
            $table->longText('organization_details')->nullable();
            $table->boolean('force_update_organization_details')->default(false);
            $table->longText('unsubscribe_disclaimer')->nullable();
            $table->string('email_unsubscribe_link_text')->nullable();
            $table->boolean('force_update_email_unsubscribe_link_text')->default(false);
            $table->string('email_preference_link_text')->nullable();
            $table->boolean('force_update_email_preference_link_text')->default(false);
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
        Schema::dropIfExists('settings');
    }
};
