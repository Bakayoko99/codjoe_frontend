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
    const menuRef = useRef(null);

    const { isLoggedIn, setIsLoggedIn, isSignup, loginSuccess, userID, userCart, user, setUser, userRole, products } = useCodjoeData();

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

    const inputBlur = () => {
        setTimeout(() => {
            setOpenSearch(false);
            setSearchData(['', []]);
        }, 200);
    };

    const inputFocus = () => {
        setOpenSearch(true);
    };

    // Fermer le menu quand on clique ailleurs
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setToggle(false);
            }
        };

        if (toggle) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [toggle]);

    useEffect(() => {
        if (loginSuccess) {
            setTimeout(() => {
                setHideAlert(true);
            }, 3000);
        }
    }, [loginSuccess]);

    const handleLogOut = () => {
        setUser(null); // Ceci va automatiquement mettre à jour isLoggedIn via l'useEffect du contexte
        navigate('/');
    };

    return (
        <>
            <nav className="px-4 sm:px-6 lg:px-8 xl:px-16 w-full flex items-center py-3 sm:py-4 lg:py-5 top-0 fixed z-50 bg-white shadow-sm border-b border-gray-100">
                <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={() => {
                            setActive('home');
                            setToggle(false);
                            window.scrollTo(0, 0);
                        }}
                        className="flex-shrink-0 hover:opacity-80 transition-opacity"
                    >
                        <img src={codjoe_logo} alt="CODJOE" className='w-28 sm:w-32 lg:w-36 xl:w-40 h-auto object-contain' />
                    </Link>

                    {/* Navigation et icônes */}
                    <div className="flex gap-2 sm:gap-3 lg:gap-4 items-center">
                        {/* Barre de recherche - Version améliorée */}
                        <div className="hidden md:block relative">
                            <div className="relative">
                                <input
                                    ref={searchRef}
                                    type="text"
                                    placeholder="Search products..."
                                    className="text-black w-48 lg:w-64 xl:w-72 pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C29F75]/50 focus:border-[#C29F75] focus:bg-white transition-all placeholder:text-gray-400"
                                    onChange={(e) => handleSearch(e.target.value)}
                                    onFocus={inputFocus}
                                    onBlur={inputBlur}
                                />
                                <img 
                                    src={search} 
                                    alt="search" 
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50"
                                />
                                
                                {/* Résultats de recherche */}
                                {searchData[0].length > 1 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto z-50">
                                        {searchData[1].length === 0 ? (
                                            <div className='p-4 text-center text-sm text-gray-500'>
                                                No products found
                                            </div>
                                        ) : (
                                            <ul className="py-2">
                                                {searchData[1].map((el) => (
                                                    <li key={el._id}>
                                                        <Link 
                                                            to={`/product/${el._id}`}
                                                            className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                                                            onClick={() => {
                                                                setOpenSearch(false);
                                                                setSearchData(['', []]);
                                                            }}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                {el.mainImg && (
                                                                    <img 
                                                                        src={el.mainImg} 
                                                                        alt={el.name}
                                                                        className="w-10 h-10 object-cover rounded"
                                                                    />
                                                                )}
                                                                <div className="flex-1">
                                                                    <p className="text-sm font-medium text-gray-900">{el.name}</p>
                                                                    <p className="text-xs text-gray-500">${el.price}</p>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Icône de recherche mobile */}
                        <button 
                            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                            onClick={() => navigate('/list')}
                        >
                            <img src={search} alt="search" className='w-5 h-5' />
                        </button>

                        {/* Panier */}
                        <Link 
                            to='/cart' 
                            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <img src={shoppingCart} alt="cart" className='w-5 h-5 sm:w-6 sm:h-6' />
                            {userCart && userCart.length > 0 && (
                                <span className="absolute top-0 right-0 bg-[#C29F75] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1 -translate-y-1">
                                    {userCart.length}
                                </span>
                            )}
                        </Link>

                        <button
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                            onClick={() => setToggle(!toggle)}
                        >
                            <img src={menu} alt="menu" className='w-5 h-5 sm:w-6 sm:h-6' />
                        </button>
                    </div>

                    {toggle && (
                        <div 
                            ref={menuRef}
                            className="absolute top-full right-4 sm:right-6 lg:right-8 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50 animate-fadeIn"
                        >
                            {/* Categories */}
                            <div className="max-h-80 overflow-y-auto">
                                <div className="p-2">
                                    <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Categories
                                    </p>
                                    {categories.map((category, index) => (
                                        <Link
                                            key={index}
                                            to={category.link}
                                            className="flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
                                            onClick={() => setToggle(false)}
                                        >
                                            <span>{category.name}</span>
                                            <img 
                                                src={vector} 
                                                alt="" 
                                                className="w-3 h-3 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" 
                                            />
                                        </Link>
                                    ))}
                                </div>

                                {/* Séparateur */}
                                {(userRole === 'admin' || user) && (
                                    <div className="border-t border-gray-100 my-2"></div>
                                )}

                                {/* Back office pour admin */}
                                {userRole === 'admin' && (
                                    <div className="p-2">
                                        <Link 
                                            to='/backOffice/products'
                                            className="flex items-center gap-2 px-3 py-2.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                                            onClick={() => setToggle(false)}
                                        >
                                            <span>⚙️</span>
                                            <span>Back Office</span>
                                        </Link>
                                    </div>
                                )}

                                {/* Orders - pour utilisateurs connectés */}
                                {isLoggedIn && (
                                    <div className="p-2">
                                        <Link 
                                            to='/orders'
                                            className="flex items-center gap-2 px-3 py-2.5 text-sm text-[#C29F75] hover:bg-[#C29F75]/10 rounded-lg transition-colors font-medium"
                                            onClick={() => setToggle(false)}
                                        >
                                            <span>📦</span>
                                            <span>My Orders</span>
                                        </Link>
                                    </div>
                                )}

                                {/* Déconnexion */}
                                {user && (
                                    <div className="p-2">
                                        <button 
                                            onClick={() => {
                                                handleLogOut();
                                                setToggle(false);
                                            }}
                                            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                                        >
                                            <img src={logOut} alt="logout" className="w-4 h-4" />
                                            <span>Log Out</span>
                                        </button>
                                    </div>
                                )}

                                {/* Connexion si pas connecté */}
                                {!user && (
                                    <div className="p-2">
                                        <Link
                                            to='/login'
                                            className="flex items-center gap-2 px-3 py-2.5 text-sm text-[#C29F75] hover:bg-gray-50 rounded-lg transition-colors font-medium"
                                            onClick={() => setToggle(false)}
                                        >
                                            <span>👤</span>
                                            <span>Sign In</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Overlay pour fermer le menu */}
            {toggle && (
                <div 
                    className="fixed inset-0 bg-black/20 z-40"
                    onClick={() => setToggle(false)}
                ></div>
            )}

            {/* Alert de succès de connexion */}
            {loginSuccess && !hideAlert && (
                <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-slideIn">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">✓</span>
                        <span className="font-medium">Login successful!</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
