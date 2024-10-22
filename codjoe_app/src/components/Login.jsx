import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCodjoeData } from '../context/CodjoeContext';
import Buttons from './Buttons';

const Login = ({ }) => {

    const navigate = useNavigate();
    const { setUserLoginData, isLoggedIn } = useCodjoeData();


    const loginUser = async (e) => {
        e.preventDefault();

        setUserLoginData({
            email: e.target.email.value,
            password: e.target.password.value
        });

        console.log('login user', e.target.email.value, e.target.password.value);
    }

    return (

        <div className=' bg-white text-black min-h-[100vh] flex items-center pt-20 flex-col'>
            <p className=' mt-14 mb-5'>Welcome</p>
            <div>

                <div className='flex justify-center items-center flex-col mb-8'>
                    <p className='font-semibold text-5xl mb-4'>Login</p>
                    <p className='text-center'>or register to access your <br />
                        order history, order status & more</p>
                </div>

                <form onSubmit={loginUser} className="flex items-center flex-col">
                    <input name="email" type="email" required
                        className="block w-full rounded-3xl drop-shadow-authShadow bg-white px-3 py-2 mb-5 outline-none placeholder:text-gray-400 text-black"
                        placeholder="Email" />

                    <input name="password" type="password" autoComplete="current-password" required
                        className="mt-2 block w-full drop-shadow-authShadow bg-white rounded-3xl px-3 py-2 mb-9 outline-none placeholder:text-gray-400 text-black"
                        placeholder="Password">
                    </input>

                    <button type="submit"
                        className="inline-flex items-center justify-center w-44 rounded-3xl bg-codjoe-biscuit p-2 py-3 mb-10 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400">
                        Login
                    </button>

                    <div className="mt-6 text-center text-sm text-slate-600">
                        <p className="font-medium text-black">Don’t have an accout yet ? <Link className='text-[#4285f4]' to={'/signup'}>Register</Link> </p>
                    </div>
                </form>

            </div>

        </div>
    )

}

export default Login;



// // const [opened, setOpened] = useState(false);
// const [showLogin, setShowLogin] = useState(true);
// const [showSignup, setShowSignup] = useState(false);
// // const [hideModal, setHideModal] = useState(false);

// const { setUserSignupData } = useCodjoeData();



// const toggleModal = () => {
//     setShowModal(false)
// };


// const handleAUthModal = () => {
//     setShowLogin(!showLogin);
//     setShowSignup(!showSignup);
//     console.log('showLogin: ', showLogin);
// }

// const handleTransition = () => {
//     const LoginModal = document.getElementById('login');
//     const SignupModal = document.getElementById('signup');
//     if (LoginModal.classList.contains('right-[500px]')) {
//         LoginModal.classList.add('hidden')
//     } else {
//         LoginModal.classList.remove('hidden')
//     }

//     if (SignupModal.classList.contains('left-[500px]')) {
//         SignupModal.classList.add('hidden')
//     } else {
//         SignupModal.classList.remove('hidden')
//     }

// }

// console.log('moddy opened: ', showModal);

// const signupUser = async (e) => {
//     e.preventDefault();

//     if (e.target.email.value !== e.target.confirmEmail.value) {
//         console.log('email not match');
//         return;
//     }

//     setUserSignupData({
//         firstName: e.target.firstName.value,
//         lastName: e.target.lastName.value,
//         email: e.target.email.value,
//         password: e.target.password.value
//     });

//     console.log('signup user', e.target);
// }

// return (
//     <div className=' absolute'>

//         <div className={`bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center ${showModal ? 'flex' : 'hidden'}`}>
//             <div className="p-4 max-w-md h-full md:h-auto">

//                 {/* login */}

//                 {/* <div className=''> */}


//                 <div id='login' onTransitionEnd={() => handleTransition()} className={`relative bg-white rounded-lg shadow transition-all duration-500 right-0 ${showSignup && 'right-[500px]'}`}>
//                     <button type="button"
//                         onClick={toggleModal}
//                         className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"><svg
//                             aria-hidden="true" className="w-5 h-5" fill="#c6c7c7" viewBox="0 0 20 20"
//                             xmlns="http://www.w3.org/2000/svg">
//                             <path fillRule="evenodd"
//                                 d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                                 clipRule="evenodd"></path>
//                         </svg>
//                         <span className="sr-only">Close popup</span>
//                     </button>

//                     <div className="p-5">
//                         <h3 className="text-2xl mb-0.5 font-medium"></h3>
//                         <p className="mb-4 text-sm font-normal text-gray-800"></p>

//                         <div className="text-center">
//                             <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
//                                 Login to your account
//                             </p>
//                             <p className="mt-2 text-sm leading-4 text-slate-600">
//                                 You must be logged in to perform this action.
//                             </p>
//                         </div>

