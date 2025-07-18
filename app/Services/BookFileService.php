<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class BookFileService
{
    public static function handlePdfUpload(UploadedFile $file): array
    {
        try {
            // Store file
            $path = $file->store('books/pdfs', 'public');
            
            // Calculate file size safely
            $sizeInBytes = $file->getSize();
            $sizeInMB = round($sizeInBytes / 1024 / 1024, 2);
            $formattedSize = $sizeInMB . ' MB';
            
            return [
                'path' => $path,
                'size' => $formattedSize,
                'original_name' => $file->getClientOriginalName(),
            ];
        } catch (\Exception $e) {
            throw new \Exception('Failed to upload PDF: ' . $e->getMessage());
        }
    }

    public static function handleCoverUpload(UploadedFile $file): string
    {
        try {
            return $file->store('books/covers', 'public');
        } catch (\Exception $e) {
            throw new \Exception('Failed to upload cover: ' . $e->getMessage());
        }
    }

    public static function deleteFile(string $path): bool
    {
        try {
            if (Storage::disk('public')->exists($path)) {
                return Storage::disk('public')->delete($path);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}