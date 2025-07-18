<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Book extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'author',
        'description',
        'cover_image',
        'pdf_file',
        'category',
        'isbn',
        'pages',
        'published_year',
        'publisher',
        'status',
        'download_count',
        'file_size',
        'tags'
    ];

    protected $casts = [
        'tags' => 'array',
        'published_year' => 'integer',
        'pages' => 'integer',
        'download_count' => 'integer'
    ];

    // Tambahkan appends untuk memuat URL otomatis
    protected $appends = ['cover_url', 'pdf_url'];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function getExcerptAttribute()
    {
        return substr(strip_tags($this->description), 0, 150) . '...';
    }

    // Perbaiki method getCoverUrlAttribute
    public function getCoverUrlAttribute()
    {
        if (!$this->cover_image) {
            return null;
        }

        // Cek apakah file ada di storage
        if (Storage::disk('public')->exists($this->cover_image)) {
            return asset('storage/' . $this->cover_image);
        }

        return null;
    }

    // Perbaiki method getPdfUrlAttribute
    public function getPdfUrlAttribute()
    {
        if (!$this->pdf_file) {
            return null;
        }

        // Cek apakah file ada di storage
        if (Storage::disk('public')->exists($this->pdf_file)) {
            return asset('storage/' . $this->pdf_file);
        }

        return null;
    }

    public function incrementDownloadCount()
    {
        $this->increment('download_count');
    }

    public static function getCategoryLabel($category)
    {
        $labels = [
            'fiksi' => 'Fiksi',
            'non-fiksi' => 'Non-Fiksi',
            'pendidikan' => 'Pendidikan',
            'sejarah' => 'Sejarah',
            'teknologi' => 'Teknologi',
            'agama' => 'Agama'
        ];

        return $labels[$category] ?? $category;
    }
}