//                         <div className="mt-7 flex flex-col gap-2">

//                             <button
//                                 className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
//                                 <img
//                                     src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub"
//                                     className="h-[18px] w-[18px] " />
//                                 <p>Continue with GitHub</p>
//                             </button>

//                             <button
//                                 className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
//                                 <img
//                                     src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
//                                     className="h-[18px] w-[18px] " />
//                                 <p>Continue with Google</p>

//                             </button>


//                             <button
//                                 className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
//                                 <img
//                                     src="https://www.svgrepo.com/show/448234/linkedin.svg" alt="Google"
//                                     className="h-[18px] w-[18px] " />
//                                 <p>Continue with LinkedIn</p>
//                             </button>
//                         </div>

//                         <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
//                             <div className="h-px w-full bg-slate-200"></div>
//                             OR
//                             <div className="h-px w-full bg-slate-200"></div>
//                         </div>


//                         <form className="w-full">
//                             <label htmlFor="email" className="sr-only">Email address</label>
//                             <input name="email" type="email" required
//                                 className="block w-full rounded-lg bg-white border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1 text-black"
//                                 placeholder="Email Address" />
//                             <label htmlFor="password" className="sr-only">Password</label>
//                             <input name="password" type="password" autoComplete="current-password" required
//                                 className="mt-2 block w-full bg-white rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1 text-black"
//                                 placeholder="Password">

//                             </input>
//                             <p className="mb-3 mt-2 text-sm text-gray-500">
//                                 <a href="#" className="text-blue-800 hover:text-blue-600">Reset your password?</a>
//                             </p>
//                             <button type="submit"
//                                 className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400">
//                                 Continue
//                             </button>
//                             <div className="mt-6 text-center text-sm text-slate-600">
//                                 <p onClick={() => handleAUthModal()} className="font-medium text-[#4285f4]">Sign up</p>
//                             </div>
//                         </form>

//                     </div>


//                 </div>

//                 {/* signup */}
//                 <div id='signup' onTransitionEnd={() => handleTransition()} className={`relative bg-white rounded-lg shadow transition-all duration-500 left-0 ${showLogin && 'left-[500px]'} `}>


//                     <button type="button"
//                         onClick={toggleModal}
//                         className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"><svg
//                             aria-hidden="true" className="w-5 h-5" fill="#c6c7c7" viewBox="0 0 20 20"
//                             xmlns="http://www.w3.org/2000/svg">
//                             <path fillRule="evenodd"
//                                 d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                                 clipRule="evenodd"></path>
//                         </svg>
//                         <span className="sr-only">Close popup</span>
//                     </button>
//                     <div className="p-5">
//                         <div className="text-center">
//                             <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
//                                 Sign up
//                             </p>
//                         </div>
//                         <div className='mt-5'>
//                             <form onSubmit={signupUser} className="w-full">
//                                 <div className='mb-2'>
//                                     <label htmlFor="firstName" className="sr-only">First Name</label>
//                                     <input name="firstName" type="text" required
//                                         className="block w-full rounded-lg bg-white border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1 text-black"
//                                         placeholder="First Name" />
//                                     <label htmlFor="lastName" className="sr-only">Last Name</label>
//                                     <input name="lastName" type="text" required
//                                         className="mt-2 block w-full rounded-lg bg-white border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1 text-black"
//                                         placeholder="Last Name" />
//                                 </div>
//                                 <div className='mb-2'>
//                                     <label htmlFor="email" className="sr-only">Email</label>
//                                     <input name="email" type="email" required
//                                         className="block w-full rounded-lg bg-white border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1 text-black"
//                                         placeholder="Email" />

//                                     <label htmlFor="confirmEmail" className="sr-only">Confirm Email</label>
//                                     <input name="confirmEmail" type="email" required
//                                         className="mt-2 block w-full rounded-lg bg-white border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1 text-black"
//                                         placeholder="Confirm Email" />
//                                 </div>

//                                 <label htmlFor="password" className="sr-only">Password</label>
//                                 <input name="password" type="password" autoComplete="current-password" required
//                                     className="mt-2 block w-full bg-white rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1 text-black"
//                                     placeholder="Password">

//                                 </input>
//                                 <p className="mb-3 mt-2 text-sm text-gray-500">
//                                     <a href="#" className="text-gray-500">At least 6 characters long</a>
//                                 </p>
//                                 <button type="submit"
//                                     className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400">
//                                     Confirm
//                                 </button>
//                                 <div className="mt-6 text-center text-sm text-slate-600">
//                                     <p onClick={() => handleAUthModal()} className="font-medium text-[#4285f4]">Login</p>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>


//                 </div>
//                 {/* </div> */}


//             </div>

//         </div>
//     </div>
// );