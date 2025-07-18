import React from "react";
import { Head, Link } from "@inertiajs/react";
import { Book } from "@/types";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import GeminiChatBot from '@/Components/GeminiChatBot';

interface BookShowProps {
    book: Book;
}

const BookShow: React.FC<BookShowProps> = ({ book }) => {
    const categories: { [key: string]: string } = {
        // Penambahan tipe untuk 'categories'
        fiksi: "Fiksi",
        "non-fiksi": "Non-Fiksi",
        pendidikan: "Pendidikan",
        sejarah: "Sejarah",
        teknologi: "Teknologi",
        agama: "Agama",
    };

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat("id-ID").format(num);
    };

    return (
        <>
            <Head title={`${book.title} - Warung Pasinaon`} />
            <Navbar />

            <div className="min-h-screen bg-gray-50">
                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="md:flex">
                            {/* Book Cover */}
                            <div className="md:w-1/3 bg-gray-100 p-6 flex flex-col items-center">
                                <div className="w-64 h-80 mb-6 bg-gray-200 rounded-lg shadow-md overflow-hidden">
                                    {book.cover_url ? (
                                        <img
                                            src={book.cover_url}
                                            alt={book.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <svg
                                                className="w-20 h-20"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-3 w-full max-w-xs">
                                    <Link
                                        href={`/buku-digital/${book.slug}/baca`}
                                        className="bg-green-600 text-white px-6 py-3 rounded-lg text-center hover:bg-green-700 transition-colors block font-medium"
                                    >
                                        📖 Baca Online
                                    </Link>
                                    <a
                                        href={`/buku-digital/${book.slug}/download`}
                                        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-center hover:bg-blue-700 transition-colors block font-medium"
                                    >
                                        ⬇️ Download PDF
                                    </a>
                                </div>
                            </div>

                            {/* Book Details */}
                            <div className="md:w-2/3 p-6">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {book.title}
                                </h1>
                                <p className="text-xl text-gray-600 mb-4">
                                    oleh{" "}
                                    <span className="font-semibold">
                                        {book.author}
                                    </span>
                                </p>

                                {/* Book Info Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <div className="text-sm text-gray-500">
                                            Kategori
                                        </div>
                                        <div className="font-semibold">
                                            {categories[book.category] ||
                                                "Tidak ada kategori"}
                                        </div>
                                    </div>
                                    {book.published_year && (
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <div className="text-sm text-gray-500">
                                                Tahun Terbit
                                            </div>
                                            <div className="font-semibold">
                                                {book.published_year}
                                            </div>
                                        </div>
                                    )}
                                    {book.pages && (
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <div className="text-sm text-gray-500">
                                                Halaman
                                            </div>
                                            <div className="font-semibold">
                                                {formatNumber(book.pages)}
                                            </div>
                                        </div>
                                    )}
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <div className="text-sm text-gray-500">
                                            Download
                                        </div>
                                        <div className="font-semibold">
                                            {formatNumber(book.download_count)}x
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Info */}
                                {book.publisher && (
                                    <div className="mb-4">
                                        <span className="text-sm text-gray-500">
                                            Penerbit:{" "}
                                        </span>
                                        <span className="font-semibold">
                                            {book.publisher}
                                        </span>
                                    </div>
                                )}

                                {book.isbn && (
                                    <div className="mb-4">
                                        <span className="text-sm text-gray-500">
                                            ISBN:{" "}
                                        </span>
                                        <span className="font-mono text-sm">
                                            {book.isbn}
                                        </span>
                                    </div>
                                )}

                                {book.file_size && (
                                    <div className="mb-6">
                                        <span className="text-sm text-gray-500">
                                            Ukuran File:{" "}
                                        </span>
                                        <span className="font-semibold">
                                            {book.file_size}
                                        </span>
                                    </div>
                                )}

                                {/* Description */}
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold mb-3">
                                        Deskripsi
                                    </h2>
                                    <div className="prose prose-gray max-w-none">
                                        {book.description ? (
                                            book.description
                                                .split("\n")
                                                .map(
                                                    (
                                                        paragraph: string,
                                                        index: number
                                                    ) => (
                                                        <p
                                                            key={index}
                                                            className="mb-3 text-gray-700 leading-relaxed"
                                                        >
                                                            {paragraph}
                                                        </p>
                                                    )
                                                )
                                        ) : (
                                            <p className="text-gray-500">
                                                Tidak ada deskripsi.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Tags */}
                                {Array.isArray(book.tags) &&
                                    book.tags.length > 0 && (
                                        <div>
                                            <h2 className="text-lg font-semibold mb-3">
                                                Tags
                                            </h2>
                                            <div className="flex flex-wrap gap-2">
                                                {book.tags.map(
                                                    (
                                                        tag: string,
                                                        index: number
                                                    ) => (
                                                        <span
                                                            key={index}
                                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                                                        >
                                                            #{tag}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <GeminiChatBot/> 
            <Footer />
        </>
    );
};

export default BookShow;
