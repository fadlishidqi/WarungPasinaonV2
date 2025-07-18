import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import LoadingImage from "@/Components/LoadingImage";
import { motion, AnimatePresence } from "framer-motion";
import GeminiChatBot from "@/Components/GeminiChatBot";

export default function Home({ auth }: PageProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Data untuk carousel dokumentasi
    const documentationImages = [
        {
            id: 1,
            image: "https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetCarausel2.jpg?alt=media",
        },
        {
            id: 2,
            image: "https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetCarausel4.jpg?alt=media",
        },
        {
            id: 3,
            image: "https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetCarausel3.jpg?alt=media",
        },
        {
            id: 4,
            image: "https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetCarausel6.jpg?alt=media",
        },
        {
            id: 5,
            image: "https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetCarausel5.jpg?alt=media",
        },
        {
            id: 6,
            image: "https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetCarausel7.jpg?alt=media",
        },
        {
            id: 7,
            image: "https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetCarausel9.jpeg?alt=media",
        },
        {
            id: 8,
            image: "https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetCarausel10.jpeg?alt=media",
        },
        {
            id: 9,
            image: "https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetCarausel11.jpeg?alt=media",
        },
    ];

    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!isHovered) {
            const timer = setInterval(() => {
                setCurrentSlide((prevSlide) =>
                    prevSlide === documentationImages.length - 1
                        ? 0
                        : prevSlide + 1
                );
            }, 2000);

            return () => clearInterval(timer);
        }
    }, [documentationImages.length, isHovered]);

    const goToSlide = (slideIndex: React.SetStateAction<number>) => {
        setCurrentSlide(slideIndex);
    };

    const goToPrevSlide = () => {
        setCurrentSlide(
            currentSlide === 0
                ? documentationImages.length - 1
                : currentSlide - 1
        );
    };

    const goToNextSlide = () => {
        setCurrentSlide(
            currentSlide === documentationImages.length - 1
                ? 0
                : currentSlide + 1
        );
    };

    // Animation variants
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
    };

    const fadeInLeft = {
        initial: { opacity: 0, x: -30 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
    };

    const fadeInRight = {
        initial: { opacity: 0, x: 30 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
    };

    const staggerChildren = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <>
            <Head title="Warung Pasinaon" />

            <div className="min-h-screen bg-gray-50">
                <Navbar />

                {/* Hero Section */}
                <section id="home">
                    <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <motion.div
                                className="space-y-8"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.6,
                                    ease: [0.4, 0, 0.2, 1],
                                }}
                            >
                                <motion.div
                                    className="space-y-6"
                                    variants={staggerChildren}
                                    initial="initial"
                                    animate="animate"
                                >
                                    <motion.h1
                                        className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                                        variants={fadeInUp}
                                    >
                                        Selamat datang
                                        <br />
                                        di Warung{" "}
                                        <span className="relative">
                                            <span className="relative z-10 text-gray-900">
                                                Pasinaon!
                                            </span>
                                            <span className="absolute -bottom-0.5 left-0 right-0 h-12 bg-gradient-to-r from-pink-200 via-rose-200 to-red-200 rounded-lg transform -rotate-1 -z-0"></span>
                                        </span>
                                    </motion.h1>

                                    <motion.p
                                        className="text-lg text-gray-600 leading-relaxed max-w-md"
                                        variants={fadeInUp}
                                    >
                                        TBM Warung Pasinaon bukan sekadar tempat
                                        baca, melainkan ruang belajar gratis
                                        yang terbuka untuk seluruh masyarakat.
                                        Berdiri sejak 2008 melalui Akta Notaris
                                        No. 07 Kantor Pengacara Achmad Dimyati,
                                        dan resmi mendapatkan izin
                                        penyelenggaraan pendidikan non-formal
                                        dari Dinas Pendidikan Kabupaten Semarang
                                        pada 28 September 2010.
                                    </motion.p>
                                </motion.div>

                                {/* Stats Cards */}
                                <motion.div
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-2"
                                    variants={staggerChildren}
                                    initial="initial"
                                    animate="animate"
                                >
                                    <motion.div
                                        className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-sm border border-gray-100"
                                        variants={fadeInUp}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                        }}
                                    >
                                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 overflow-hidden">
                                            <LoadingImage
                                                src="https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2Flogokabsmg.png?alt=media"
                                                alt="Logo Kabupaten Semarang"
                                                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                                            />
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                                            Kabupaten
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                            Semarang
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-sm border border-gray-100"
                                        variants={fadeInUp}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                        }}
                                    >
                                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                            <svg
                                                className="w-6 h-6 sm:w-8 sm:h-8 text-green-600"
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
                                        <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                                            TBM
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                            Taman Bacaan Masyarakat
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-sm border border-gray-100 sm:col-span-2 lg:col-span-1"
                                        variants={fadeInUp}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                        }}
                                    >
                                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                            <svg
                                                className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                                            Literasi
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                            Pendidikan Digital
                                        </p>
                                    </motion.div>
                                </motion.div>

                                {/* CTA Buttons */}
                                <motion.div
                                    className="flex flex-col sm:flex-row gap-4 pt-4"
                                    variants={staggerChildren}
                                    initial="initial"
                                    animate="animate"
                                >
                                    <motion.div variants={fadeInUp}>
                                        <Link
                                            href="/buku-digital"
                                            className="bg-gradient-to-r from-pink-400 to-red-400 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-pink-500 hover:to-red-500 transition duration-300 transform hover:scale-105 shadow-lg text-center inline-block w-full sm:w-auto"
                                        >
                                            Mulai Belajar
                                        </Link>
                                    </motion.div>
                                    <motion.button
                                        variants={fadeInUp}
                                        onClick={() =>
                                            document
                                                .getElementById("about")
                                                ?.scrollIntoView({
                                                    behavior: "smooth",
                                                })
                                        }
                                        className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition duration-300 w-full sm:w-auto"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Tentang Kami
                                    </motion.button>
                                </motion.div>
                            </motion.div>

                            {/* Right Content */}
                            <motion.div
                                className="space-y-4"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.6,
                                    ease: [0.4, 0, 0.2, 1],
                                }}
                            >
                                {/* Top Image */}
                                <motion.div
                                    className="rounded-3xl overflow-hidden shadow-lg"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                    }}
                                >
                                    <LoadingImage
                                        src="https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetCarausel1.jpg?alt=media"
                                        className="w-full h-64 object-cover"
                                        alt="Warung Pasinaon"
                                    />
                                </motion.div>

                                {/* Bottom Grid */}
                                <motion.div
                                    className="grid grid-cols-2 gap-4"
                                    variants={staggerChildren}
                                    initial="initial"
                                    animate="animate"
                                >
                                    <motion.div
                                        className="rounded-3xl overflow-hidden shadow-lg"
                                        variants={fadeInUp}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                        }}
                                    >
                                        <LoadingImage
                                            src="https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetPasinaon2.png?alt=media"
                                            alt="Diskusi Kelompok"
                                            className="w-full h-40 object-cover"
                                        />
                                    </motion.div>
                                    <motion.div
                                        className="rounded-3xl overflow-hidden shadow-lg"
                                        variants={fadeInUp}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                        }}
                                    >
                                        <LoadingImage
                                            src="https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetCarausel8.jpg?alt=media"
                                            alt="Digital Learning"
                                            className="w-full h-40 object-cover"
                                        />
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </main>
                </section>

                {/* About Section */}
                <section id="about" className="bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
                        {/* About Hero */}
                        <motion.div
                            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20 relative overflow-hidden"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Background Decorative Elements */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                {/* Grid Lines - hanya tampil di desktop */}
                                <div className="hidden lg:block absolute inset-0 opacity-10">
                                    <div className="grid grid-cols-8 h-full gap-8">
                                        {[...Array(8)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="border-l border-gray-300"
                                            ></div>
                                        ))}
                                    </div>
                                </div>

                                {/* Floating Decorative Elements - disesuaikan untuk mobile */}
                                <motion.div
                                    className="hidden md:block absolute top-32 right-10 w-12 h-12 bg-pink-200 rounded-full opacity-70"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                ></motion.div>
                                <motion.div
                                    className="hidden md:block absolute top-2 left-1/4 w-8 h-8 bg-green-200 rounded-full opacity-80"
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                ></motion.div>
                                <motion.div
                                    className="hidden md:block absolute top-1/2 right-10 w-10 h-10 bg-orange-200 rounded-full opacity-70"
                                    animate={{ y: [0, 12, 0] }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                ></motion.div>
                            </div>

                            {/* Left Content */}
                            <motion.div
                                className="space-y-6 lg:space-y-8 relative z-10 order-2 lg:order-1"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <motion.div className="space-y-4 lg:space-y-6">
                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                                        {/* Desktop Layout */}
                                        <span className="hidden lg:inline">
                                            Tentang
                                            <br />
                                            <span className="relative">
                                                <span className="relative z-10 text-gray-900">
                                                    Warung Pasinaon
                                                </span>
                                                <span className="absolute -bottom-0.5 left-0 right-0 h-8 lg:h-12 bg-gradient-to-r from-blue-200 via-blue-100 to-white-200 rounded-lg transform -rotate-1 -z-0"></span>
                                            </span>
                                        </span>

                                        {/* Mobile Layout */}
                                        <span className="lg:hidden text-center block">
                                            Tentang{" "}
                                            <span className="relative">
                                                <span className="relative z-10 text-gray-900">
                                                    Warung Pasinaon
                                                </span>
                                                <span className="absolute -bottom-0.5 left-0 right-0 h-4 sm:h-6 bg-gradient-to-r from-blue-200 via-blue-100 to-white-200 rounded-lg transform -rotate-1 -z-0"></span>
                                            </span>
                                        </span>
                                    </h2>

                                    <motion.div
                                        className="space-y-4 text-base sm:text-lg text-gray-600 leading-relaxed relative z-10"
                                        variants={staggerChildren}
                                        initial="initial"
                                        whileInView="animate"
                                        viewport={{ once: true }}
                                    >
                                        <motion.p variants={fadeInUp}>
                                            Warung Pasinaon adalah sebuah Taman
                                            Bacaan Masyarakat (TBM) yang berdiri
                                            di Tegalsari RT 05/08, Bergaslor,
                                            Kec. Bergas, Kabupaten Semarang,
                                            Jawa Tengah. Didirikan sejak tahun
                                            2007 oleh Ibu Tirta Nursari, Warung
                                            Pasinaon hadir sebagai ruang belajar
                                            gratis yang terbuka bagi siapa saja,
                                            khususnya anak-anak.
                                        </motion.p>
                                        <motion.p variants={fadeInUp}>
                                            Pasinaon berasal dari bahasa jawa
                                            yaitu yang berarti belajar, jadi
                                            warung pasinaon adalah tempat
                                            pembelajaran
                                        </motion.p>
                                        <motion.p variants={fadeInUp}>
                                            Kegiatan yang ditawarkan sangat
                                            beragam, mulai dari kelas menulis,
                                            pelatihan desain dan videografi,
                                            literasi digital, hingga pelatihan
                                            baca-tulis bagi lansia. Dengan
                                            semangat gotong royong dan dukungan
                                            dari berbagai pihak, Warung Pasinaon
                                            menjadi simbol perubahan sosial
                                            berbasis komunitas, tempat di mana
                                            belajar menjadi menyenangkan.
                                        </motion.p>
                                    </motion.div>
                                </motion.div>
                            </motion.div>

                            {/* Right Content */}
                            <motion.div
                                className="relative z-10 flex justify-center order-1 lg:order-2 mb-8 lg:mb-0"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                <div className="relative">
                                    {/* Main Photo Container */}
                                    <div className="relative">
                                        <motion.div
                                            className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-100 to-white-100 rounded-3xl overflow-hidden shadow-2xl"
                                            whileHover={{ scale: 1.02 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                            }}
                                        >
                                            <LoadingImage
                                                src="https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetTirta1.png?alt=media"
                                                alt="Bu Tirta Nursari - Pendiri Warung Pasinaon"
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.div>

                                        {/* Floating Elements around Photo - responsive sizes */}
                                        <motion.div
                                            className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-8 h-8 sm:w-12 sm:h-12 bg-yellow-300 rounded-full flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base"
                                            animate={{
                                                rotate: [0, 10, -10, 0],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                            }}
                                        >
                                            📚
                                        </motion.div>
                                        <motion.div
                                            className="absolute -top-1 -right-3 sm:-top-2 sm:-right-6 w-6 h-6 sm:w-10 sm:h-10 bg-pink-300 rounded-full flex items-center justify-center text-white shadow-lg text-xs sm:text-sm"
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                            }}
                                        >
                                            ✨
                                        </motion.div>
                                        <motion.div
                                            className="absolute -bottom-2 -left-3 sm:-bottom-4 sm:-left-6 w-10 h-10 sm:w-14 sm:h-14 bg-blue-300 rounded-full flex items-center justify-center text-white text-sm sm:text-xl shadow-lg"
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                            }}
                                        >
                                            🎓
                                        </motion.div>
                                        <motion.div
                                            className="absolute -bottom-1 -right-2 sm:-bottom-2 sm:-right-4 w-8 h-8 sm:w-12 sm:h-12 bg-green-300 rounded-full flex items-center justify-center text-white shadow-lg text-sm sm:text-base"
                                            animate={{
                                                rotate: [0, -10, 10, 0],
                                            }}
                                            transition={{
                                                duration: 2.5,
                                                repeat: Infinity,
                                            }}
                                        >
                                            💡
                                        </motion.div>
                                    </div>

                                    {/* Name Card - responsive positioning */}
                                    <motion.div
                                        className="absolute -bottom-4 sm:-bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-xl min-w-max"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.8,
                                        }}
                                    >
                                        <div className="text-center">
                                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                                                Ibu Tirta Nursari
                                            </h3>
                                            <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
                                                Pendiri Warung Pasinaon
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Visi & Misi Section */}
                        <motion.div
                            className="space-y-12 mb-20"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Visi */}
                            <motion.div
                                className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                whileHover={{ scale: 1.01 }}
                            >
                                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-100">
                                        <svg
                                            className="w-10 h-10 text-blue-500"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <h3 className="text-4xl font-bold text-gray-900">
                                            Visi Kami
                                        </h3>
                                        <p className="text-xl text-gray-600 leading-relaxed">
                                            Turut membangun generasi Indonesia
                                            yang literat, kreatif, dan
                                            berkarakter melalui program
                                            multiliterasi yang menyenangkan,
                                            inklusif, dan relevan dengan zaman.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Misi */}
                            <motion.div
                                className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                whileHover={{ scale: 1.01 }}
                            >
                                <div className="flex flex-col lg:flex-row items-start gap-8">
                                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 flex-shrink-0">
                                        <svg
                                            className="w-10 h-10 text-pink-500"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex-1 space-y-6">
                                        <h3 className="text-4xl font-bold text-gray-900">
                                            Misi Kami
                                        </h3>
                                        <motion.ul
                                            className="space-y-4 text-lg text-gray-600"
                                            variants={staggerChildren}
                                            initial="initial"
                                            whileInView="animate"
                                            viewport={{ once: true }}
                                        >
                                            <motion.li
                                                className="flex items-start gap-4"
                                                variants={fadeInUp}
                                            >
                                                <div className="bg-gradient-to-r from-pink-400 to-pink-600 rounded-full w-3 h-3 mt-2 flex-shrink-0"></div>
                                                <span>
                                                    Menyelenggarakan kegiatan
                                                    literasi baca tulis,
                                                    digital, dan aktivitas multi
                                                    literasi lain yang dirancang
                                                    untuk menarik minat anak
                                                    remaja.
                                                </span>
                                            </motion.li>
                                            <motion.li
                                                className="flex items-start gap-4"
                                                variants={fadeInUp}
                                            >
                                                <div className="bg-gradient-to-r from-pink-400 to-pink-600 rounded-full w-3 h-3 mt-2 flex-shrink-0"></div>
                                                <span>
                                                    Membangun ruang belajar yang
                                                    inklusif dan ramah anak, di
                                                    mana semua kalangan termasuk
                                                    kalangan disabilitas dan
                                                    rentan dapat mengakses
                                                    pengetahuan dan berekspresi.
                                                </span>
                                            </motion.li>
                                            <motion.li
                                                className="flex items-start gap-4"
                                                variants={fadeInUp}
                                            >
                                                <div className="bg-gradient-to-r from-pink-400 to-pink-600 rounded-full w-3 h-3 mt-2 flex-shrink-0"></div>
                                                <span>
                                                    Mendorong keterlibatan aktif
                                                    keluarga dan komunitas dalam
                                                    upaya membentuk ekosistem
                                                    literasi yang berkelanjutan.
                                                </span>
                                            </motion.li>
                                            <motion.li
                                                className="flex items-start gap-4"
                                                variants={fadeInUp}
                                            >
                                                <div className="bg-gradient-to-r from-pink-400 to-pink-600 rounded-full w-3 h-3 mt-2 flex-shrink-0"></div>
                                                <span>
                                                    Mengembangkan media dan
                                                    konten literasi secara
                                                    kreatif untuk memperkuat
                                                    daya pikir kritis dan
                                                    karakter positif.
                                                </span>
                                            </motion.li>
                                            <motion.li
                                                className="flex items-start gap-4"
                                                variants={fadeInUp}
                                            >
                                                <div className="bg-gradient-to-r from-pink-400 to-pink-600 rounded-full w-3 h-3 mt-2 flex-shrink-0"></div>
                                                <span>
                                                    Menjalin kolaborasi dengan
                                                    berbagai pihak guna
                                                    memperluas dampak program
                                                    dan keberlanjutan kegiatan
                                                    literasi.
                                                </span>
                                            </motion.li>
                                        </motion.ul>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Location Section */}
                        <motion.div
                            className="space-y-8 mb-20"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Header */}
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                    <span className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                                        <span>
                                            Dimana sih Warung Pasinaon? 👀
                                        </span>
                                    </span>
                                </h3>
                            </motion.div>

                            {/* Large Map Section */}
                            <motion.div
                                className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <div className="p-4">
                                    <div className="rounded-2xl overflow-hidden">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d247.40713530223968!2d110.42329717129891!3d-7.182017057030015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1751368800410!5m2!1sen!2sid"
                                            width="100%"
                                            height="450"
                                            style={{ border: 0 }}
                                            allowFullScreen={true}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Information Cards Grid */}
                            <motion.div
                                className="grid md:grid-cols-3 gap-6"
                                variants={staggerChildren}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                            >
                                {/* Address Card */}
                                <motion.div
                                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                                    variants={fadeInUp}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                    }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg
                                                className="w-6 h-6 text-blue-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-2">
                                                Alamat Lengkap
                                            </h4>
                                            <p className="text-gray-600 leading-relaxed text-sm">
                                                Tegalsari RT 05/08, Bergaslor,
                                                Kec. Bergas, Kabupaten Semarang,
                                                Jawa Tengah 50552
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Operating Hours Card */}
                                <motion.div
                                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                                    variants={fadeInUp}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                    }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg
                                                className="w-6 h-6 text-green-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-2">
                                                Jam Operasional
                                            </h4>
                                            <div className="space-y-1 text-sm text-gray-600">
                                                <p>
                                                    Senin - Jumat: 15:00 - 17:00
                                                    WIB
                                                </p>
                                                <p>
                                                    Sabtu - Minggu: 08:00 -
                                                    11:00 WIB
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Transportation Card */}
                                <motion.div
                                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                                    variants={fadeInUp}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                    }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg
                                                className="w-6 h-6 text-purple-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-2">
                                                Akses Transportasi
                                            </h4>
                                            <p className="text-gray-600 leading-relaxed text-sm">
                                                Mudah dijangkau dengan kendaraan
                                                pribadi atau transportasi umum.
                                                Terletak 90 meter dari jalan
                                                raya.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* Action Button */}
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <motion.a
                                    href="https://maps.google.com/?q=Warung+Pasinaon+Tegalsari+Bergaslor+Bergas+Semarang"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-blue-700 transition duration-300 transform hover:scale-105 shadow-lg"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                    Buka di Google Maps
                                </motion.a>
                            </motion.div>
                        </motion.div>

                        {/* Documentation Carousel */}
                        <motion.div
                            className="space-y-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h3 className="text-4xl font-bold text-gray-900 mb-4">
                                    Dokumentasi Kegiatan
                                </h3>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                    Momen-momen penting dalam perjalanan Warung
                                    Pasinaon
                                </p>
                            </motion.div>

                            {/* Carousel Container */}
                            <motion.div
                                className="relative max-w-5xl mx-auto"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                {/* Responsive container dengan aspect ratio 16:9 */}
                                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl">
                                    <AnimatePresence mode="wait">
                                        {documentationImages.map(
                                            (item, index) => (
                                                <motion.div
                                                    key={item.id}
                                                    className="absolute inset-0"
                                                    initial={{ opacity: 0 }}
                                                    animate={{
                                                        opacity:
                                                            index ===
                                                            currentSlide
                                                                ? 1
                                                                : 0,
                                                    }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{
                                                        duration: 0.5,
                                                    }}
                                                >
                                                    {/* Gunakan LoadingImage di sini */}
                                                    <LoadingImage
                                                        src={item.image}
                                                        alt={`Dokumentasi ${item.id}`}
                                                        className="w-full h-full object-cover"
                                                        loadingText="Memuat dokumentasi..."
                                                    />

                                                    {/* Dark Overlay untuk text readability */}
                                                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                                                </motion.div>
                                            )
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Carousel Indicators */}
                                <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                                    {documentationImages.map((_, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                                                index === currentSlide
                                                    ? "bg-white scale-125"
                                                    : "bg-white/50 hover:bg-white/75"
                                            }`}
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                <Footer />
                <GeminiChatBot />
            </div>
        </>
    );
}
