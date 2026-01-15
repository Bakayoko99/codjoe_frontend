import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='min-h-[240px] sm:h-60 w-full bg-codjoe-biscuit mt-12 sm:mt-16 lg:mt-20 p-4 sm:p-6 lg:p-10'>
            <div className='h-full w-full flex flex-col lg:flex-row justify-center items-start lg:items-center gap-6 sm:gap-8 lg:gap-20 lg:pl-20'>
                
                {/* About us */}
                <div className='w-full lg:w-96 flex flex-col py-3'>
                    <p className='mb-3 sm:mb-4 font-semibold text-base sm:text-lg'>About us</p>
                    <p className='text-sm sm:text-base text-gray-700 leading-relaxed'>
                        Codjoe an African clothing style E-commerce platform bringing authentic fashion to the world.
                    </p>
                </div>
                
                {/* Company */}
                <div className='w-full lg:w-96 flex flex-col py-3'>
                    <p className='mb-3 sm:mb-4 font-semibold text-base sm:text-lg'>Company</p>
                    <ul className='space-y-2'>
                        <li className='text-sm sm:text-base'>
                            <Link to={'/login'} className='hover:text-gray-600 transition-colors'>Login</Link>
                        </li>
                        <li className='text-sm sm:text-base'>
                            <Link to={'/signup'} className='hover:text-gray-600 transition-colors'>Register</Link>
                        </li>
                        <li className='text-sm sm:text-base'>
                            <Link to={'/cart'} className='hover:text-gray-600 transition-colors'>Your shopping cart</Link>
                        </li>
                        <li className='text-sm sm:text-base'>
                            <Link to={'/list'} className='hover:text-gray-600 transition-colors'>Our Products</Link>
                        </li>
                    </ul>
                </div>
                
                {/* Legal */}
                <div className='w-full lg:w-96 flex flex-col py-3'>
                    <p className='mb-3 sm:mb-4 font-semibold text-base sm:text-lg'>Legal</p>
                    <ul className='space-y-2'>
                        <li className='text-sm sm:text-base'>
                            <Link to={'/legal-info/legal-notice'} className='hover:text-gray-600 transition-colors'>Legal notice</Link>
                        </li>
                        <li className='text-sm sm:text-base'>
                            <Link to={'/legal-info/privacy-policy'} className='hover:text-gray-600 transition-colors'>Privacy policy</Link>
                        </li>
                        <li className='text-sm sm:text-base'>
                            <Link to={'/legal-info/terms'} className='hover:text-gray-600 transition-colors'>General terms of sale</Link>
                        </li>
                    </ul>
                </div>
            </div>
            
            {/* Copyright */}
            <div className='border-t border-gray-400 mt-6 sm:mt-8 pt-4 text-center'>
                <p className='text-xs sm:text-sm text-gray-600'>
                    © 2025 CODJOE SAS. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default Footer;
