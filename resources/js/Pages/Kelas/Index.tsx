import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import CompanyLayout from '@/Components/CompanyLayout';
import GeminiChatBot from '@/Components/GeminiChatBot';

interface Kelas {
    id: number;
    nama: string;
    deskripsi: string;
    gambar: string;
    tanggal: string;
    hari: string;
    kategori: string;
    grup_wa?: string;
    kapasitas: number;
    terdaftar: number;
    is_available: boolean;
}

interface Props {
    kelas: Kelas[];
}

const Index: React.FC<Props> = ({ kelas }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
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

    const cardVariants: Variants = {
        initial: { 
            opacity: 0, 
            y: 30, 
            scale: 0.95 
        },
        animate: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
                duration: 0.5, 
                ease: "easeOut"
            }
        }
    };

    const badgeVariants: Variants = {
        initial: { 
            opacity: 0, 
            scale: 0.8, 
            y: -20 
        },
        animate: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { 
                duration: 0.4, 
                ease: "backOut" 
            }
        }
    };

    const emptyStateVariants: Variants = {
        initial: { 
            opacity: 0, 
            scale: 0.8 
        },
        animate: { 
            opacity: 1, 
            scale: 1,
            transition: { 
                duration: 0.6, 
                ease: "easeOut"
            }
        }
    };

    return (
        <CompanyLayout>
            <Head title="Kelas - Warung Pasinaon" />

            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="min-h-screen bg-white">
                {/* Shadow below navbar */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent shadow-sm"></div>
                
                {/* Header Section */}
                <section className="pt-14">
                    <div className="max-w-4xl mx-auto px-6">
                        <motion.div 
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                    Kelas Warung Pasinaon
                                </h1>
                            </motion.div>
                            
                            <motion.p 
                                className="text-gray-600 text-base mb-8 max-w-2xl mx-auto leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                Dokumentasi berbagai kelas pembelajaran dan pengembangan yang telah kami 
                                selenggarakan untuk kemajuan pendidikan
                            </motion.p>
                        </motion.div>
                    </div>
                </section>

                {/* Classes Grid */}
                <section className="pb-20">
                    <div className="max-w-4xl mx-auto px-6">
                        <AnimatePresence mode="wait">
                            {kelas.length > 0 ? (
                                <motion.div 
                                    className="grid md:grid-cols-2 gap-6"
                                    variants={staggerChildren}
                                    initial="initial"
                                    animate="animate"
                                >
                                    {kelas.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            variants={cardVariants}
                                            className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                                            whileHover={{ 
                                                scale: 1.02, 
                                                y: -5,
                                                transition: { type: "spring", stiffness: 300 }
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="relative overflow-hidden">
                                                <motion.img
                                                    src={item.gambar ? item.gambar : "/api/placeholder/400/240"}
                                                    alt={item.nama}
                                                    className="w-full h-48 object-cover"
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                                
                                                {/* Category Badge */}
                                                <motion.div 
                                                    className="absolute top-4 left-4"
                                                    variants={badgeVariants}
                                                    initial="initial"
                                                    animate="animate"
                                                    transition={{ delay: 0.3 + (index * 0.1) }}
                                                >
                                                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold border border-white/20">
                                                        {item.kategori}
                                                    </span>
                                                </motion.div>
                                                
                                                {/* GRATIS Badge */}
                                                <motion.div 
                                                    className="absolute top-4 right-4"
                                                    variants={badgeVariants}
                                                    initial="initial"
                                                    animate="animate"
                                                    transition={{ delay: 0.4 + (index * 0.1) }}
                                                >
                                                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                        GRATIS
                                                    </span>
                                                </motion.div>
                                                
                                                {!item.is_available && (
                                                    <motion.div 
                                                        className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.5 + (index * 0.1) }}
                                                    >
                                                        <motion.span 
                                                            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold"
                                                            initial={{ scale: 0, rotate: -10 }}
                                                            animate={{ scale: 1, rotate: 0 }}
                                                            transition={{ 
                                                                type: "spring", 
                                                                stiffness: 200, 
                                                                damping: 15,
                                                                delay: 0.6 + (index * 0.1)
                                                            }}
                                                        >
                                                            Tidak Tersedia
                                                        </motion.span>
                                                    </motion.div>
                                                )}
                                            </div>

                                            <motion.div 
                                                className="p-6"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                                            >
                                                <motion.h3 
                                                    className="text-lg font-semibold text-gray-900 mb-3 leading-tight uppercase"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                                                >
                                                    {item.nama}
                                                </motion.h3>

                                                <motion.p 
                                                    className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3 uppercase"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                                                >
                                                    {item.deskripsi}
                                                </motion.p>

                                                {/* Class Info */}
                                                <motion.div 
                                                    className="space-y-2 mb-4"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                                                >
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <motion.svg 
                                                            className="w-4 h-4 mr-2" 
                                                            fill="none" 
                                                            stroke="currentColor" 
                                                            viewBox="0 0 24 24"
                                                            initial={{ rotate: -90, opacity: 0 }}
                                                            animate={{ rotate: 0, opacity: 1 }}
                                                            transition={{ delay: 0.6 + (index * 0.1) }}
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </motion.svg>
                                                        {item.hari}, {item.tanggal}
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <motion.svg 
                                                            className="w-4 h-4 mr-2" 
                                                            fill="none" 
                                                            stroke="currentColor" 
                                                            viewBox="0 0 24 24"
                                                            initial={{ scale: 0, opacity: 0 }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            transition={{ delay: 0.7 + (index * 0.1) }}
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </motion.svg>
                                                        <motion.span
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ delay: 0.8 + (index * 0.1) }}
                                                        >
                                                            {item.terdaftar}/{item.kapasitas} peserta
                                                        </motion.span>
                                                    </div>
                                                </motion.div>

                                                <motion.div
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                                                >
                                                    <Link
                                                        href={`/kelas/${item.id}`}
                                                        className="inline-flex items-center text-red-500 hover:text-red-600 font-medium text-sm transition-colors duration-200 group"
                                                    >
                                                        <motion.span
                                                            whileHover={{ x: 5 }}
                                                            transition={{ type: "spring", stiffness: 300 }}
                                                        >
                                                            Lihat Detail
                                                        </motion.span>
                                                        <motion.svg 
                                                            className="w-4 h-4 ml-1" 
                                                            fill="none" 
                                                            stroke="currentColor" 
                                                            viewBox="0 0 24 24"
                                                            whileHover={{ x: 3 }}
                                                            transition={{ type: "spring", stiffness: 300 }}
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                            />
                                                        </motion.svg>
                                                    </Link>
                                                </motion.div>
                                            </motion.div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div 
                                    className="text-center py-16"
                                    variants={emptyStateVariants}
                                    initial="initial"
                                    animate="animate"
                                >
                                    <motion.div 
                                        className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center"
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
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1}
                                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                            />
                                        </motion.svg>
                                    </motion.div>
                                    
                                    <motion.h3 
                                        className="text-xl font-semibold text-gray-900 mb-3"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        Belum Ada Kelas
                                    </motion.h3>
                                    
                                    <motion.p 
                                        className="text-gray-600"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        Kelas pembelajaran belum tersedia saat ini.
                                    </motion.p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>
            </div>
            <GeminiChatBot />
        </CompanyLayout>
    );
};

export default Index;