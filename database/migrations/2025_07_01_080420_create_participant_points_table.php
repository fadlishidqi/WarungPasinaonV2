<?php
// database/migrations/create_participant_points_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('participant_points', function (Blueprint $table) {
            $table->id();
            $table->foreignId('participant_id')->constrained()->cascadeOnDelete();
            $table->integer('points')->default(0);
            $table->string('activity_type')->default('library_visit');
            $table->text('description')->nullable();
            $table->date('earned_date');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('participant_points');
    }
};