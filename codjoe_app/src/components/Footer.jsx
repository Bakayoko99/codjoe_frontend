import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='min-h-[240px] w-full bg-codjoe-biscuit mt-12 sm:mt-16 lg:mt-20 p-6 sm:p-8 lg:p-12'
        >
            <div className='max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-8'>
                    
                    {/* About us */}
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className='flex flex-col'
                    >
                        <h3 className='mb-4 font-semibold text-lg text-white'>About us</h3>
                        <p className='text-sm text-white/80 leading-relaxed'>
                            CODJOE - African clothing style E-commerce platform bringing authentic fashion to the world.
                        </p>
                    </motion.div>
                    
                    {/* Company */}
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className='flex flex-col'
                    >
                        <h3 className='mb-4 font-semibold text-lg text-white'>Company</h3>
                        <ul className='space-y-2'>
                            <li className='text-sm'>
                                <Link to={'/login'} className='text-white/80 hover:text-white transition-colors duration-200'>Login</Link>
                            </li>
                            <li className='text-sm'>
                                <Link to={'/signup'} className='text-white/80 hover:text-white transition-colors duration-200'>Register</Link>
                            </li>
                            <li className='text-sm'>
                                <Link to={'/cart'} className='text-white/80 hover:text-white transition-colors duration-200'>Your shopping cart</Link>
                            </li>
                            <li className='text-sm'>
                                <Link to={'/list'} className='text-white/80 hover:text-white transition-colors duration-200'>Our Products</Link>
                            </li>
                        </ul>
                    </motion.div>
                    
                    {/* Legal */}
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className='flex flex-col'
                    >
                        <h3 className='mb-4 font-semibold text-lg text-white'>Legal</h3>
                        <ul className='space-y-2'>
                            <li className='text-sm'>
                                <Link to={'/legal-info/legal-notice'} className='text-white/80 hover:text-white transition-colors duration-200'>Legal notice</Link>
                            </li>
                            <li className='text-sm'>
                                <Link to={'/legal-info/privacy-policy'} className='text-white/80 hover:text-white transition-colors duration-200'>Privacy policy</Link>
                            </li>
                            <li className='text-sm'>
                                <Link to={'/legal-info/terms'} className='text-white/80 hover:text-white transition-colors duration-200'>General terms of sale</Link>
                            </li>
                        </ul>
                    </motion.div>
                </div>
                
                {/* Copyright */}
                <div className='border-t border-white/20 pt-6 text-center'>
                    <p className='text-xs sm:text-sm text-white/60'>
                        © 2025 CODJOE SAS. All rights reserved.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export default Footer;
