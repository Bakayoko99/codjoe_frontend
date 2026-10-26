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
                        <h2 className='mb-4 font-semibold text-lg text-white'>À propos</h2>
                        <p className='text-sm text-white/80 leading-relaxed'>
                            CODJOE - Plateforme e-commerce de mode africaine, qui fait rayonner l&apos;authenticité dans le monde entier.
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
                        <h2 className='mb-4 font-semibold text-lg text-white'>Mon compte</h2>
                        <ul className='space-y-2'>
                            <li className='text-sm'>
                                <Link to={'/login'} className='text-white/80 hover:text-white transition-colors duration-200'>Connexion</Link>
                            </li>
                            <li className='text-sm'>
                                <Link to={'/signup'} className='text-white/80 hover:text-white transition-colors duration-200'>Créer un compte</Link>
                            </li>
                            <li className='text-sm'>
                                <Link to={'/cart'} className='text-white/80 hover:text-white transition-colors duration-200'>Mon panier</Link>
                            </li>
                            <li className='text-sm'>
                                <Link to={'/list'} className='text-white/80 hover:text-white transition-colors duration-200'>Nos produits</Link>
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
                        <h2 className='mb-4 font-semibold text-lg text-white'>Informations légales</h2>
                        <ul className='space-y-2'>
                            <li className='text-sm'>
                                <Link to={'/legal-info/legal-notice'} className='text-white/80 hover:text-white transition-colors duration-200'>Mentions légales</Link>
                            </li>
                            <li className='text-sm'>
                                <Link to={'/legal-info/privacy-policy'} className='text-white/80 hover:text-white transition-colors duration-200'>Politique de confidentialité</Link>
                            </li>
                            <li className='text-sm'>
                                <Link to={'/legal-info/terms'} className='text-white/80 hover:text-white transition-colors duration-200'>Conditions générales de vente</Link>
                            </li>
                        </ul>
                    </motion.div>
                </div>
                
                {/* Copyright */}
                <div className='border-t border-white/20 pt-6 text-center'>
                    <p className='text-xs sm:text-sm text-white/60'>
                        © 2025 CODJOE SAS. Tous droits réservés.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export default Footer;
