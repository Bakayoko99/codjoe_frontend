import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from './SEO';

const ComingSoon = ({ title = "Coming Soon", description = "This section is under construction" }) => {
    return (
        <>
            <SEO 
                title={`${title} - CODJOE`}
                description={description}
                robots="noindex, nofollow"
            />
            <div className='bg-gradient-to-br from-gray-50 to-white pt-20 w-full text-black min-h-[100vh] flex items-center justify-center px-4'>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className='max-w-2xl w-full text-center'
                >
                    {/* Icône animée */}
                    <motion.div
                        animate={{ 
                            rotate: [0, 10, -10, 10, 0],
                            scale: [1, 1.1, 1, 1.1, 1]
                        }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3
                        }}
                        className='mb-8'
                    >
                        <span className='text-9xl'>🚧</span>
                    </motion.div>

                    {/* Titre principal */}
                    <motion.h1 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className='text-5xl md:text-6xl font-bold text-gray-900 mb-4'
                    >
                        {title}
                    </motion.h1>

                    {/* Description */}
                    <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className='text-xl text-gray-600 mb-8'
                    >
                        {description}
                    </motion.p>

                    {/* Badge */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className='inline-flex items-center gap-2 bg-gradient-to-r from-[#C29F75] to-[#B8956A] text-white px-6 py-3 rounded-full mb-8 shadow-lg'
                    >
                        <span className='animate-pulse'>✨</span>
                        <span className='font-semibold'>Exciting things are on the way!</span>
                    </motion.div>

                    {/* Message supplémentaire */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className='bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100'
                    >
                        <p className='text-gray-700 mb-4'>
                            We're working hard to bring you something special. This section will be available soon with:
                        </p>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
                            <div className='bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl'>
                                <span className='text-2xl mb-2 block'>🎨</span>
                                <span className='font-semibold text-blue-900'>Unique Designs</span>
                            </div>
                            <div className='bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl'>
                                <span className='text-2xl mb-2 block'>⭐</span>
                                <span className='font-semibold text-purple-900'>Premium Quality</span>
                            </div>
                            <div className='bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl'>
                                <span className='text-2xl mb-2 block'>🔥</span>
                                <span className='font-semibold text-pink-900'>Exclusive Items</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bouton de retour */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Link
                            to="/"
                            className='inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105'
                        >
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M10 19l-7-7m0 0l7-7m-7 7h18' />
                            </svg>
                            Back to Home
                        </Link>
                    </motion.div>

                    {/* Animation de points */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className='mt-8 text-gray-400'
                    >
                        <div className='flex items-center justify-center gap-2'>
                            <motion.span
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                                className='text-2xl'
                            >
                                •
                            </motion.span>
                            <motion.span
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                                className='text-2xl'
                            >
                                •
                            </motion.span>
                            <motion.span
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                                className='text-2xl'
                            >
                                •
                            </motion.span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
}

export default ComingSoon;
