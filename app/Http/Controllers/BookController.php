<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $query = Book::published();

        // Filter by category
        if ($request->category) {
            $query->where('category', $request->category);
        }

        // Search
        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('author', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        $books = $query->latest()->paginate(12)->withQueryString();

        // Transform books TANPA merusak struktur pagination
        $books->getCollection()->transform(function ($book) {
            return [
                'id' => $book->id,
                'title' => $book->title,
                'slug' => $book->slug,
                'author' => $book->author,
                'description' => $book->description,
                'category' => $book->category,
                'published_year' => $book->published_year,
                'download_count' => $book->download_count,
                'cover_image' => $book->cover_image,
                'cover_url' => $book->cover_url,
                'pdf_url' => $book->pdf_url,
            ];
        });

        $categories = [
            'fiksi' => 'Fiksi',
            'non-fiksi' => 'Non-Fiksi',
            'pendidikan' => 'Pendidikan',
            'sejarah' => 'Sejarah',
            'teknologi' => 'Teknologi',
            'agama' => 'Agama'
        ];

        return Inertia::render('Books/Index', [
            'books' => $books, // Ini tetap struktur pagination Laravel
            'categories' => $categories,
            'filters' => $request->only(['category', 'search'])
        ]);
    }

    public function show(Book $book)
    {
        if ($book->status !== 'published') {
            abort(404);
        }

        // Load URLs manually jika tidak otomatis
        $bookData = $book->toArray();
        $bookData['cover_url'] = $book->cover_url;
        $bookData['pdf_url'] = $book->pdf_url;

        return Inertia::render('Books/Show', [
            'book' => $bookData
        ]);
    }

    public function read(Book $book)
    {
        if ($book->status !== 'published') {
            abort(404);
        }

        // Increment download count
        $book->incrementDownloadCount();

        $bookData = $book->toArray();
        $bookData['cover_url'] = $book->cover_url;
        $bookData['pdf_url'] = $book->pdf_url;

        return Inertia::render('Books/Read', [
            'book' => $bookData
        ]);
    }

    public function download(Book $book)
    {
        Log::info('--- MEMULAI PROSES DOWNLOAD ---');
        Log::info('Buku yang akan di-download: ' . $book->title . ' (ID: ' . $book->id . ')');

        $filePath = $book->pdf_file;
        Log::info('Path file dari database (kolom pdf_file): ' . $filePath);

        if (!$filePath) {
            Log::error('GAGAL: Path file di database kosong.');
            abort(404, 'Path file tidak terdaftar di database.');
        }

        $fileExists = Storage::disk('public')->exists($filePath);
        Log::info('Apakah file ada di storage/app/public? ' . ($fileExists ? 'YA' : 'TIDAK'));

        if (!$fileExists) {
            $expectedPath = storage_path('app/public/' . $filePath);
            Log::error('GAGAL: File tidak ditemukan di lokasi yang diharapkan: ' . $expectedPath);
            abort(404, 'File fisik tidak ditemukan di server.');
        }

        $fullPath = Storage::disk('public')->path($filePath);
        Log::info('Path absolut file yang akan di-download: ' . $fullPath);

        try {
            $book->increment('download_count');
            Log::info('Jumlah download berhasil di-increment.');
        } catch (\Exception $e) {
            Log::error('GAGAL increment download count: ' . $e->getMessage());
        }

        Log::info('--- MENGIRIM FILE KE BROWSER ---');
        return response()->download($fullPath, $book->slug . '.pdf');
    }
}