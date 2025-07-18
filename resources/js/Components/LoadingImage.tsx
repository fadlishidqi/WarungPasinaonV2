import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingImageProps {
    src: string;
    alt: string;
    className?: string;
    containerClassName?: string;
    onLoad?: () => void;
    showShimmer?: boolean;
    loadingText?: string;
}

const LoadingImage: React.FC<LoadingImageProps> = ({
    src,
    alt,
    className = "",
    containerClassName = "",
    onLoad,
    showShimmer = true,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleImageLoad = () => {
        setIsLoading(false);
        setHasError(false);
        onLoad?.();
    };

    const handleImageError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    return (
        <div className={`relative ${containerClassName}`}>
            {/* Loading State */}
            {isLoading && (
                <motion.div
                    className={`absolute inset-0 ${className} ${showShimmer ? 'bg-gradient-to-r from-transparent via-gray-100/30 to-transparent' : 'bg-transparent'} flex items-center justify-center overflow-hidden`}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {showShimmer && (
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{
                                x: ['-100%', '100%']
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    )}
                   
                    {/* Loading Spinner */}
                    <div className="flex flex-col items-center space-y-3 z-10 bg-transparent backdrop-blur-sm rounded-lg p-4">
                        <div className="relative">
                            <div className="w-8 h-8 border-2 border-transparent rounded-full"></div>
                            <div className="absolute top-0 left-0 w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Error State */}
            {hasError && (
                <motion.div
                    className={`absolute inset-0 ${className} bg-transparent flex items-center justify-center`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="flex flex-col items-center space-y-2 text-gray-400 bg-white/80 backdrop-blur-sm rounded-lg p-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span className="text-xs">Gagal memuat</span>
                    </div>
                </motion.div>
            )}

            {/* Actual Image */}
            <motion.img
                src={src}
                alt={alt}
                className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: 0.5 }}
            />
        </div>
    );
};

export default LoadingImage;