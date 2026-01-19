import React from 'react';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import menu from '../assets/icons/menu.svg';
import stat from '../assets/icons/bOffice/stat.png';
import user from '../assets/icons/user.png';
import bestSeller from '../assets/icons/bOffice/bestSeller.png';
import products from '../assets/icons/bOffice/product.png';

const Backoffice = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    // const officeMenu = ['homeHead', 'sta', 'usr', 'prd', 'best']
    const officeMenu = [
        // {
        //     name: 'Menu',
        //     icon: menu,
        //     link: ''
        // },
        {
            name: 'Stats',
            icon: stat,
            link: 'stats'
        },
        {
            name: 'Users',
            icon: user,
            link: 'users'
        },
        {
            name: 'Products',
            icon: products,
            link: 'products'
        },
        {
            name: 'Best Seller',
            icon: bestSeller,
            link: 'bestSellers'
        }
    ]

    return (
        <div className='bg-gradient-to-br from-gray-50 to-gray-100 pt-20 w-full text-black min-h-[100vh] flex'>
            {/* Sidebar moderne */}
            <div className={`${menuOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-gray-900 to-gray-800 h-[87.7vh] duration-300 ease-in-out shadow-2xl border-r border-gray-700 relative`}>
                {/* Overlay gradient pour effet de profondeur */}
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none'></div>
                
                <div className='relative h-full flex flex-col'>
                    {/* Bouton menu */}
                    <div className='flex justify-center py-6 border-b border-gray-700/50'>
                        <button 
                            className='p-3 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 group'
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <img 
                                src={menu} 
                                alt="menu" 
                                className={`w-6 h-6 transition-transform duration-300 ${menuOpen ? 'rotate-90' : ''} filter invert brightness-200`}
                            />
                        </button>
                    </div>

                    {/* Liste des menus */}
                    <nav className='flex-1 py-8 px-3'>
                        <ul className='space-y-3'>
                            {officeMenu.map((e) => (
                                <li key={e.name} className='group'>
                                    <Link 
                                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
                                            hover:bg-gradient-to-r hover:from-[#C29F75] hover:to-[#B8956A] 
                                            hover:shadow-lg hover:shadow-[#C29F75]/20 hover:-translate-x-1
                                            ${!menuOpen ? 'justify-center' : ''}`}
                                        to={e.link}
                                    >
                                        <img 
                                            className='h-6 w-6 filter invert brightness-200 group-hover:brightness-100 transition-all duration-300 group-hover:scale-110' 
                                            src={e.icon} 
                                            alt={e.name} 
                                        />
                                        <p className={`${!menuOpen && 'hidden'} text-gray-200 font-medium group-hover:text-white transition-colors duration-300 whitespace-nowrap`}>
                                            {e.name}
                                        </p>
                                    </Link>
                                    {/* Tooltip pour mode réduit */}
                                    {!menuOpen && (
                                        <div className='absolute left-20 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50'>
                                            <div className='bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-xl border border-gray-700 whitespace-nowrap'>
                                                {e.name}
                                                <div className='absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 border-l border-b border-gray-700 rotate-45'></div>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Footer du sidebar */}
                    <div className='p-4 border-t border-gray-700/50'>
                        <div className={`${menuOpen ? 'flex items-center gap-3' : 'flex justify-center'} text-gray-400 text-xs`}>
                            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                            {menuOpen && <span>Admin Panel</span>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenu principal */}
            <div className='flex-1 overflow-auto'>
                <Outlet/>
            </div>
        </div>
    );
}

export default Backoffice;
