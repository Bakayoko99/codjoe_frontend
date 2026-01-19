import React from 'react';
import { motion } from 'framer-motion';
import Buttons from './Buttons';

const PerfectMix = () => {
    const perfectMixBtnData = [
        {
            type: '',
            btn1: {
                text: 'Explore Collection',
                link: '/list/collections',
            }
        }
    ];

    return (
        <motion.div 
            className='pb-6 sm:pb-10 lg:pb-12 px-4 sm:px-6 lg:px-8'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            {/* Section Header */}
            <div className='text-center mb-6 sm:mb-8'>
                <motion.h2 
                    className='font-serif text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-2'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Codjoe's Perfect Mix
                </motion.h2>
                <motion.p 
                    className='text-gray-600 text-sm sm:text-base'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    Discover our curated collection
                </motion.p>
            </div>

            {/* Image Card */}
            <motion.div 
                className='relative bg-perfect-mix bg-cover bg-center rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden group'
                style={{ paddingTop: '56.25%' }} // 16:9 aspect ratio
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                {/* Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent'></div>
                
                {/* Content Overlay */}
                <div className='absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10'>
                    {/* Badge */}
                    <motion.div 
                        className='inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full mb-4 self-start'
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <span className='text-[#C29F75] font-bold text-sm'>✨</span>
                        <span className='text-gray-900 font-semibold text-sm'>Exclusive Collection</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h3 
                        className='text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 drop-shadow-lg'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        Style Meets Comfort
                    </motion.h3>

                    {/* Description */}
                    <motion.p 
                        className='text-white/90 text-sm sm:text-base lg:text-lg mb-6 max-w-2xl drop-shadow-md'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                    >
                        Carefully selected pieces that blend traditional African aesthetics with contemporary design
                    </motion.p>

                    {/* Button */}
                    <motion.div 
                        className='flex items-center gap-4'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 }}
                    >
                        <Buttons data={perfectMixBtnData} />
                        
                        <motion.span 
                            className='text-white/80 text-sm font-medium hidden sm:block'
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            →
                        </motion.span>
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className='absolute top-6 right-6 w-20 h-20 border-2 border-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                <div className='absolute bottom-6 left-6 w-16 h-16 border-2 border-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700'></div>
            </motion.div>

            {/* Features Grid */}
            <motion.div 
                className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-8'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
            >
                {[
                    { icon: '🌍', label: 'African Heritage' },
                    { icon: '✨', label: 'Premium Quality' },
                    { icon: '🎨', label: 'Unique Designs' },
                    { icon: '♻️', label: 'Sustainable' }
                ].map((feature, index) => (
                    <motion.div 
                        key={index}
                        className='bg-gray-50 rounded-xl p-4 text-center hover:bg-white hover:shadow-md transition-all duration-300'
                        whileHover={{ y: -5 }}
                    >
                        <div className='text-2xl mb-2'>{feature.icon}</div>
                        <p className='text-sm font-medium text-gray-700'>{feature.label}</p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default PerfectMix;
