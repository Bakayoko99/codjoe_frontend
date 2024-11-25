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
        <div className='bg-white pt-20 w-full text-black min-h-[100vh] flex'>
            {/* <h1>Backoffice</h1> */}
            <div className={`${menuOpen === true ? 'w-1/5' : ' w-12'} bg-sky-400 h-[87.7vh] duration-500 p-2`}>
                <div className='bg-green-200 h-full'>
                    <div className='flex justify-center mb-2'>
                        <button className='mt-5' onClick={() => setMenuOpen(!menuOpen)}>
                            <img src={menu} alt="menu" />
                        </button>
                    </div>
                    <ul className={`${menuOpen && 'ml-5'} mt-10`}>
                        {
                            officeMenu.map((e) => (
                                <li key={e.name} className={`${!menuOpen && 'justify-center' } mb-5 flex `}>
                                    <Link className='flex' to={e.link}>
                                        <p className={`${!menuOpen && 'hidden'} min-w-20 mr-7`}>{e.name}</p>
                                        <img className='h-6 w-6' src={e.icon} alt={e.name} />
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>

            <Outlet/>

        </div>
    );
}

export default Backoffice;
