<?php

use App\Features\Campaigns\Domains\Enums\CampaignStatusEnum;
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
        Schema::create('campaigns', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('organization_id');
            $table->uuid('user_id');
            $table->string('name');
            $table->string('subject');
            $table->string('preheader');
            $table->string('from_name');
            $table->string('from_email');
            $table->string('reply_to_email');
            $table->longText('email_content')->nullable();
            $table->uuid('email_template_id')->nullable();
            $table->tinyInteger('status')->default(CampaignStatusEnum::DRAFT);
            $table->dateTime('sent_at')->nullable();
            $table->dateTime('send_at')->nullable();
            $table->integer('total_recipients');
            $table->integer('opens_count')->default(0);
            $table->integer('clicks_count')->default(0);
            $table->integer('bounces_count')->default(0);
            $table->integer('unsubcribes_count')->default(0);
            $table->integer('spam_complaints_count')->default(0);
            $table->timestamps();

            $table->foreign('organization_id')
                ->references('id')
                ->on('organizations');
        
            $table->foreign('user_id')
                ->references('id')
                ->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaigns');
    }
};
