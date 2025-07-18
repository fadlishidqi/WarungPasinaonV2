import React, { useState, useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

interface AttendanceStats {
    today: number;
    thisMonth: number;
    childrenToday: number;
    generalToday: number;
}

interface FormData {
    type: string;
    visit_date: string;
    visit_time: string;
    child_name: string;
    child_address: string;
    general_name: string;
    general_address: string;
    institution: string;
    notes: string;
    [key: string]: string;
}

export default function LibraryAttendanceIndex() {
    const { props } = usePage();
    const [stats, setStats] = useState<AttendanceStats | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date().toTimeString().slice(0, 5));

    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        type: '',
        visit_date: new Date().toISOString().split('T')[0],
        visit_time: new Date().toTimeString().slice(0, 5),
        child_name: '',
        child_address: '',
        general_name: '',
        general_address: '',
        institution: '',
        notes: '',
    }) as { data: FormData; setData: any; post: any; processing: boolean; errors: Partial<Record<keyof FormData, string>>; reset: any };

    useEffect(() => {
        fetchStats();
        
        // Update waktu setiap detik
        const timeInterval = setInterval(() => {
            const now = new Date();
            const timeString = now.toTimeString().slice(0, 5);
            setCurrentTime(timeString);
            setData('visit_time', timeString);
        }, 1000);

        return () => clearInterval(timeInterval);
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch('/daftar-hadir/stats');
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        post('/daftar-hadir', {
            onSuccess: () => {
                reset();
                // Reset dengan waktu saat ini
                setData({
                    type: '',
                    visit_date: new Date().toISOString().split('T')[0],
                    visit_time: new Date().toTimeString().slice(0, 5),
                    child_name: '',
                    child_address: '',
                    general_name: '',
                    general_address: '',
                    institution: '',
                    notes: '',
                });
                fetchStats();
            },
            onFinish: () => {
                setIsSubmitting(false);
            }
        });
    };

    const handleTypeChange = (type: string) => {
        setData({
            ...data,
            type,
            child_name: '',
            child_address: '',
            general_name: '',
            general_address: '',
            institution: '',
            notes: '',
        });
    };

    return (
        <>
            <Head title="Daftar Hadir Perpustakaan - Warung Pasinaon" />

            <div className="min-h-screen bg-gray-50">
                <Navbar />

                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
                </div>

                <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
                    {typeof props.success === 'string' && (
                        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            <span className="block sm:inline">{props.success}</span>
                        </div>
                    )}

                    {/* Duplicate Error Message */}
                    {errors.duplicate && (
                        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            <div className="flex items-start">
                                <svg className="h-5 w-5 text-red-400 mt-0.5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <h3 className="text-sm font-medium text-red-800">
                                        Nama Sudah Terdaftar
                                    </h3>
                                    <div className="mt-1 text-sm text-red-700">
                                        {errors.duplicate}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* General Error Message */}
                    {errors.general && (
                        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            <span className="block sm:inline">{errors.general}</span>
                        </div>
                    )}

                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Daftar Hadir Perpustakaan
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Silakan isi daftar hadir untuk mencatat kunjungan Anda ke 
                            TBM Warung Pasinaon. Data ini membantu kami memahami kebutuhan pengunjung.
                        </p>
                    </div>

                    {/* Info Box */}
                    <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start">
                            <svg className="h-5 w-5 text-blue-400 mt-0.5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <h3 className="text-sm font-medium text-blue-800">
                                    Informasi Penting
                                </h3>
                                <div className="mt-1 text-sm text-blue-700">
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Setiap orang hanya bisa mengisi daftar hadir sekali per hari</li>
                                        <li>Waktu kunjungan otomatis mengikuti waktu saat ini</li>
                                        <li>Pastikan nama yang dimasukkan sudah benar</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Pilih Kategori */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-4">
                                    Kategori Pengunjung *
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => handleTypeChange('child')}
                                        className={`p-6 border-2 rounded-lg transition-all ${
                                            data.type === 'child'
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-gray-200 hover:border-blue-300'
                                        }`}
                                    >
                                        <div className="text-center">
                                            <div className="text-3xl mb-2">👶</div>
                                            <div className="font-semibold">Anak-anak</div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                Untuk pengunjung usia anak
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleTypeChange('general')}
                                        className={`p-6 border-2 rounded-lg transition-all ${
                                            data.type === 'general'
                                                ? 'border-green-500 bg-green-50 text-green-700'
                                                : 'border-gray-200 hover:border-green-300'
                                        }`}
                                    >
                                        <div className="text-center">
                                            <div className="text-3xl mb-2">🧑‍🎓</div>
                                            <div className="font-semibold">Umum</div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                Untuk remaja dan dewasa
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                {errors.type && (
                                    <p className="mt-2 text-sm text-red-600">{errors.type}</p>
                                )}
                            </div>

                            {/* Tanggal dan Waktu */}
                            {data.type && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tanggal Kunjungan
                                        </label>
                                        <input
                                            type="date"
                                            value={data.visit_date}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                                            disabled
                                        />
                                        <p className="mt-1 text-xs text-gray-500">
                                            Tanggal otomatis mengikuti hari ini
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Waktu Kunjungan
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="time"
                                                value={currentTime}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                                                disabled
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <svg className="h-4 w-4 text-gray-400 animate-pulse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">
                                            Waktu otomatis mengikuti waktu saat ini
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Form untuk Anak-anak */}
                            {data.type === 'child' && (
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-blue-800 mb-4">
                                        Data Anak-anak
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nama Lengkap Anak *
                                            </label>
                                            <input
                                                type="text"
                                                value={data.child_name}
                                                onChange={(e) => setData('child_name', e.target.value)}
                                                placeholder="Masukkan nama lengkap anak"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                            <p className="mt-1 text-xs text-gray-500">
                                                Nama akan otomatis diubah menjadi huruf besar semua
                                            </p>
                                            {errors.child_name && (
                                                <p className="mt-1 text-sm text-red-600">{errors.child_name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Alamat Lengkap *
                                            </label>
                                            <textarea
                                                value={data.child_address}
                                                onChange={(e) => setData('child_address', e.target.value)}
                                                placeholder="Masukkan alamat lengkap"
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                            {errors.child_address && (
                                                <p className="mt-1 text-sm text-red-600">{errors.child_address}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Form untuk Umum */}
                            {data.type === 'general' && (
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-green-800 mb-4">
                                        Data Pengunjung Umum
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nama Lengkap *
                                            </label>
                                            <input
                                                type="text"
                                                value={data.general_name}
                                                onChange={(e) => setData('general_name', e.target.value)}
                                                placeholder="Masukkan nama lengkap"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                required
                                            />
                                            <p className="mt-1 text-xs text-gray-500">
                                                Nama akan otomatis diubah menjadi huruf besar semua
                                            </p>
                                            {errors.general_name && (
                                                <p className="mt-1 text-sm text-red-600">{errors.general_name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Alamat Lengkap *
                                            </label>
                                            <textarea
                                                value={data.general_address}
                                                onChange={(e) => setData('general_address', e.target.value)}
                                                placeholder="Masukkan alamat lengkap"
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                required
                                            />
                                            {errors.general_address && (
                                                <p className="mt-1 text-sm text-red-600">{errors.general_address}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Institusi/Lembaga *
                                            </label>
                                            <input
                                                type="text"
                                                value={data.institution}
                                                onChange={(e) => setData('institution', e.target.value)}
                                                placeholder="Sekolah, Universitas, Perusahaan, dll"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                required
                                            />
                                            <p className="mt-1 text-sm text-gray-500">
                                                Contoh: SD Negeri 1, Universitas Gadjah Mada, PT. ABC, dsb.
                                            </p>
                                            {errors.institution && (
                                                <p className="mt-1 text-sm text-red-600">{errors.institution}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Keterangan (Opsional)
                                            </label>
                                            <textarea
                                                value={data.notes}
                                                onChange={(e) => setData('notes', e.target.value)}
                                                placeholder="Keterangan tambahan jika ada"
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            {data.type && (
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        disabled={processing || isSubmitting}
                                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
                                    >
                                        {processing || isSubmitting ? (
                                            <span className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Menyimpan...
                                            </span>
                                        ) : (
                                            'Daftar Hadir'
                                        )}
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}