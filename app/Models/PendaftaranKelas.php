<?php
// app/Models/PendaftaranKelas.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PendaftaranKelas extends Model
{
    use HasFactory;

    protected $table = 'pendaftaran_kelas';

    protected $fillable = [
        'kelas_id',
        'nama',
        'alamat',
        'no_telp'
    ];

    // Relationship dengan kelas
    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }
}