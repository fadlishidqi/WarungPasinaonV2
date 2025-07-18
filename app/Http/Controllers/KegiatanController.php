<?php
// app/Http/Controllers/KegiatanController.php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KegiatanController extends Controller
{
    public function index(Request $request)
    {
        $category = $request->get('category', 'literasi');
        
        $kegiatan = Kegiatan::where('status', 'published')
            ->where('category', $category)
            ->orderBy('date', 'desc')
            ->get();

        // Get counts for each category
        $categoryCounts = [
            'literasi' => Kegiatan::where('status', 'published')->where('category', 'literasi')->count(),
            'keagamaan' => Kegiatan::where('status', 'published')->where('category', 'keagamaan')->count(),
            'kesehatan' => Kegiatan::where('status', 'published')->where('category', 'kesehatan')->count(),
            'umkm' => Kegiatan::where('status', 'published')->where('category', 'umkm')->count(),
        ];

        return Inertia::render('Kegiatan/Index', [
            'kegiatan' => $kegiatan,
            'currentCategory' => $category,
            'categoryCounts' => $categoryCounts
        ]);
    }

    public function show($slug)
    {
        // Cari kegiatan berdasarkan slug
        $kegiatan = Kegiatan::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        // Pastikan tags adalah array
        $kegiatan->tags = is_array($kegiatan->tags) ? $kegiatan->tags : [];

        $related = Kegiatan::where('status', 'published')
            ->where('category', $kegiatan->category)
            ->where('id', '!=', $kegiatan->id)
            ->orderBy('date', 'desc')
            ->take(3)
            ->get();

        return Inertia::render('Kegiatan/Show', [
            'kegiatan' => $kegiatan,
            'related' => $related
        ]);
    }
}