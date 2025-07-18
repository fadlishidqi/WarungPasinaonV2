import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { BookFilters } from '@/types';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import GeminiChatBot from '@/Components/GeminiChatBot';

// Interface yang aman untuk data pagination
interface SafePaginatedBooks {
    data: any[];
    links?: any[];
    meta?: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

interface BooksIndexProps {
    books: SafePaginatedBooks;
    categories: { [key: string]: string };
    filters: BookFilters;
}

const BooksIndex: React.FC<BooksIndexProps> = ({ books, categories, filters }) => {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');

    // Safe access untuk data
    const booksData = books?.data || [];
    const booksMeta = books?.meta;
    const booksLinks = books?.links || [];

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('id-ID').format(num);
    };

    const getCategoryBadgeColor = (category: string) => {
        const colors: { [key: string]: string } = {
            'fiksi': 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-200',
            'non-fiksi': 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-200',
            'pendidikan': 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-200',
            'sejarah': 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-200',
            'teknologi': 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-200',
            'agama': 'bg-gradient-to-r from-teal-100 to-teal-200 text-teal-800 border border-teal-200'
        };
        return colors[category] || 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-200';
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/buku-digital', {
            search: searchTerm,
            category: selectedCategory
        }, {
            preserveState: true,
            replace: true
        });
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        router.get('/buku-digital', {
            search: searchTerm,
            category: category
        }, {
            preserveState: true,
            replace: true
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        router.get('/buku-digital', {}, {
            preserveState: true,
            replace: true
        });
    };

    // Animation variants
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 }
    };

    const staggerChildren: Variants = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const bookCardVariants: Variants = {
        initial: { 
            opacity: 0, 
            y: 40, 
            scale: 0.9 
        },
        animate: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
                duration: 0.6, 
                ease: "easeOut"
            }
        }
    };

    const floatingElements = {
        initial: { y: 0 },
        animate: { 
            y: [-10, 10, -10],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut" as any
            }
        }
    };

    const searchBarVariants: Variants = {
        initial: { 
            opacity: 0, 
            y: 50, 
            scale: 0.9 
        },
        animate: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
                duration: 0.8, 
                ease: "backOut"
            }
        }
    };

    return (
        <>
            <Head title="Buku Digital - Warung Pasinaon" />
            <Navbar />
            
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section - Matching homepage style */}
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-blue-50 to-green-50"></div>
                    
                    {/* Animated Background Elements */}
                    <motion.div 
                        className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-pink-600 to-purple-300 rounded-full opacity-20 blur-xl"
                        animate={{
                            x: [0, 30, 0],
                            y: [0, -20, 0]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div 
                        className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-blue-600 to-green-300 rounded-full opacity-20 blur-xl"
                        animate={{
                            x: [0, -20, 0],
                            y: [0, 30, 0]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                    />
                    <motion.div 
                        className="absolute bottom-40 left-40 w-40 h-40 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-20 blur-xl"
                        animate={{
                            x: [0, 40, 0],
                            y: [0, -30, 0]
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2
                        }}
                    />
                    <motion.div 
                        className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-green-600 to-blue-300 rounded-full opacity-20 blur-xl"
                        animate={{
                            x: [0, -25, 0],
                            y: [0, 25, 0]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                    />

                    <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
                        <motion.div 
                            className="text-center space-y-10"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            {/* Decorative elements */}
                            <motion.div 
                                className="absolute top-10 left-28 w-16 h-16 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-full flex items-center justify-center text-2xl shadow-lg"
                                variants={floatingElements}
                                initial="initial"
                                animate="animate"
                            >
                                📚
                            </motion.div>
                            <motion.div 
                                className="absolute top-12 right-12 w-12 h-12 bg-gradient-to-r from-pink-200 to-pink-300 rounded-full flex items-center justify-center text-xl shadow-lg"
                                variants={floatingElements}
                                initial="initial"
                                animate="animate"
                                transition={{ delay: 0.5 }}
                            >
                                ✨
                            </motion.div>
                            <motion.div 
                                className="absolute bottom-20 left-2 w-10 h-10 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full flex items-center justify-center text-xl shadow-lg"
                                variants={floatingElements}
                                initial="initial"
                                animate="animate"
                                transition={{ delay: 1 }}
                            >
                                🎓
                            </motion.div>
                            <motion.div 
                                className="absolute bottom-20 right-20 w-10 h-10 bg-gradient-to-r from-green-200 to-green-300 rounded-full flex items-center justify-center text-lg shadow-lg"
                                variants={floatingElements}
                                initial="initial"
                                animate="animate"
                                transition={{ delay: 1.5 }}
                            >
                                💡
                            </motion.div>

                            <motion.div 
                                className="space-y-4"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <motion.h1 
                                    className="text-5xl lg:text-6xl font-bold text-gray-900"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <span className="relative">
                                        <span className="relative z-10 text-gray-900">Perpustakaan</span>
                                        <motion.span 
                                            className="absolute -bottom-0.5 left-0 right-0 h-8 lg:h-12 bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 rounded-lg transform -rotate-1 -z-0"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ duration: 0.8, delay: 0.6 }}
                                        />
                                    </span>
                                </motion.h1>
                                <motion.h1 
                                    className="text-5xl lg:text-6xl font-bold text-gray-900"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    Digital
                                </motion.h1>
                                
                                <motion.p 
                                    className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed pt-6 pb-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                >
                                    Kumpulan buku digital berkualitas untuk mendukung pembelajaran Anda
                                </motion.p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-12">
                    {/* Search and Filter Section - Floating di atas garis batas */}
                    <motion.div 
                        className="relative -mt-12 z-20 max-w-7xl mx-auto px-4 lg:px-8 mb-12"
                        variants={searchBarVariants}
                        initial="initial"
                        animate="animate"
                    >
                        <motion.div 
                            className="bg-white rounded-3xl md:rounded-full shadow-xl p-3 border border-gray-100"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <form onSubmit={handleSearch}>
                                {/* Mobile Layout - Vertical Stack */}
                                <div className="flex flex-col md:hidden gap-3">
                                    <div className="w-full">
                                        <motion.input
                                            type="text"
                                            placeholder="Cari buku..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full px-5 py-3 bg-gray-50 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 placeholder-gray-400 text-base"
                                            whileFocus={{ scale: 1.02 }}
                                        />
                                    </div>
                                    
                                    <div className="flex gap-3">
                                        <div className="flex-1">
                                            <motion.select
                                                value={selectedCategory}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 text-sm"
                                                whileFocus={{ scale: 1.02 }}
                                            >
                                                <option value="">Semua Kategori</option>
                                                {Object.entries(categories).map(([key, value]) => (
                                                    <option key={key} value={key}>{value}</option>
                                                ))}
                                            </motion.select>
                                        </div>
                                        <motion.button
                                            type="submit"
                                            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-semibold text-sm shadow-lg"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            🔍
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Desktop Layout - Horizontal */}
                                <div className="hidden md:flex gap-3 items-center">
                                    <div className="flex-1">
                                        <motion.input
                                            type="text"
                                            placeholder="Cari judul buku, penulis, atau deskripsi..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full px-6 py-4 border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 placeholder-gray-400 text-lg rounded-full"
                                            whileFocus={{ scale: 1.01 }}
                                        />
                                    </div>
                                    <div className="w-56">
                                        <motion.select
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            className="w-full px-6 py-4 border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 text-lg rounded-full"
                                            whileFocus={{ scale: 1.01 }}
                                        >
                                            <option value="">Semua Kategori</option>
                                            {Object.entries(categories).map(([key, value]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}
                                        </motion.select>
                                    </div>
                                    <motion.button
                                        type="submit"
                                        className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        🔍 Cari
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>

                    {/* Results Info */}
                    {booksMeta && (
                        <motion.div 
                            className="mb-8"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <p className="text-gray-600 text-lg">
                                Menampilkan <span className="font-semibold text-gray-900">{formatNumber(booksMeta.from || 0)}</span> - <span className="font-semibold text-gray-900">{formatNumber(booksMeta.to || 0)}</span> dari <span className="font-semibold text-gray-900">{formatNumber(booksMeta.total)}</span> buku
                            </p>
                        </motion.div>
                    )}

                    {/* Books Grid */}
                    <AnimatePresence mode="wait">
                        {booksData.length > 0 ? (
                            <motion.div 
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
                                variants={staggerChildren}
                                initial="initial"
                                animate="animate"
                                key="books-grid"
                            >
                                {booksData.map((book: any, index: number) => (
                                    <motion.div 
                                        key={book.id} 
                                        variants={bookCardVariants}
                                        className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
                                        whileHover={{ 
                                            y: -8, 
                                            scale: 1.02,
                                            transition: { type: "spring", stiffness: 300 }
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {/* Book Cover dengan Overlay */}
                                        <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                                            {book.cover_url ? (
                                                <>
                                                    <motion.img
                                                        src={book.cover_url}
                                                        alt={book.title}
                                                        className="w-full h-full object-cover"
                                                        whileHover={{ scale: 1.05 }}
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                    {/* Gradient Overlay */}
                                                    <motion.div 
                                                        className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                                                        initial={{ opacity: 0 }}
                                                        whileHover={{ opacity: 1 }}
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                </>
                                            ) : (
                                                <motion.div 
                                                    className="w-full h-full flex items-center justify-center text-gray-400 bg-gradient-to-br from-gray-50 to-gray-100"
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    <div className="text-center">
                                                        <motion.svg 
                                                            className="w-16 h-16 mx-auto mb-2 text-gray-300" 
                                                            fill="none" 
                                                            stroke="currentColor" 
                                                            viewBox="0 0 24 24"
                                                            animate={{ rotate: [0, 5, -5, 0] }}
                                                            transition={{ duration: 2, repeat: Infinity }}
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                        </motion.svg>
                                                        <p className="text-xs text-gray-400">No Cover</p>
                                                    </div>
                                                </motion.div>
                                            )}
                                            
                                            {/* Category Badge */}
                                            <motion.div 
                                                className="absolute top-3 left-3"
                                                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                            >
                                                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md bg-white/80 border border-white/20 shadow-lg ${getCategoryBadgeColor(book.category)}`}>
                                                    {categories[book.category]}
                                                </span>
                                            </motion.div>

                                            {/* Floating Quick Action */}
                                            <motion.div 
                                                className="absolute top-3 right-3"
                                                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                                                whileHover={{ opacity: 1, scale: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Link
                                                    href={`/buku-digital/${book.slug}`}
                                                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-105 transition-all duration-200"
                                                >
                                                    <motion.svg 
                                                        className="w-5 h-5 text-gray-700" 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        viewBox="0 0 24 24"
                                                        whileHover={{ scale: 1.2 }}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </motion.svg>
                                                </Link>
                                            </motion.div>
                                        </div>

                                        {/* Book Info */}
                                        <motion.div 
                                            className="p-5 lg:p-6 space-y-4"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                                        >
                                            <div className="space-y-3">
                                                <motion.h3 
                                                    className="font-bold text-lg lg:text-xl text-gray-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-200"
                                                    whileHover={{ scale: 1.02 }}
                                                >
                                                    {book.title}
                                                </motion.h3>
                                                
                                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                    <motion.svg 
                                                        className="w-4 h-4 text-gray-400" 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        viewBox="0 0 24 24"
                                                        whileHover={{ rotate: 360 }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </motion.svg>
                                                    <span className="font-medium">{book.author}</span>
                                                </div>

                                                {book.published_year && (
                                                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                                                        <motion.svg 
                                                            className="w-4 h-4 text-gray-400" 
                                                            fill="none" 
                                                            stroke="currentColor" 
                                                            viewBox="0 0 24 24"
                                                            whileHover={{ scale: 1.2 }}
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </motion.svg>
                                                        <span>{book.published_year}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <motion.div 
                                                className="flex gap-3 pt-2"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
                                            >
                                                <Link
                                                    href={`/buku-digital/${book.slug}`}
                                                    className="flex-1 group/btn bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold px-4 py-3 rounded-2xl text-center hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                                                >
                                                    <motion.svg 
                                                        className="w-4 h-4" 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        viewBox="0 0 24 24"
                                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </motion.svg>
                                                    <span>Detail</span>
                                                </Link>
                                                <Link
                                                    href={`/buku-digital/${book.slug}/baca`}
                                                    className="flex-1 group/btn bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold px-4 py-3 rounded-2xl text-center hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                                                >
                                                    <motion.svg 
                                                        className="w-4 h-4" 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        viewBox="0 0 24 24"
                                                        whileHover={{ scale: 1.1, rotate: -5 }}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                   </motion.svg>
                                                   <span>Baca</span>
                                               </Link>
                                           </motion.div>
                                       </motion.div>

                                       {/* Bottom Accent Line */}
                                       <motion.div 
                                           className="h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                                           initial={{ scaleX: 0 }}
                                           whileHover={{ scaleX: 1 }}
                                           transition={{ duration: 0.5 }}
                                           style={{ originX: 0 }}
                                       />
                                   </motion.div>
                               ))}
                           </motion.div>
                       ) : (
                           <motion.div 
                               className="text-center py-16"
                               key="empty-state"
                               initial={{ opacity: 0, scale: 0.8 }}
                               animate={{ opacity: 1, scale: 1 }}
                               exit={{ opacity: 0, scale: 0.8 }}
                               transition={{ duration: 0.6 }}
                           >
                               <motion.div 
                                   className="bg-white rounded-3xl shadow-lg p-12 max-w-md mx-auto"
                                   whileHover={{ scale: 1.02 }}
                                   transition={{ type: "spring", stiffness: 300 }}
                               >
                                   <motion.div 
                                       className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6"
                                       initial={{ scale: 0, rotate: -180 }}
                                       animate={{ scale: 1, rotate: 0 }}
                                       transition={{ 
                                           type: "spring", 
                                           stiffness: 260, 
                                           damping: 20,
                                           delay: 0.2 
                                       }}
                                   >
                                       <motion.svg 
                                           className="w-12 h-12 text-gray-400" 
                                           fill="none" 
                                           stroke="currentColor" 
                                           viewBox="0 0 24 24"
                                           animate={{ 
                                               rotate: [0, 10, -10, 0],
                                               scale: [1, 1.1, 1]
                                           }}
                                           transition={{ 
                                               duration: 2, 
                                               repeat: Infinity,
                                               delay: 0.5
                                           }}
                                       >
                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                       </motion.svg>
                                   </motion.div>
                                   
                                   <motion.h3 
                                       className="text-2xl font-bold text-gray-900 mb-4"
                                       initial={{ opacity: 0, y: 20 }}
                                       animate={{ opacity: 1, y: 0 }}
                                       transition={{ delay: 0.3 }}
                                   >
                                       Tidak ada buku ditemukan
                                   </motion.h3>
                                   
                                   <motion.p 
                                       className="text-gray-600 mb-6"
                                       initial={{ opacity: 0, y: 20 }}
                                       animate={{ opacity: 1, y: 0 }}
                                       transition={{ delay: 0.4 }}
                                   >
                                       {(searchTerm || selectedCategory) 
                                           ? 'Coba ubah kata kunci atau filter pencarian Anda' 
                                           : 'Belum ada buku yang tersedia'
                                       }
                                   </motion.p>
                                   
                                   {(searchTerm || selectedCategory) && (
                                       <motion.button
                                           onClick={clearFilters}
                                           className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold shadow-lg"
                                           initial={{ opacity: 0, scale: 0.8 }}
                                           animate={{ opacity: 1, scale: 1 }}
                                           transition={{ delay: 0.5 }}
                                           whileHover={{ scale: 1.05 }}
                                           whileTap={{ scale: 0.95 }}
                                       >
                                           🔄 Lihat Semua Buku
                                       </motion.button>
                                   )}
                               </motion.div>
                           </motion.div>
                       )}
                   </AnimatePresence>

                   {/* Pagination - Enhanced */}
                   {booksMeta && booksMeta.last_page > 1 && (
                       <motion.div 
                           className="flex justify-center mt-12"
                           initial={{ opacity: 0, y: 30 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.6, delay: 0.5 }}
                       >
                           <motion.div 
                               className="bg-white rounded-2xl shadow-lg p-4"
                               whileHover={{ scale: 1.02 }}
                               transition={{ type: "spring", stiffness: 300 }}
                           >
                               <div className="flex space-x-2">
                                   {booksLinks.map((link: any, index: number) => (
                                       <motion.div
                                           key={index}
                                           initial={{ opacity: 0, scale: 0.8 }}
                                           animate={{ opacity: 1, scale: 1 }}
                                           transition={{ delay: index * 0.05 }}
                                           whileHover={{ scale: 1.05 }}
                                           whileTap={{ scale: 0.95 }}
                                       >
                                           <Link
                                               href={link.url || '#'}
                                               className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                                   link.active
                                                       ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md'
                                                       : link.url
                                                       ? 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                                                       : 'text-gray-400 cursor-not-allowed'
                                               }`}
                                               dangerouslySetInnerHTML={{ __html: link.label }}
                                           />
                                       </motion.div>
                                   ))}
                               </div>
                           </motion.div>
                       </motion.div>
                   )}
               </div>
           </div>
           
           <GeminiChatBot/>
           <Footer />
       </>
   );
};

export default BooksIndex;