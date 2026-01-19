import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AfterPay = () => {
    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 flex items-center justify-center px-4'>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full text-center"
            >
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className='mx-auto mb-6 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center'
                >
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </motion.div>

                <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                >
                    Order Successful! 🎉
                </motion.h1>
                
                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 text-base leading-relaxed mb-8"
                >
                    Thank you for your purchase!<br />
                    You will receive a confirmation email with your order details and tracking number shortly.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                >
                    <Link to={'/list'}>
                        <button className="w-full bg-codjoe-biscuit hover:bg-codjoe-biscuit/90 text-white h-14 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                            Continue Shopping
                        </button>
                    </Link>
                    
                    <Link to={'/orders'}>
                        <button className="w-full bg-white hover:bg-gray-50 text-gray-800 h-14 rounded-full font-medium border-2 border-gray-200 transition-all duration-300">
                            Your Orders
                        </button>
                    </Link>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-sm text-gray-500 mt-8"
                >
                    Need help? <Link to="/legal-info/terms" className="text-codjoe-biscuit hover:underline">Contact us</Link>
                </motion.p>
            </motion.div>
        </div>
    );
}

export default AfterPay;
