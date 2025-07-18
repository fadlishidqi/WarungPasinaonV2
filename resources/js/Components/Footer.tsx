import React from "react";
import { Link, usePage, router } from "@inertiajs/react";

const Footer = () => {
    const { url } = usePage();

    const handleNavClick = (sectionId: string) => {
        if (url === "/") {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            router.visit("/", {
                onSuccess: () => {
                    setTimeout(() => {
                        const element = document.getElementById(sectionId);
                        if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                        }
                    }, 100);
                },
            });
        }
    };

    return (
        <footer className="bg-gray-50 border-t border-gray-200 py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Custom Grid dengan posisi yang disesuaikan */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
                    {/* Logo & Description - Lebar tetap */}
                    <div className="md:w-80">
                        <div className="flex items-center mb-4">
                            <Link
                                href="/"
                                className="text-2xl font-bold text-gray-900"
                            >
                                Warung Pasinaon
                            </Link>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Platform pembelajaran digital yang menghubungkan
                            siswa dengan berbagai konten edukatif berkualitas.
                        </p>
                    </div>

                    {/* Menu & Kontak - Flex container */}
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                        {/* Menu */}
                        <div className="md:w-32">
                            <h4 className="font-semibold text-gray-900 mb-4">
                                Menu
                            </h4>
                            <ul className="space-y-3">
                                <li>
                                    <button
                                        onClick={() => handleNavClick("home")}
                                        className="text-gray-600 hover:text-blue-600 text-sm transition duration-300"
                                    >
                                        Home
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleNavClick("about")}
                                        className="text-gray-600 hover:text-blue-600 text-sm transition duration-300"
                                    >
                                        Tentang Kami
                                    </button>
                                </li>
                                <li>
                                    <Link
                                        href="/kegiatan"
                                        className="text-gray-600 hover:text-blue-600 text-sm transition duration-300"
                                    >
                                        Kegiatan
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/buku-digital"
                                        className="text-gray-600 hover:text-blue-600 text-sm transition duration-300"
                                    >
                                        Buku Digital
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/ranking"
                                        className="text-gray-600 hover:text-blue-600 text-sm transition duration-300"
                                    >
                                        Ranking
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Kontak */}
                        <div className="md:w-64">
                            <h4 className="font-semibold text-gray-900 mb-4">
                                Kontak
                            </h4>
                            <ul className="space-y-3">
                                <li className="text-gray-600 text-sm">
                                    <span className="font-medium">Email:</span>{" "}
                                    warungpasinaon07@gmail.com
                                </li>
                                <li className="text-gray-600 text-sm">
                                    <span className="font-medium">Phone:</span>{" "}
                                    0812 2514 4100
                                </li>
                                <li className="text-gray-600 text-sm">
                                    <span className="font-medium">Alamat:</span>{" "}
                                    Bergas Lor, Bergas, Semarang
                                </li>
                            </ul>

                            {/* Social Links */}
                            <div className="flex space-x-4 mt-6">
                                {/* Instagram */}
                                <a
                                    href="https://www.instagram.com/warung_pasinaon/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transform transition-transform duration-300 hover:scale-110"
                                    aria-label="Instagram"
                                >
                                    <img
                                        src="/images/instagram.png"
                                        alt="Instagram"
                                        className="w-6 h-6"
                                    />
                                </a>

                                {/* Facebook */}
                                <a
                                    href="https://www.facebook.com/share/19RmnyRfqx/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transform transition-transform duration-300 hover:scale-110"
                                    aria-label="Facebook"
                                >
                                    <img
                                        src="/images/facebook.png"
                                        alt="Facebook"
                                        className="w-6 h-6"
                                    />
                                </a>

                                {/* YouTube */}
                                <a
                                    href="#" // Ganti dengan URL YouTube yang benar
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transform transition-transform duration-300 hover:scale-110"
                                    aria-label="YouTube"
                                >
                                    <img
                                        src="/images/youtube.svg"
                                        alt="YouTube"
                                        className="w-6 h-6"
                                    />
                                </a>

                                {/* TikTok */}
                                <a
                                    href="https://www.tiktok.com/@warung.pasinaon"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transform transition-transform duration-300 hover:scale-110"
                                    aria-label="TikTok"
                                >
                                    <img
                                        src="/images/tiktok.svg"
                                        alt="TikTok"
                                        className="w-6 h-6"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Gap diperkecil */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-gray-600 text-sm">
                        © 2025 Warung Pasinaon. All rights reserved.
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                        <a
                            href="https://www.instagram.com/portofolio.kiki/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-blue-800 hover:underline transition-colors"
                        >
                            Build with ♡ by FadliShidqi 
                        </a>
                        <a> & </a>
                        <a
                            href="https://github.com/NaufalYogaPratama"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-blue-800 hover:underline transition-colors"
                        >
                             NaufalYoga
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
