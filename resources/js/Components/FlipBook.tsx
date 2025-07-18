import React, { useRef, useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import type { FlipBookRef } from 'react-pageflip';

interface FlipBookProps {
    book: {
        id: number;
        title: string;
        author: string;
        pdf_url: string;
        cover_url?: string;
    };
}

// Declare PDF.js types
declare global {
    interface Window {
        pdfjsLib: any;
    }
}

const FlipBook: React.FC<FlipBookProps> = ({ book }) => {
    const flipBookRef = useRef<FlipBookRef>(null);
    const [pages, setPages] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [pdfLoaded, setPdfLoaded] = useState(false);

    useEffect(() => {
        loadPDFLibrary();
    }, []);

    useEffect(() => {
        if (pdfLoaded) {
            loadPDFPages();
        }
    }, [book.pdf_url, pdfLoaded]);

    const loadPDFLibrary = async () => {
        try {
            // Load PDF.js dari CDN untuk konsistensi
            if (!window.pdfjsLib) {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
                script.onload = () => {
                    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
                    setPdfLoaded(true);
                };
                script.onerror = () => {
                    setError('Gagal memuat PDF.js library');
                    setIsLoading(false);
                };
                document.head.appendChild(script);
            } else {
                setPdfLoaded(true);
            }
        } catch (err) {
            console.error('Error loading PDF.js:', err);
            setError('Gagal memuat PDF.js library');
            setIsLoading(false);
        }
    };

    const loadPDFPages = async () => {
        try {
            setIsLoading(true);
            setError(null);
            setLoadingProgress(0);

            // Load PDF document
            const pdf = await window.pdfjsLib.getDocument(book.pdf_url).promise;
            const numPages = pdf.numPages;
            setTotalPages(numPages);

            const pageImages: string[] = [];

            // Render pages one by one
            for (let i = 1; i <= numPages; i++) {
                try {
                    const pageImage = await renderPage(pdf, i);
                    pageImages.push(pageImage);
                    setLoadingProgress(Math.round((i / numPages) * 100));
                    setPages([...pageImages]);
                } catch (pageError) {
                    pageImages.push(createErrorPage(i));
                }
            }

            setPages(pageImages);
            setIsLoading(false);
        } catch (err: any) {
            let errorMessage = 'Gagal memuat PDF. ';
            if (err.message?.includes('Invalid PDF')) {
                errorMessage += 'File PDF tidak valid atau rusak.';
            } else if (err.message?.includes('Missing PDF')) {
                errorMessage += 'File PDF tidak ditemukan.';
            } else if (err.name === 'NetworkError') {
                errorMessage += 'Masalah koneksi jaringan.';
            } else {
                errorMessage += 'Pastikan file dapat diakses dan tidak rusak.';
            }
            setError(errorMessage);
            setIsLoading(false);
        }
    };

    const createErrorPage = (pageNum: number): string => {
        const canvas = document.createElement('canvas');
        canvas.width = 360;
        canvas.height = 520;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = '#f8f9fa';
            ctx.fillRect(0, 0, 360, 520);
            ctx.strokeStyle = '#dee2e6';
            ctx.lineWidth = 2;
            ctx.strokeRect(10, 10, 340, 500);
            ctx.fillStyle = '#6c757d';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('⚠️', 180, 250);
            ctx.font = '14px Arial';
            ctx.fillText(`Halaman ${pageNum}`, 180, 275);
            ctx.fillText('Gagal dimuat', 180, 295);
        }
        return canvas.toDataURL();
    };

    const renderPage = async (pdf: any, pageNum: number): Promise<string> => {
        const page = await pdf.getPage(pageNum);
        const scale = 1.6; // Diper kecil dari 2 ke 1.6
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Could not get canvas context');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport }).promise;
        return canvas.toDataURL('image/jpeg', 0.9);
    };

    const nextPage = () => {
        if (flipBookRef.current && pages.length > 0) {
            flipBookRef.current.pageFlip().flipNext();
        }
    };

    const prevPage = () => {
        if (flipBookRef.current && pages.length > 0) {
            flipBookRef.current.pageFlip().flipPrev();
        }
    };

    const goToPage = (pageNum: number) => {
        if (flipBookRef.current && pageNum >= 0 && pageNum < totalPages && pages.length > pageNum) {
            flipBookRef.current.pageFlip().flip(pageNum);
        }
    };

    const onFlip = (e: any) => {
        if (e && typeof e.data === 'number') {
            setCurrentPage(e.data);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                prevPage();
            } else if (event.key === 'ArrowRight') {
                nextPage();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900">
                <div className="text-center text-white max-w-md">
                    <div className="relative w-20 h-20 mx-auto mb-6">
                        <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-700 border-t-blue-500"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-bold">{loadingProgress}%</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Memuat Flip Book</h3>
                    <p className="text-gray-400 mb-4">
                        {loadingProgress > 0 
                            ? `Memproses halaman ${Math.ceil((loadingProgress / 100) * totalPages)} dari ${totalPages}`
                            : 'Menginisialisasi PDF reader...'
                        }
                    </p>
                    <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                            className="h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${loadingProgress}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-center p-8 max-w-lg">
                    <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Gagal Memuat Flip Book</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{error}</p>
                    <div className="space-y-3">
                        <button 
                            onClick={() => {
                                setPdfLoaded(false);
                                loadPDFLibrary();
                            }}
                            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            🔄 Coba Lagi
                        </button>
                        <a 
                            href={book.pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors text-center font-medium"
                        >
                            📄 Buka PDF Normal
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    if (pages.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900">
                <div className="text-white text-center">
                    <p className="text-lg">Tidak ada halaman yang dapat ditampilkan</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-gray-900">
            {/* Enhanced Controls */}
            <div className="bg-gray-800 text-white p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 0}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="hidden sm:inline">Prev</span>
                        </button>
                        
                        <div className="text-center px-4">
                            <div className="font-bold text-lg">
                                {currentPage + 1} / {totalPages}
                            </div>
                            <div className="text-xs text-gray-400">
                                {book.title}
                            </div>
                        </div>
                        
                        <button
                            onClick={nextPage}
                            disabled={currentPage >= totalPages - 1}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
                        >
                            <span className="hidden sm:inline">Next</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-300 hidden sm:block">Go to:</span>
                        <input
                            type="number"
                            min="1"
                            max={totalPages}
                            value={currentPage + 1}
                            onChange={(e) => {
                                const pageNum = parseInt(e.target.value) - 1;
                                if (pageNum >= 0 && pageNum < totalPages) {
                                    goToPage(pageNum);
                                }
                            }}
                            className="w-20 px-3 py-2 bg-gray-700 text-white rounded-lg text-sm text-center border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* FlipBook Container */}
            <div className="flex-1 flex items-center justify-center p-4 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
                <HTMLFlipBook
                    ref={flipBookRef}
                    width={360}      // Lebih kecil dari sebelumnya (450)
                    height={520}     // Lebih kecil dari sebelumnya (640)
                    size="stretch"
                    minWidth={240}
                    maxWidth={600}
                    minHeight={340}
                    maxHeight={900}
                    drawShadow={true}
                    flippingTime={800}
                    usePortrait={true}
                    startZIndex={0}
                    autoSize={true}
                    maxShadowOpacity={0.4}
                    showCover={true}
                    mobileScrollSupport={true}
                    onFlip={onFlip}
                    className="flip-book"
                >
                    {pages.map((page, index) => (
                        <div key={`page-${index}`} className="page">
                            <img
                                src={page}
                                alt={`Halaman ${index + 1}`}
                                className="w-full h-full object-contain select-none"
                                loading="lazy"
                                draggable={false}
                            />
                        </div>
                    ))}
                </HTMLFlipBook>
            </div>
        </div>
    );
};

export default FlipBook;