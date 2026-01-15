import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categories } from '../constants';
import codjoe_logo from '../assets/codjoe_logo.png';
import menu from '../assets/icons/menu.svg';
import search from '../assets/icons/search.svg';
import shoppingCart from '../assets/icons/shopping-cart.svg';
import vector from '../assets/icons/vector.svg';
import logOut from '../assets/icons/logOut.png'
import { useCodjoeData } from '../context/CodjoeContext';

const Navbar = () => {
    const navigate = useNavigate();

    const [active, setActive] = useState('');
    const [toggle, setToggle] = useState(false);
    const [hideAlert, setHideAlert] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [searchData, setSearchData] = useState(['', []]);

    const searchRef = useRef(null);

    const { isLoggedIn, setIsLoggedIn, isSignup, loginSuccess, userID, userCart, user, userRole, products } = useCodjoeData();

    const handleSearch = (searchTerm) => {
        if (searchTerm.length > 1 && products) {
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchData([searchTerm, filteredProducts]);
        } else {
            setSearchData(['', []]);
        }
    };

    const inputBlur = (e) => {
        setTimeout(() => {
            setOpenSearch(false);
            setSearchData(['', []]);
        }, 200);
    };

    const inputFocus = () => {
        setOpenSearch(true);
    };

    const handleCart = () => {
        // Logic for cart if needed
    };

    useEffect(() => {
        if (loginSuccess) {
            setTimeout(() => {
                setHideAlert(true);
            }, 3000);
        }
    }, [loginSuccess]);

    const handleLogOut = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate('/');
        window.location.reload();
    };

    return (
        <>
            <nav className="px-4 sm:px-6 lg:px-8 xl:px-16 w-full flex items-center py-4 sm:py-6 top-0 fixed z-20 bg-white shadow-sm">
                <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={() => {
                            setActive('home');
                            window.scrollTo(0, 0);
                        }}
                        className="flex-shrink-0"
                    >
                        <img src={codjoe_logo} alt="codjoe_logo" className='w-32 sm:w-36 lg:w-40 h-6 sm:h-7 lg:h-8 object-contain' />
                    </Link>

                    {/* Navigation et icônes */}
                    <ul className="flex gap-3 sm:gap-4 lg:gap-5 items-center">
                        {/* Barre de recherche - cachée sur mobile */}
                        <li className="hidden sm:block relative">
                            <div className={`flex bg-[#fff] rounded-3xl flex-col`} onMouseOver={() => inputFocus()}>
                                <div className={`w-6 h-8 flex justify-end items-center rounded-3xl duration-1000 shadow-black drop-shadow-2xl shadow-2xl ${openSearch ? 'w-48 sm:w-60 lg:w-80 xl:w-96 px-3 sm:px-5' : 'w-6'}`}>
                                    <form className="flex-1">
                                        <input
                                            className={`border-0 outline-0 rounded-3xl text-black bg-transparent duration-1000 ${openSearch ? 'w-full' : 'w-0'}`}
                                            ref={searchRef}
                                            name='search'
                                            type="text"
                                            placeholder='Search...'
                                            onChange={(e) => handleSearch(e.target.value)}
                                            onBlur={(e) => inputBlur(e)}
                                        />
                                    </form>
                                    <img className='w-5 h-5 sm:w-6 sm:h-6 cursor-pointer flex-shrink-0' src={search} alt="search" />
                                </div>
                                
                                {/* Résultats de recherche */}
                                {searchData[0].length > 1 && (
                                    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 w-full mt-2 absolute top-full left-0 z-30 max-h-64 overflow-y-auto">
                                        {searchData[1].length === 0 ? (
                                            <div className='bg-gray-100 h-16 rounded-lg flex items-center justify-center text-sm text-gray-600'>
                                                No products found
                                            </div>
                                        ) : (
                                            <ul>
                                                {searchData[1].map((el) => (
                                                    <li
                                                        key={el._id}
                                                        className='bg-white hover:bg-gray-50 border-b border-gray-100 last:border-b-0 p-3 cursor-pointer text-black text-sm transition-colors'
                                                    >
                                                        <Link 
                                                            to={`/product/${el._id}`}
                                                            className="block w-full h-full"
                                                            onClick={() => {
                                                                setOpenSearch(false);
                                                                setSearchData(['', []]);
                                                            }}
                                                        >
                                                            {el.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>
                        </li>

                        {/* Panier */}
                        <li>
                            <Link to={'/cart'} className="relative p-2" onClick={() => handleCart()}>
                                <img className='w-5 h-5 sm:w-6 sm:h-6' src={shoppingCart} alt="shopping cart" />
                                {userCart && userCart.length > 0 && (
                                    <span className="absolute top-5 -right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {userCart.length}
                                    </span>
                                )}
                            </Link>
                        </li>

                        {/* Menu hamburger */}
                        <li>
                            <button
                                className="p-2"
                                onMouseOver={() => setToggle(true)}
                                onClick={() => setToggle(!toggle)}
                            >
                                <img className='w-5 h-5 sm:w-6 sm:h-6' src={menu} alt="menu" />
                            </button>
                        </li>
                    </ul>

                    {/* Menu déroulant */}
                    <div 
                        onMouseLeave={() => setToggle(false)} 
                        className={`${!toggle ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'} 
                        duration-500 p-4 sm:p-6 border border-gray-200 bg-white absolute top-full right-4 sm:right-6 lg:right-8 
                        min-w-[200px] sm:min-w-[220px] z-30 rounded-xl shadow-lg transition-all max-h-96 overflow-y-auto`}
                    >
                        <ul className="space-y-3">
                            {categories.map((category, index) => (
                                <li key={index} className='text-gray-600 hover:text-gray-800 flex justify-between items-center group'>
                                    <Link
                                        to={category.link}
                                        className="text-sm sm:text-base flex-1 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                                        onClick={() => setToggle(false)}
                                    >
                                        {category.name}
                                    </Link>
                                    <img src={vector} alt="vector" className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </li>
                            ))}
                        </ul>

                        {/* Séparateur */}
                        {(userRole === 'admin' || user) && (
                            <div className="border-t border-gray-200 my-4"></div>
                        )}

                        {/* Back office pour admin */}
                        {userRole === 'admin' && (
                            <div className='mb-3'>
                                <Link 
                                    to={'/backOffice/products'}
                                    className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                                    onClick={() => setToggle(false)}
                                >
                                    <span className="text-blue-600 font-medium">Back office</span>
                                </Link>
                            </div>
                        )}

                        {/* Déconnexion */}
                        {user && (
                            <div>
                                <button 
                                    onClick={handleLogOut}
                                    className="w-full flex justify-between items-center py-2 px-3 rounded-lg hover:bg-red-50 transition-colors text-sm text-red-600 font-medium"
                                >
                                    <span>Log out</span>
                                    <img src={logOut} alt="logOut" className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Alertes */}
            {loginSuccess && !hideAlert && (
                <div className="fixed top-20 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50">
                    Login successful!
                </div>
            )}
        </>
    );
};

export default Navbar;
