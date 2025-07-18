import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

interface CompanyLayoutProps {
    children: React.ReactNode;
}

const CompanyLayout: React.FC<CompanyLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default CompanyLayout;