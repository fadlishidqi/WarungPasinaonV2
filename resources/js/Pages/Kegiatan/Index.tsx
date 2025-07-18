"use client"
import { Head, Link, router } from "@inertiajs/react"
import type { PageProps } from "@/types"
import CompanyLayout from "@/Components/CompanyLayout"
import { motion, AnimatePresence, Variants } from "framer-motion"
import GeminiChatBot from '@/Components/GeminiChatBot';

interface Kegiatan {
  id: number
  title: string
  slug: string
  description: string
  image: string
  date: string
  category: string
  tags: string[]
}

interface Props extends PageProps {
  kegiatan: Kegiatan[]
  currentCategory: string
  categoryCounts: {
    literasi: number
    keagamaan: number
    kesehatan: number
    umkm: number
  }
}

export default function KegiatanIndex({ auth, kegiatan, currentCategory, categoryCounts }: Props) {
  const categories = [
    { key: "literasi", label: "Literasi", count: categoryCounts.literasi },
    { key: "keagamaan", label: "Keagamaan", count: categoryCounts.keagamaan },
    { key: "kesehatan", label: "Kesehatan", count: categoryCounts.kesehatan },
    { key: "umkm", label: "UMKM", count: categoryCounts.umkm },
  ]

  const handleCategoryChange = (category: string) => {
    router.get(
      "/kegiatan",
      { category },
      {
        preserveState: true,
        replace: true,
      },
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Animation variants - PERBAIKAN TIPE
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  }

  const fadeInLeft = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 }
  }

  const staggerChildren: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

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
        ease: "easeOut" // Gunakan string predefined
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95,
      transition: { 
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }

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
  }

  return (
    <CompanyLayout>
      <Head title="Kegiatan - Warung Pasinaon" />

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
                  Kegiatan Warung Pasinaon
                </h1>
              </motion.div>

              <motion.p 
                className="text-gray-600 text-base mb-8 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Dokumentasi berbagai kegiatan pembelajaran dan pengembangan yang telah kami selenggarakan untuk kemajuan
                pendidikan
              </motion.p>

              {/* Category Navigation */}
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <nav className="flex space-x-8">
                  {categories.map((category, index) => (
                    <motion.button
                      key={category.key}
                      onClick={() => handleCategoryChange(category.key)}
                      className={`relative pb-3 font-medium text-base transition-colors duration-200 ${
                        currentCategory === category.key ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category.label}
                      {currentCategory === category.key && (
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                          layoutId="activeCategory"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </nav>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Activities Grid */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <AnimatePresence mode="wait">
              {kegiatan.length > 0 ? (
                <motion.div 
                  className="grid md:grid-cols-2 gap-6"
                  variants={staggerChildren}
                  initial="initial"
                  animate="animate"
                  key={currentCategory}
                >
                  {kegiatan.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${currentCategory}`}
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
                          src={item.image ? `/storage/${item.image}` : "/api/placeholder/400/240"}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 0.1 }}
                        />
                      </div>

                      <motion.div 
                        className="p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        <motion.h3 
                          className="text-lg font-semibold text-gray-900 mb-3 leading-tight"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.3 }}
                        >
                          {item.title}
                        </motion.h3>

                        <motion.p 
                          className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.4 }}
                        >
                          {item.description}
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 }}
                        >
                          <Link
                            href={`/kegiatan/${item.slug}`}
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
                  key={`empty-${currentCategory}`}
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </motion.svg>
                  </motion.div>

                  <motion.h3 
                    className="text-xl font-semibold text-gray-900 mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Belum Ada Kegiatan
                  </motion.h3>

                  <motion.p 
                    className="text-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Kegiatan untuk kategori {categories.find((cat) => cat.key === currentCategory)?.label} belum tersedia.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
      <GeminiChatBot />
    </CompanyLayout>
  )
}