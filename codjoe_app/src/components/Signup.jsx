import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCodjoeData } from '../context/CodjoeContext';
import Buttons from './Buttons';

const Signup = () => {
    const { setUserSignupData } = useCodjoeData();


    const signupUser = async (e) => {
        e.preventDefault();

        // if (e.target.email.value !== e.target.confirmEmail.value) {
        //     console.log('email not match');
        //     return;
        // }

        setUserSignupData({
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            password: e.target.password.value,
            country: e.target.country.value,
            birthday: e.target.birthday.value
        });

        console.log('login user', e.target);
    }

    return (

        <div className=' bg-white text-black min-h-[97vh] flex items-center pt-20 flex-col'>
            <p className=' mt-14 mb-5'>Welcome</p>
            <div>

                <div className='flex justify-center items-center flex-col mb-8'>
                    <p className='font-semibold text-5xl mb-4'>Join us</p>
                    <p className='text-center'>or register to access your <br />
                        order history, order status & more</p>
                </div>

                <form onSubmit={signupUser} className="flex items-center flex-col">
                    <input name="email" type="email" required
                        className="block w-full rounded-3xl drop-shadow-authShadow bg-white px-3 py-2 mb-3 outline-none placeholder:text-gray-400 text-black"
                        placeholder="Email" />
                    <input name="password" type="password" autoComplete="current-password" required
                        className="mt-2 block w-full drop-shadow-authShadow bg-white rounded-3xl px-3 py-2 mb-3 outline-none placeholder:text-gray-400 text-black"
                        placeholder="Password">
                    </input>
                    <input name="confirmPsw" type="password" autoComplete="current-password" required
                        className="mt-2 block w-full drop-shadow-authShadow bg-white rounded-3xl px-3 py-2 mb-5 outline-none placeholder:text-gray-400 text-black"
                        placeholder="Confirm password">
                    </input>

                    <div className=' grid grid-cols-2 max-w-[340px] gap-3 mb-7'>
                        <input name="firstName" type="text" required
                            className="block w-full rounded-3xl drop-shadow-authShadow bg-white px-3 py-2  outline-none placeholder:text-gray-400 text-black"
                            placeholder="First name" />
                        <input name="lastName" type="text" required
                            className="block w-full rounded-3xl drop-shadow-authShadow bg-white px-3 py-2  outline-none placeholder:text-gray-400 text-black"
                            placeholder="Last name" />
                        <input name="country" type="text" required
                            className="block w-full rounded-3xl drop-shadow-authShadow bg-white px-3 py-2  outline-none placeholder:text-gray-400 text-black"
                            placeholder="Country" />
                        <input name="birthday" type="date" required
                            className="block w-full rounded-3xl drop-shadow-authShadow bg-white px-3 py-2  outline-none placeholder:text-gray-400 text-black"
                            placeholder="Date of birth" />
                    </div>

                    <button type="submit"
                        className="inline-flex items-center justify-center w-44 rounded-3xl bg-codjoe-biscuit p-2 py-3 mb-10 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400">
                        Register
                    </button>

                    <div className="mt-3 mb-5 text-center text-sm text-slate-600">
                        <p className="font-medium text-black">Already have an account ? <Link className='text-[#4285f4]' to={'/login'}>Login</Link> </p>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default Signup;
