import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import { styles } from '../styles.js';
// import { navLinks } from '../constants';
import { categories } from '../constants';
import codjoe_logo from '../assets/codjoe_logo.png';
import menu from '../assets/icons/menu.svg';
import search from '../assets/icons/search.svg';
import shoppingCart from '../assets/icons/shopping-cart.svg';
import vector from '../assets/icons/vector.svg';
import logOut from '../assets/icons/logOut.png'
import { useCodjoeData } from '../context/CodjoeContext';
import Login from './Login';
// import useComponentVisible from '../constants/index.js';


const Navbar = () => {

    const navigate = useNavigate();

    const [active, setActive] = useState('');
    const [toggle, setToggle] = useState(false);
    const [hideAlert, setHideAlert] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);

    const { isLoggedIn, setIsLoggedIn, isSignup, loginSuccess, userID, userCart, user } = useCodjoeData();
    // const { ref, isComponentVisible } = useComponentVisible(false);

    // const handleCart = () => (

    //     // console.log('carttttttststt')
    // )

    // useEffect(() => {
    //     setUser(userID)
    //     console.log('userID ',userID);
    // }, [])


    useEffect(() => {
        if (loginSuccess) {
            setTimeout(() => {
                setHideAlert(true);
            }, 3000);
        }
    }, [loginSuccess]);

    const handleLogOut = () => {
        localStorage.clear()
        setIsLoggedIn(false)
        navigate('/')
        window.location.reload()
    }




    return (
        <>
            <nav
                className="sm:pr-16 pr-6 w-full flex items-end py-6 top-0 fixed z-20 bg-white"
            >
                <div className="w-full flex justify-between items-center max-w-7xl mx-auto">

                    <Link
                        to="/"
                        // className="flex items-center g"
                        onClick={() => {
                            setActive('home');
                            window.scrollTo(0, 0);
                        }}
                    >
                        <img src={codjoe_logo} alt="codjoe_logo" className=' w-40 h-8 object-contain' />

                    </Link>

                    <ul className="flex gap-5">
                        <li>
                            <div className='flex cursor-pointer bg-[#fff] rounded-3xl items-center ' onMouseOver={() => setOpenSearch(true)} onMouseOut={() => setOpenSearch(false)}>
                                {/* <div className=' w-6'> */}
                                <input className={`border-0 outline-0 shadow-lg rounded-3xl text-black bg-transparent duration-500 ${openSearch ? 'min-[740px]:w-96 max-[560px]:w-20 w-60' : 'w-0'}`} type="text" placeholder='Search...' />
                                <img src={search} alt="search" />

                                {/* </div> */}
                                {/* <Link
                                    to="/"
                                    className="text-sm text-center flex text-gray-600 hover:text-gray-800"
                                    onClick={() => {
                                        // handleSearch()
                                        // setActive('home');
                                        window.scrollTo(0, 0);
                                    }}
                                > */}
                                {/* </Link> */}
                            </div>
                        </li>
                        <li className='flex justify-center relative'>
                            {
                                userCart.length > 0 && <span className='w-3 h-3 bg-[#D9D9D9] absolute rounded-full left-2 text-black text-center text-[9px]'>{userCart.length}</span>

                            }
                            <Link
                                // to={isLoggedIn ? '/cart' : '/login'}
                                to={'/cart'}
                                className="text-gray-600 hover:text-gray-800"
                                onClick={() => handleCart()}
                            >
                                <img src={shoppingCart} alt="shopping-cart" />
                            </Link>
                        </li>
                        <li className='pt-1'>
                            <Link
                                to="#"
                                className="text-gray-600 hover:text-gray-800"
                                onClick={() => {
                                    setToggle(!toggle);
                                    // isComponentVisible(true);
                                    // setActive('contact');
                                    // window.scrollTo(0, 0);
                                }}
                            >
                                <img src={menu} alt="menu" />
                            </Link>
                        </li>
                    </ul>

                    <div className={`${!toggle ? 'hidden' : 'flex flex-col justify-between'} p-6 border-4 bg-white absolute top-20 right-0 mx-4 my-2 min-w-[180px] z-10 rounded-xl h-80 `}>
                        <ul>
                            {
                                categories.map((category, index) => (
                                    <li key={index} className='text-gray-600 hover:text-gray-800 mb-4 flex justify-between w-52'>
                                        <Link
                                            to={category.link}
                                        // onClick={() => {
                                        //     setToggle(!toggle);
                                        //     setActive(category.name);
                                        //     window.scrollTo(0, 0);
                                        // }}
                                        >
                                            {category.name}
                                        </Link>
                                        <img src={vector} alt="vector" />
                                    </li>
                                ))
                            }
                        </ul>

                        {user &&
                            <div className=' text-black border-2 flex justify-between items-center cursor-pointer' onClick={() => handleLogOut()}>
                                <p>Log out</p>
                                <img src={logOut} alt="logOut" />
                            </div>
                        }
                    </div>
                </div>

            </nav>
            {/* {showModal && <LoginModal showModal={showModal} setShowModal={setShowModal} />} */}

            {
                isSignup &&
                <div className={`fixed mt-2 ml-2 transition-all duration-500 ${hideAlert && 'opacity-0'}`}>
                    <div className=" p-4 mb-4 text-sm text-white rounded-lg bg-green-800" role="alert">
                        <p className="font-medium text-center">
                            Sign up successful!.
                        </p>
                    </div>
                </div>
            }
            {
                loginSuccess &&
                <div className={`fixed mt-2 ml-2 transition-all duration-500 ${hideAlert && 'opacity-0'}`}>
                    <div className=" p-4 mb-4 text-sm text-white rounded-lg bg-green-800" role="alert">
                        <p className="font-medium text-center">
                            Login successful!.
                        </p>
                    </div>
                </div>
            }
        </>

    )
}

export default Navbar


{/* <div className={`${!toggle ? 'hidden' : 'flex'} p-6 bg-white absolute top-20 right-0 mx-4 my-2 min-w-[180px] z-10 rounded-xl h-80 `}>
<ul>
    {
        categories.map((category, index) => (
            <li key={index} className='text-gray-600 hover:text-gray-800 mb-4 flex justify-between w-52'>
                <Link
                    to={category.link}
                    // onClick={() => {
                    //     setToggle(!toggle);
                    //     setActive(category.name);
                    //     window.scrollTo(0, 0);
                    // }}
                >
                    {category.name}
                </Link>
                <img src={vector} alt="vector" />
            </li>
        ))
    }
</ul>
</div> */}

////

// <div ref={ref}>
//                     {isComponentVisible && (
//                         <div className={` p-6 bg-white absolute top-20 right-0 mx-4 my-2 min-w-[180px] z-10 rounded-xl h-80 `}>
//                             <ul>
//                                 {
//                                     categories.map((category, index) => (
//                                         <li key={index} className='text-gray-600 hover:text-gray-800 mb-4 flex justify-between w-52'>
//                                             <Link
//                                                 to={category.link}
//                                             // onClick={() => {
//                                             //     setToggle(!toggle);
//                                             //     setActive(category.name);
//                                             //     window.scrollTo(0, 0);
//                                             // }}
//                                             >
//                                                 {category.name}
//                                             </Link>
//                                             <img src={vector} alt="vector" />
//                                         </li>
//                                     ))
//                                 }
//                             </ul>
//                         </div>)}
//                 </div>