import React, { useEffect, useState, useRef } from 'react';
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
    const [searchData, setSearchData] = useState(['', []]);

    const searchRef = useRef(null)

    const { isLoggedIn, setIsLoggedIn, isSignup, loginSuccess, userID, userCart, user, products } = useCodjoeData();
    // const { ref, isComponentVisible } = useComponentVisible(false);

    // const handleCart = () => (

    //     // console.log('carttttttststt')
    // )

    // useEffect(() => {
    //     setUser(userID)
    //     console.log('userID ',userID);
    // }, [])

    const testProductss = [
        'black shirt',
        'white shirt',
        'yellow shirt',
        'blue shirt',
    ]

    const handleSearch = (e) => {
        // e.preventDefault()

        let result = products.filter(product => product.name.toLowerCase().includes(e))
        // let result = testProductss.filter(name => name.includes(e))
        setSearchData([e, result])

    }


    const inputBlur = (e) => {

        setTimeout(() => {
            e.target.value = ''
            setSearchData([e.target.value, []])
            // console.log('inputtt bluuuurrr', e.target.value);
            setOpenSearch(false)
        }, 200);
    }

    const inputFocus = () => {

        setOpenSearch(true)
        searchRef.current.focus()

    }


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

                    <ul className="flex gap-5 items-center">
                        <li>
                            {/* <div className={`flex cursor-pointer bg-[#fff] rounded-3xl items-center`} onMouseOver={() => setOpenSearch(true)} onClick={() => setOpenSearch(true)}> */}
                            <div className={`flex bg-[#fff] rounded-3xl flex-col`} onMouseOver={() => inputFocus()}>
                                {/* <div className={` w-6 h-10 flex justify-end rounded-3xl duration-1000 shadow-slate-600 drop-shadow-2xl shadow-2xl border-2 ${openSearch ? 'min-[740px]:w-[375px] max-[560px]:w-20 w-60 px-5' : 'w-6'}`}> */}
                                <div className={`w-6 h-8 flex justify-end items-center rounded-3xl duration-1000 shadow-black drop-shadow-2xl shadow-2xl ${openSearch ? 'min-[740px]:w-[375px] max-[560px]:w-20 w-60 px-5' : 'w-6'}`}>
                                    {/* <input className={`border-0 outline-0 rounded-3xl text-black bg-transparent duration-500`} type="text" placeholder='Search...' /> */}
                                    <form>
                                        <input
                                            className={`border-0 outline-0 rounded-3xl text-black bg-transparent duration-1000 ${openSearch ? 'min-[740px]:w-[312px] max-[560px]:w-20 w-60' : 'w-0'}`}
                                            ref={searchRef}
                                            name='search'
                                            type="text"
                                            placeholder='Search...'
                                            onChange={(e) => handleSearch(e.target.value)}
                                            onBlur={(e) => inputBlur(e)}
                                        />
                                    </form>
                                    <img className='w-6 h-6 cursor-pointer' src={search} alt="search" />

                                </div>
                                <div className={`bg-white/20 rounded-lg shadow-lg backdrop-blur-sm border border-white/30 ${searchData[0].length > 1 ? 'min-h-16' : 'h-0'} w-[336px] mt-8 absolute rounded-b-2xl`}>
                                    {
                                        searchData[0].length > 1 && searchData[1].length == 0 &&
                                        <div className='bg-slate-500 h-16 rounded-b-2xl flex items-center justify-center'>no products found</div>
                                    }
                                    {
                                        searchData[0].length > 1 && searchData[1].length > 0 &&
                                        <ul className='h-full'>
                                            {searchData[1].map((el) => (
                                                <li
                                                    key={el._id}
                                                    className='bg-white/65 rounded-lg shadow-lg backdrop-blur-lg border border-white/30 m-3 p-2 cursor-pointer text-black h-10'
                                                >
                                                    {/* {h-16} */}
                                                    {/* <Link to={`/list/tops`}> */}
                                                    {/* <Link to={`/product/${el._id}`}>
                                                        {el.name}
                                                    </Link> */}
                                                    <a href={`/product/${el._id}`}>
                                                        {el.name}
                                                    </a>
                                                    {/* <div className='h-full'>
                                                            <div className='h-8 w-8'>
                                                                <img src={el.mainImg} alt={el.name} className='object-cover' />
                                                            </div>
                                                            <div>
                                                                <p>{el.name}</p>
                                                            </div>
                                                        </div> */}
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                </div>

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