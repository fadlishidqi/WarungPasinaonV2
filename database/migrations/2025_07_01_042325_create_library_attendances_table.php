<?php
// database/migrations/create_library_attendances_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('library_attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('participant_id')->constrained()->cascadeOnDelete();
            $table->date('visit_date');
            $table->time('visit_time');
            
            // Field khusus untuk anak-anak (hanya nama dan alamat)
            $table->string('child_name')->nullable();
            $table->text('child_address')->nullable();
            
            // Field khusus untuk umum (nama, alamat, institusi, keterangan)
            $table->string('general_name')->nullable();
            $table->text('general_address')->nullable();
            $table->string('institution')->nullable();
            $table->text('notes')->nullable();
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('library_attendances');
    }
};