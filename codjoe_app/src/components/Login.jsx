import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCodjoeData } from '../context/CodjoeContext';

const Login = () => {
    const { setUserLoginData } = useCodjoeData();

    const loginUser = async (e) => {
        e.preventDefault();

        setUserLoginData({
            email: e.target.email.value,
            password: e.target.password.value
        });
    }

    return (
        <div className='bg-gradient-to-br from-gray-50 to-gray-100 text-black min-h-screen flex items-center justify-center pt-20 px-4'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='w-full max-w-md'
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className='font-bold text-4xl md:text-5xl mb-3 text-gray-900'
                    >
                        Welcome Back
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className='text-gray-600 text-sm md:text-base'
                    >
                        Login to access your orders, wishlist & more
                    </motion.p>
                </div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onSubmit={loginUser}
                    className="bg-white rounded-3xl shadow-xl p-8 space-y-5"
                >
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full rounded-2xl bg-gray-50 border border-gray-200 px-4 py-3 outline-none focus:border-codjoe-biscuit focus:ring-2 focus:ring-codjoe-biscuit/20 transition-all placeholder:text-gray-400 text-black"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
                        <input
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="w-full rounded-2xl bg-gray-50 border border-gray-200 px-4 py-3 outline-none focus:border-codjoe-biscuit focus:ring-2 focus:ring-codjoe-biscuit/20 transition-all placeholder:text-gray-400 text-black"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-2xl bg-codjoe-biscuit hover:bg-codjoe-biscuit/90 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        Sign In
                    </button>

                    <div className="text-center pt-4">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link className='text-codjoe-biscuit font-semibold hover:underline' to={'/signup'}>
                                Create one
                            </Link>
                        </p>
                    </div>
                </motion.form>
            </motion.div>
        </div>
    );
}

export default Login;