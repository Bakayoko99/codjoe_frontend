import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCodjoeData } from '../context/CodjoeContext';

const Signup = () => {
    const { setUserSignupData } = useCodjoeData();

    const signupUser = async (e) => {
        e.preventDefault();

        setUserSignupData({
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            password: e.target.password.value,
            country: e.target.country.value,
            birthday: e.target.birthday.value
        });
    }

    return (
        <div className='bg-gradient-to-br from-gray-50 to-gray-100 text-black min-h-screen flex items-center justify-center pt-20 pb-10 px-4'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='w-full max-w-lg'
            >
                <div className='text-center mb-8'>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className='inline-block mb-6'
                    >
                        <div className='w-16 h-16 bg-codjoe-biscuit rounded-full flex items-center justify-center shadow-lg'>
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className='font-bold text-4xl md:text-5xl mb-3 text-gray-900'
                    >
                        Join CODJOE
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className='text-gray-600 text-sm md:text-base'
                    >
                        Create your account to start shopping
                    </motion.p>
                </div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onSubmit={signupUser}
                    className="bg-white rounded-3xl shadow-xl p-8 space-y-4"
                    aria-label="Formulaire d'inscription"
                    noValidate
                >
                    <div>
                        <label htmlFor="signup-email" className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
                        <input
                            id="signup-email"
                            name="email"
                            type="email"
                            required
                            aria-required="true"
                            autoComplete="email"
                            className="w-full rounded-2xl bg-gray-50 border border-gray-200 px-4 py-3 outline-none focus:border-codjoe-biscuit focus:ring-2 focus:ring-codjoe-biscuit/20 transition-all placeholder:text-gray-400 text-black"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="signup-password" className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
                        <input
                            id="signup-password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            aria-required="true"
                            className="w-full rounded-2xl bg-gray-50 border border-gray-200 px-4 py-3 outline-none focus:border-codjoe-biscuit focus:ring-2 focus:ring-codjoe-biscuit/20 transition-all placeholder:text-gray-400 text-black"
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <label htmlFor="signup-confirm-password" className='block text-sm font-medium text-gray-700 mb-2'>Confirm Password</label>
                        <input
                            id="signup-confirm-password"
                            name="confirmPsw"
                            type="password"
                            autoComplete="new-password"
                            required
                            aria-required="true"
                            className="w-full rounded-2xl bg-gray-50 border border-gray-200 px-4 py-3 outline-none focus:border-codjoe-biscuit focus:ring-2 focus:ring-codjoe-biscuit/20 transition-all placeholder:text-gray-400 text-black"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label htmlFor="signup-firstname" className='block text-sm font-medium text-gray-700 mb-2'>First Name</label>
                            <input
                                id="signup-firstname"
                                name="firstName"
                                type="text"
                                required
                                aria-required="true"
                                autoComplete="given-name"
                                className="w-full rounded-2xl bg-gray-50 border border-gray-200 px-4 py-3 outline-none focus:border-codjoe-biscuit focus:ring-2 focus:ring-codjoe-biscuit/20 transition-all placeholder:text-gray-400 text-black"
                                placeholder="John"
                            />
                        </div>
                        <div>
                            <label htmlFor="signup-lastname" className='block text-sm font-medium text-gray-700 mb-2'>Last Name</label>
                            <input
                                id="signup-lastname"
                                name="lastName"
                                type="text"
                                required
                                aria-required="true"
                                autoComplete="family-name"
                                className="w-full rounded-2xl bg-gray-50 border border-gray-200 px-4 py-3 outline-none focus:border-codjoe-biscuit focus:ring-2 focus:ring-codjoe-biscuit/20 transition-all placeholder:text-gray-400 text-black"
                                placeholder="Doe"
                            />
                        </div>
                        <div>
                            <label htmlFor="signup-country" className='block text-sm font-medium text-gray-700 mb-2'>Country</label>
                            <input
                                id="signup-country"
                                name="country"
                                type="text"
                                required
                                aria-required="true"
                                autoComplete="country-name"
                                className="w-full rounded-2xl bg-gray-50 border border-gray-200 px-4 py-3 outline-none focus:border-codjoe-biscuit focus:ring-2 focus:ring-codjoe-biscuit/20 transition-all placeholder:text-gray-400 text-black"
                                placeholder="France"
                            />
                        </div>
                        <div>
                            <label htmlFor="signup-birthday" className='block text-sm font-medium text-gray-700 mb-2'>Birthday</label>
                            <input
                                id="signup-birthday"
                                name="birthday"
                                type="date"
                                required
                                aria-required="true"
                                autoComplete="bday"
                                className="w-full rounded-2xl bg-gray-50 border border-gray-200 px-4 py-3 outline-none focus:border-codjoe-biscuit focus:ring-2 focus:ring-codjoe-biscuit/20 transition-all text-black"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        aria-label="Créer mon compte"
                        className="w-full rounded-2xl bg-codjoe-biscuit hover:bg-codjoe-biscuit/90 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 mt-6"
                    >
                        Create Account
                    </button>

                    <div className="text-center pt-4">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link className='text-codjoe-biscuit font-semibold hover:underline' to={'/login'}>
                                Sign in
                            </Link>
                        </p>
                    </div>
                </motion.form>
            </motion.div>
        </div>
    );
}

export default Signup;
