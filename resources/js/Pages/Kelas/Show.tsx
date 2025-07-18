import React, { useState, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import CompanyLayout from "@/Components/CompanyLayout";
import GeminiChatBot from "@/Components/GeminiChatBot";

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
    kelas: Kelas;
    flash?: {
        success?: string;
        error?: string;
    };
}

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
    isOpen,
    onClose,
    title,
    message,
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-gray-200 text-center"
                    >
                        {/* Success Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, rotate: 360 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.2,
                            }}
                            className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg"
                        >
                            <svg
                                className="w-12 h-12 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-2xl font-bold text-gray-800 mb-2"
                        >
                            {title}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-gray-600 mb-8"
                        >
                            {message}
                        </motion.p>
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            onClick={onClose}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                        >
                            Tutup
                        </motion.button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const Show: React.FC<Props> = ({ kelas, flash }) => {
    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: "",
        alamat: "",
        no_telp: "",
    });

    useEffect(() => {
        if (flash?.success) {
            setSuccessModalOpen(true);
        }
    }, [flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/kelas/${kelas.id}/daftar`, {
            onSuccess: () => {
                setShowForm(false);
                reset();
            },
        });
    };

    const progressPercentage = (kelas.terdaftar / kelas.kapasitas) * 100;

    return (
        <CompanyLayout>
            <Head title={`${kelas.nama} - Warung Pasinaon`} />
            <SuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => setSuccessModalOpen(false)}
                title="Pendaftaran Berhasil!"
                message={flash?.success || 'Anda sudah terdaftar di kelas ini.'}
            />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Flash Messages */}
                    {/* {flash?.success && (
                        <div className="mb-6 bg-gradient-to-r from-emerald-400 to-green-500 text-white px-6 py-4 rounded-2xl shadow-lg animate-in slide-in-from-top-4 duration-300">
                            <div className="flex items-center">
                                <svg
                                    className="w-6 h-6 mr-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                {flash.success}
                            </div>
                        </div>
                    )} */}
                    {flash?.error && (
                        <div className="mb-6 bg-gradient-to-r from-red-400 to-red-500 text-white px-6 py-4 rounded-2xl shadow-lg animate-in slide-in-from-top-4 duration-300">
                            <div className="flex items-center">
                                <svg
                                    className="w-6 h-6 mr-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                                    />
                                </svg>
                                {flash.error}
                            </div>
                        </div>
                    )}

                    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50">
                        {/* Modern Header Image */}
                        <div className="relative h-72 md:h-96 overflow-hidden">
                            <img
                                src={kelas.gambar}
                                alt={kelas.nama}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                            {!kelas.is_available && (
                                <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
                                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl border border-white/20 animate-pulse">
                                        <svg
                                            className="w-6 h-6 inline mr-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                                            />
                                        </svg>
                                        Kelas Tidak Tersedia
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-8 md:p-12">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                {/* Main Content */}
                                <div className="lg:col-span-2 space-y-8">
                                    <div className="animate-in slide-in-from-bottom-4 duration-700">
                                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-6 leading-tight">
                                            {kelas.nama}
                                        </h1>

                                        <div className="prose max-w-none mb-8">
                                            <p className="text-gray-600 leading-relaxed text-lg font-light">
                                                {kelas.deskripsi}
                                            </p>
                                        </div>

                                        {/* Detail Kelas - Moved below description */}
                                        <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-8 border border-gray-200 animate-in slide-in-from-bottom-6 duration-700 delay-200">
                                            <h3 className="font-bold text-gray-800 mb-6 text-xl flex items-center">
                                                <div className="w-8 h-8 bg-white shadow-lg rounded-lg flex items-center justify-center mr-3 border border-gray-100">
                                                    <svg
                                                        className="w-4 h-4 text-gray-600"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                                        />
                                                    </svg>
                                                </div>
                                                Detail Kelas
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 bg-white shadow-lg rounded-lg flex items-center justify-center mr-3 border border-purple-100">
                                                            <svg
                                                                className="w-5 h-5 text-purple-600"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-purple-600 font-medium">
                                                                Kategori
                                                            </p>
                                                            <p className="font-bold text-gray-800">
                                                                {kelas.kategori}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 bg-white shadow-lg rounded-lg flex items-center justify-center mr-3 border border-orange-100">
                                                            <svg
                                                                className="w-5 h-5 text-orange-600"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-7 0h8m-8 0H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-1"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-orange-600 font-medium">
                                                                Hari
                                                            </p>
                                                            <p className="font-bold text-gray-800">
                                                                {kelas.hari}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 bg-white shadow-lg rounded-lg flex items-center justify-center mr-3 border border-indigo-100">
                                                            <svg
                                                                className="w-5 h-5 text-indigo-600"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-7 0h8m-8 0H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-1"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-indigo-600 font-medium">
                                                                Tanggal
                                                            </p>
                                                            <p className="font-bold text-gray-800">
                                                                {kelas.tanggal}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Progress Bar in Detail Section */}
                                            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm mt-6 hover:shadow-md transition-shadow duration-300">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm font-medium text-gray-600">
                                                        Peserta Terdaftar
                                                    </span>
                                                    <span className="text-sm font-bold text-gray-800">
                                                        {kelas.terdaftar}/
                                                        {kelas.kapasitas}
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-3">
                                                    <div
                                                        className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-1000 ease-out"
                                                        style={{
                                                            width: `${progressPercentage}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {Math.round(
                                                        progressPercentage
                                                    )}
                                                    % terisi
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Modern Sidebar - Redesigned */}
                                <div className="lg:col-span-1">
                                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-700">
                                        {/* Price Card */}
                                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200 shadow-lg">
                                            <div className="text-center">
                                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full mb-4 shadow-lg">
                                                    <svg
                                                        className="w-8 h-8 text-white"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                </div>
                                                <p className="text-sm text-emerald-600 font-medium mb-1">
                                                    Harga Kelas
                                                </p>
                                                <p className="text-3xl font-bold text-emerald-800 mb-2">
                                                    GRATIS
                                                </p>
                                                <p className="text-xs text-emerald-600">
                                                    100% Bebas Biaya
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action Card */}
                                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                                            <div className="text-center mb-6">
                                                <h3 className="font-bold text-gray-800 text-lg mb-2">
                                                    Siap Bergabung?
                                                </h3>
                                                <p className="text-gray-600 text-sm">
                                                    Daftar sekarang dan mulai
                                                    belajar bersama kami
                                                </p>
                                            </div>

                                            {/* Registration Button */}
                                            {kelas.is_available ? (
                                                <button
                                                    onClick={() =>
                                                        setShowForm(true)
                                                    }
                                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center group mb-4"
                                                >
                                                    <svg
                                                        className="w-5 h-5 mr-2 group-hover:animate-pulse"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                                        />
                                                    </svg>
                                                    Daftar Sekarang
                                                </button>
                                            ) : (
                                                <div className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold py-4 px-6 rounded-2xl text-center opacity-75 mb-4">
                                                    <svg
                                                        className="w-5 h-5 inline mr-2"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                                                        />
                                                    </svg>
                                                    Tidak Tersedia
                                                </div>
                                            )}

                                            {/* Quick Info */}
                                            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-200">
                                                <div className="flex items-center justify-center text-sm text-gray-600">
                                                    <svg
                                                        className="w-4 h-4 mr-2 text-green-500"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                    Konfirmasi instan via
                                                    WhatsApp
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modern Registration Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center mr-3 border border-blue-100">
                                    <svg
                                        className="w-5 h-5 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                    Daftar Kelas
                                </h2>
                            </div>
                            <button
                                onClick={() => setShowForm(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-xl"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="nama"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        id="nama"
                                        value={data.nama}
                                        onChange={(e) =>
                                            setData("nama", e.target.value)
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Masukkan nama lengkap Anda"
                                        required
                                    />
                                    {errors.nama && (
                                        <p className="text-red-500 text-sm mt-2 flex items-center">
                                            <svg
                                                className="w-4 h-4 mr-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                                                />
                                            </svg>
                                            {errors.nama}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="alamat"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Alamat Lengkap
                                    </label>
                                    <textarea
                                        id="alamat"
                                        value={data.alamat}
                                        onChange={(e) =>
                                            setData("alamat", e.target.value)
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                                        rows={3}
                                        placeholder="Masukkan alamat lengkap Anda"
                                        required
                                    />
                                    {errors.alamat && (
                                        <p className="text-red-500 text-sm mt-2 flex items-center">
                                            <svg
                                                className="w-4 h-4 mr-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                                                />
                                            </svg>
                                            {errors.alamat}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="no_telp"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Nomor WhatsApp
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <svg
                                                className="w-5 h-5 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="tel"
                                            id="no_telp"
                                            value={data.no_telp}
                                            onChange={(e) =>
                                                setData(
                                                    "no_telp",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                            placeholder="08xxxxxxxxxx"
                                            required
                                        />
                                    </div>
                                    {errors.no_telp && (
                                        <p className="text-red-500 text-sm mt-2 flex items-center">
                                            <svg
                                                className="w-4 h-4 mr-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                                                />
                                            </svg>
                                            {errors.no_telp}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-500 mt-2 flex items-center">
                                        <svg
                                            className="w-4 h-4 mr-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Link grup WhatsApp akan dikirim ke nomor
                                        ini
                                    </p>
                                </div>
                            </div>

                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                                <div className="flex items-start">
                                    <svg
                                        className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <div className="text-sm text-amber-700">
                                        <p className="font-semibold mb-1">
                                            Informasi Pendaftaran:
                                        </p>
                                        <ul className="space-y-1 text-xs">
                                            <li>
                                                • Konfirmasi pendaftaran akan
                                                dikirim via WhatsApp
                                            </li>
                                            <li>
                                                • Link grup kelas akan
                                                disertakan dalam pesan
                                            </li>
                                            <li>
                                                • Pastikan nomor WhatsApp aktif
                                                dan benar
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-4 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center group"
                                >
                                    {processing ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Mendaftar...
                                        </>
                                    ) : (
                                        <>
                                            <svg
                                                className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            Daftar Sekarang
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <GeminiChatBot />
        </CompanyLayout>
    );
};

export default Show;
