import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { marked } from 'marked';
import GeminiChatBot from '@/Components/GeminiChatBot';

interface Kegiatan {
    id: number;
    title: string;
    slug: string;
    description: string;
    content: string;
    image: string;
    date: string;
    tags: string[];
    meta_description?: string;
}

interface Props extends PageProps {
    kegiatan: Kegiatan;
    related: Kegiatan[];
}

// Configure marked options
marked.setOptions({
    breaks: true, // Convert \n to <br>
    gfm: true, // GitHub Flavored Markdown
});

export default function KegiatanShow({ auth, kegiatan, related }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Process markdown content to HTML
    const processedContent = marked(kegiatan.content || '');

    return (
        <>
            <Head>
                <title>{`${kegiatan.title} - Warung Pasinaon`}</title>
                <meta
                    name="description"
                    content={kegiatan.meta_description || kegiatan.description}
                />
                <meta
                    property="og:image"
                    content={kegiatan.image ? `/storage/${kegiatan.image}` : '/images/default-og.jpg'}
                />
            </Head>
            
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                <Navbar />

                {/* Article Content */}
                <article className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <header className="mb-8 sm:mb-12">
                            <div className="mb-6 sm:mb-8">
                                <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    {formatDate(kegiatan.date)}
                                </div>
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4">
                                    {kegiatan.title}
                                </h1>
                                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                                    {kegiatan.description}
                                </p>
                            </div>

                            {/* Tags */}
                            {kegiatan.tags && kegiatan.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                                   {kegiatan.tags.map((tag, index) => (
                                       <span key={index} className="px-2 py-1 text-xs sm:text-sm bg-gradient-to-r from-green-50 to-green-100 text-green-800 rounded-full border border-green-200 hover:shadow-sm transition-all duration-200">
                                           #{tag}
                                       </span>
                                   ))}
                               </div>
                           )}

                           {/* Featured Image */}
                           {kegiatan.image && (
                               <div className="mb-8 sm:mb-12 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transition-shadow duration-300">
                                   <img 
                                       src={`/storage/${kegiatan.image}`} 
                                       alt={kegiatan.title}
                                       className="w-full h-48 sm:h-64 md:h-96 object-cover hover:scale-[1.01] transition-transform duration-500"
                                       loading="lazy"
                                   />
                               </div>
                           )}
                       </header>

                       {/* Content */}
                       <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none mb-12 sm:mb-16 prose-headings:font-semibold prose-a:text-green-600 hover:prose-a:text-green-700 prose-a:transition-colors prose-img:rounded-lg sm:prose-img:rounded-xl prose-img:shadow sm:prose-img:shadow-md">
                           <div 
                               className="content-area text-gray-700 leading-relaxed"
                               dangerouslySetInnerHTML={{ __html: processedContent }}
                           />
                       </div>
                   </div>
               </article>

               {/* Related Activities */}
               {related.length > 0 && (
                   <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-gray-50">
                       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                           <div className="text-center mb-8 sm:mb-12">
                               <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                                   Kegiatan Terkait
                               </h2>
                               <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto mb-4 sm:mb-6 rounded-full"></div>
                               <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                                   Kegiatan lain yang mungkin menarik untuk Anda
                               </p>
                           </div>

                           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                               {related.map((item) => (
                                   <div key={item.id} className="group bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg overflow-hidden hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                       <div className="relative overflow-hidden">
                                           <img 
                                               src={item.image ? `/storage/${item.image}` : '/api/placeholder/400/200'} 
                                               alt={item.title}
                                               className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                                               loading="lazy"
                                           />
                                           <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                       </div>
                                       <div className="p-4 sm:p-6">
                                           <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                                               <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                   <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                               </svg>
                                               {formatDate(item.date)}
                                           </div>
                                           <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                                               {item.title}
                                           </h3>
                                           <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3">
                                               {item.description}
                                           </p>
                                           <Link 
                                               href={`/kegiatan/${item.slug}`}
                                               className="inline-flex items-center text-sm sm:text-base text-green-600 hover:text-green-700 font-semibold group/link"
                                           >
                                               Baca Selengkapnya
                                               <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover/link:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                                   <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                               </svg>
                                           </Link>
                                       </div>
                                   </div>
                               ))}
                           </div>
                       </div>
                   </section>
               )}

                <GeminiChatBot />
               <Footer />
           </div>
       </>
   );
}