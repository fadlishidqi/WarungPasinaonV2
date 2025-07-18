import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import { Book } from "@/types";
import FlipBook from "@/Components/FlipBook";
import GeminiChatBot from '@/Components/GeminiChatBot';

interface BookReadProps {
    book: Book;
}

const BookRead: React.FC<BookReadProps> = ({ book }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [viewMode, setViewMode] = useState<"flip" | "normal">("flip");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Check initial screen size
        handleResize();

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        window.addEventListener("resize", handleResize);

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (error) {
            console.error("Error toggling fullscreen:", error);
        }
    };

    return (
        <>
            <Head title={`Baca: ${book.title} - Warung Pasinaon`} />

            {/* Responsive Mini Navbar */}
            <div className="fixed top-0 left-0 right-0 bg-white border-b z-50 shadow-sm">
                <div className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3">
                    {/* Left Section */}
                    <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
                        <Link
                            href={`/buku-digital/${book.slug}`}
                            className="flex items-center text-gray-600 hover:text-green-600 transition-colors flex-shrink-0"
                        >
                            <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            <span className="hidden xs:inline">Kembali</span>
                        </Link>

                        {/* Book Info - Hidden on very small screens */}
                        <div className="hidden sm:block min-w-0 flex-1">
                            <h1 className="font-semibold text-gray-900 truncate text-sm md:text-base max-w-[200px] md:max-w-md">
                                {book.title}
                            </h1>
                            <p className="text-xs md:text-sm text-gray-600 truncate max-w-[200px] md:max-w-md">
                                oleh {book.author}
                            </p>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-1 sm:space-x-3 flex-shrink-0">
                        {/* View Mode Toggle - Simplified on mobile */}
                        <div className="flex bg-gray-100 rounded-lg p-0.5 sm:p-1">
                            <button
                                onClick={() => setViewMode("flip")}
                                className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                                    viewMode === "flip"
                                        ? "bg-white text-gray-900 shadow-sm"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                {isMobile ? "📖" : "Flip Book"}
                            </button>
                            <button
                                onClick={() => setViewMode("normal")}
                                className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                                    viewMode === "normal"
                                        ? "bg-white text-gray-900 shadow-sm"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                {isMobile ? "📄" : "Normal"}
                            </button>
                        </div>

                        {/* Fullscreen Button */}
                        <button
                            onClick={toggleFullscreen}
                            className="bg-gray-100 text-gray-700 px-2 sm:px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-xs sm:text-sm font-medium flex items-center"
                            title={
                                isFullscreen
                                    ? "Keluar Fullscreen"
                                    : "Fullscreen"
                            }
                        >
                            {isFullscreen ? (
                                <svg
                                    className="w-4 h-4 sm:w-5 sm:h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15H4.5M9 15v4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0-4.5l5.5 5.5"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-4 h-4 sm:w-5 sm:h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 00-2-2H5a2 2 0 00-2 2z"
                                    />
                                </svg>
                            )}
                            <span className="hidden lg:ml-2 lg:inline">
                                {isFullscreen ? "Exit" : "Fullscreen"}
                            </span>
                        </button>

                        {/* Download Button */}
                        <a
                            href={`/buku-digital/${book.slug}/download`}
                            className="bg-blue-600 text-white px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium flex items-center"
                        >
                            <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <span className="hidden sm:inline">Download</span>
                        </a>
                    </div>
                </div>

                {/* Mobile Book Info - Shows below main navbar on small screens */}
                <div className="sm:hidden px-3 pb-2 border-t border-gray-100">
                    <h2 className="font-medium text-gray-900 text-sm truncate">
                        {book.title}
                    </h2>
                    <p className="text-xs text-gray-600 truncate">
                        oleh {book.author}
                    </p>
                </div>
            </div>

            {/* Responsive Content */}
            <div className={`${isMobile ? "pt-20" : "pt-16"} h-screen`}>
                {viewMode === "flip" ? (
                    <FlipBook book={book} />
                ) : (
                    <div className="relative h-full">
                        <iframe
                            src={`${book.pdf_url}#toolbar=${
                                isMobile ? "0" : "1"
                            }&navpanes=${
                                isMobile ? "0" : "1"
                            }&scrollbar=1&page=1&view=FitH&zoom=${
                                isMobile ? "100" : "FitH"
                            }`}
                            className="w-full h-full border-0 bg-gray-100"
                            title={`Baca: ${book.title}`}
                        />
                    </div>
                )}
            </div>
            <GeminiChatBot/>
        </>
    );
};

export default BookRead;
