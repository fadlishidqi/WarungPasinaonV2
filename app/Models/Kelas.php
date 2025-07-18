<?php
// app/Models/Kelas.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Kelas extends Model
{
    use HasFactory;

    protected $table = 'kelas';

    protected $fillable = [
        'nama',
        'deskripsi',
        'gambar',
        'tanggal',
        'hari',
        'kategori',
        'grup_wa',
        'kapasitas',
        'is_active'
    ];

    protected $casts = [
        'tanggal' => 'date',
        'is_active' => 'boolean'
    ];

    // Relationship dengan pendaftaran
    public function pendaftarans()
    {
        return $this->hasMany(PendaftaranKelas::class);
    }

    // Accessor untuk format tanggal Indonesia
    public function getTanggalFormatAttribute()
    {
        return Carbon::parse($this->tanggal)->format('d F Y');
    }

    // Check apakah masih bisa daftar
    public function getIsAvailableAttribute()
    {
        return $this->is_active && 
               $this->tanggal >= now()->toDateString() && 
               $this->pendaftarans()->count() < $this->kapasitas;
    }
}