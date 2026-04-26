<?php

use App\Features\EmailTemplates\Domains\Enums\TemplateState;
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
        Schema::table('predefined_templates', function (Blueprint $table) {
            $table->enum('state',array_column(TemplateState::cases(),'value'))->default(TemplateState::CREATE);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('predefined_templates', function (Blueprint $table) {
            $table->dropColumn('state');
        });
    }
};
