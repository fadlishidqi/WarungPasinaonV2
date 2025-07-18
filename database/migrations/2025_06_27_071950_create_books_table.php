<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('author');
            $table->text('description');
            $table->string('cover_image')->nullable();
            $table->string('pdf_file');
            $table->enum('category', ['fiksi', 'non-fiksi', 'pendidikan', 'sejarah', 'teknologi', 'agama']);
            $table->string('isbn')->nullable();
            $table->integer('pages')->nullable();
            $table->year('published_year')->nullable();
            $table->string('publisher')->nullable();
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->integer('download_count')->default(0);
            $table->string('file_size')->nullable();
            $table->json('tags')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('books');
    }
};