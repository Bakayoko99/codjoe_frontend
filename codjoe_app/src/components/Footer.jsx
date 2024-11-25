import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='h-60 w-full bg-codjoe-biscuit mt-20 p-10'>
            <div className='h-full w-full  flex justify-center items-center gap-20 pl-20'>
                <div className='h-full w-96 flex flex-col py-3'>
                    <p className='mb-4 font-semibold'>About us</p>
                    <p>
                        Codjoe an African clothing style E-commerce
                    </p>
                </div>
                <div className='h-full w-96 flex flex-col py-3'>
                    <p className='mb-4 font-semibold'>Company</p>
                    <ul>
                        <li className='mb-1'><Link to={'/login'}>Login</Link></li>
                        <li className='mb-1'><Link to={'/signup'}>Register</Link></li>
                        <li className='mb-1'><Link to={'/cart'}>Your shopping cart</Link></li>
                        <li>Our Products</li>
                    </ul>
                </div>
                <div className='h-full w-96 flex flex-col py-3'>
                    <p className='mb-4 font-semibold'>Legal</p>
                    <ul>
                        <li className='mb-1'><Link to={'/legal-info/legal-notice'}>Legal notice</Link></li>
                        <li className='mb-1'><Link to={'/legal-info/privacy-policy'}>Privacy policy</Link></li>
                        <li ><Link to={'/legal-info/terms'}>General terms of sale</Link></li>
                    </ul>
                </div>

            </div>

        </div>
    );
}

export default Footer;
