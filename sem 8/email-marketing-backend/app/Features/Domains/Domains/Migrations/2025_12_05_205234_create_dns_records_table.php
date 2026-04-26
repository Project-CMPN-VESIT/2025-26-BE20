<?php

use App\Features\Domains\Domains\Enums\DnsRecordEnum;
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
        Schema::create('dns_records', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('domain_id');
            $table->enum('type', array_column(DnsRecordEnum::cases(), 'value'));
            $table->string('name');
            $table->string('value');
            $table->timestamps();

            $table->foreign('domain_id')
                ->references('id')
                ->on('domains');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dns_records');
    }
};
