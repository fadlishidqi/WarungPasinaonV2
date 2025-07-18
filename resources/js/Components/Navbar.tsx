import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import LoadingImage from "@/Components/LoadingImage";

const Navbar = () => {
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { href: "/", label: "Home", active: url === "/" },
        {
            href: "/kegiatan",
            label: "Kegiatan",
            active: url.startsWith("/kegiatan"),
        },
        { href: "/kelas", label: "Kelas", active: url.startsWith("/kelas") },
        {
            href: "/buku-digital",
            label: "Buku Digital",
            active: url.startsWith("/buku-digital"),
        },
        {
            href: "/ranking",
            label: "Ranking",
            active: url.startsWith("/ranking"),
        },
    ];

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo & Brand */}
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
                        >
                            <LoadingImage
                                src="https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2Flogo_pasinaon.png?alt=media"
                                alt="Warung Pasinaon Logo"
                                className="h-16 w-16 object-contain"
                            />
                            <div>
                                <span className="text-2xl font-black text-gray-900">
                                    Warung Pasinaon
                                </span>
                                <div className="text-xs text-gray-500 -mt-1">
                                    Ruang Belajar Bersama
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                // === PERUBAHAN DI SINI ===
                                className={`
                                    h-full flex items-center pt-1
                                    text-base font-semibold transition-colors duration-300
                                    ${
                                        link.active
                                            ? "text-blue-600 border-b-2 border-blue-600"
                                            : "text-gray-700 hover:text-blue-600 border-b-2 border-transparent"
                                    }
                                `}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`
                                    block px-3 py-2 rounded-md text-base font-medium transition-colors
                                    ${
                                        link.active
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                                    }
                                `}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
