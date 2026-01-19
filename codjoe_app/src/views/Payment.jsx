import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { useCodjoeData } from '../context/CodjoeContext';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_PUBLIC_KEY)

const Payment = () => {

    const { createPaymentIntent, clientSecret, cartSubtotal, userCart } = useCodjoeData()
    const [clientKey, setClientKey] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initPayment = async () => {
            try {
                setIsLoading(true);
                await createPaymentIntent();
                console.log('Payment Intent created:', clientSecret);
            } catch (err) {
                console.error('Error creating payment intent:', err);
                setError('Failed to initialize payment. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };
        
        initPayment();
    }, []);

    useEffect(() => {
        if (clientSecret?.clientSecret) {
            setClientKey(clientSecret.clientSecret);
            console.log('Client secret set:', typeof clientSecret.clientSecret);
        }
    }, [clientSecret]);

    const appearance = {
        theme: 'flat',
        variables: {
            colorPrimary: '#C29F75',
            colorBackground: '#ffffff',
            colorText: '#1f2937',
            colorDanger: '#ef4444',
            fontFamily: 'system-ui, sans-serif',
            borderRadius: '12px',
            fontSizeBase: '16px',
        },
        rules: {
            '.Input': {
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            },
            '.Input:focus': {
                border: '1px solid #C29F75',
                boxShadow: '0 0 0 3px rgba(194, 159, 117, 0.1)',
            },
        }
    }

    const stripeOptions = {
        clientSecret: clientKey,
        appearance,
    }

    // Calculer le total
    const getValidCart = () => {
        if (!userCart) return [];
        if (Array.isArray(userCart)) return userCart;
        try {
            return JSON.parse(userCart);
        } catch (e) {
            return [];
        }
    };

    const validCart = getValidCart();
    const shippingFee = validCart.length > 0 ? 5.99 : 0;
    const total = validCart.length > 0 ? (parseFloat(cartSubtotal) + shippingFee).toFixed(2) : 0;

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20 pb-10'>
            <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='text-center mb-8'
                >
                    <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>Secure Checkout</h1>
                    <p className='text-gray-600'>Complete your purchase securely</p>
                </motion.div>

                {isLoading ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='flex flex-col items-center justify-center py-20'
                    >
                        <div className="w-16 h-16 border-4 border-gray-200 border-t-[#C29F75] rounded-full animate-spin mb-4"></div>
                        <p className='text-gray-600 text-lg'>Preparing secure checkout...</p>
                    </motion.div>
                ) : error ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className='bg-red-50 border border-red-200 rounded-xl p-6 text-center'
                    >
                        <div className='text-red-500 text-5xl mb-4'>⚠️</div>
                        <h2 className='text-xl font-bold text-red-900 mb-2'>Payment Error</h2>
                        <p className='text-red-700 mb-4'>{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className='bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors'
                        >
                            Try Again
                        </button>
                    </motion.div>
                ) : (
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                        {/* Formulaire de paiement */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className='lg:col-span-2'
                        >
                            <div className='bg-white rounded-2xl shadow-xl p-6 sm:p-8'>
                                <h2 className='text-2xl font-bold text-gray-900 mb-6'>Payment Details</h2>
                                {stripePromise && clientKey && (
                                    <Elements stripe={stripePromise} options={stripeOptions}>
                                        <CheckoutForm />
                                    </Elements>
                                )}
                            </div>
                        </motion.div>

                        {/* Résumé de la commande */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className='lg:col-span-1'
                        >
                            <div className='bg-white rounded-2xl shadow-xl p-6 sticky top-24'>
                                <h2 className='text-xl font-bold text-gray-900 mb-4'>Order Summary</h2>
                                
                                {/* Liste des produits */}
                                <div className='space-y-3 mb-6 max-h-60 overflow-y-auto'>
                                    {validCart.map((item, index) => (
                                        <div key={index} className='flex gap-3 pb-3 border-b border-gray-100 last:border-0'>
                                            {item.mainImg && (
                                                <img 
                                                    src={item.mainImg} 
                                                    alt={item.name}
                                                    className='w-16 h-16 object-cover rounded-lg'
                                                />
                                            )}
                                            <div className='flex-1 min-w-0'>
                                                <p className='font-semibold text-sm text-gray-900 truncate'>{item.name}</p>
                                                <p className='text-xs text-gray-500'>Size: {item.size}</p>
                                                <p className='text-xs text-gray-500'>Qty: {item.quantity}</p>
                                            </div>
                                            <p className='font-semibold text-sm text-gray-900'>€{item.price}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Totaux */}
                                <div className='space-y-3 pt-4 border-t-2 border-gray-200'>
                                    <div className='flex justify-between text-gray-700'>
                                        <span>Subtotal</span>
                                        <span className='font-semibold'>€{cartSubtotal > 0 ? cartSubtotal : 0}</span>
                                    </div>
                                    
                                    <div className='flex justify-between text-gray-700'>
                                        <span>Shipping</span>
                                        <span className='font-semibold'>€{shippingFee.toFixed(2)}</span>
                                    </div>
                                    
                                    <div className='h-px bg-gray-200' />
                                    
                                    <div className='flex justify-between text-lg font-bold text-gray-900'>
                                        <span>Total</span>
                                        <span className='text-[#C29F75]'>€{total}</span>
                                    </div>
                                </div>

                                {/* Security badges */}
                                <div className='mt-6 pt-6 border-t border-gray-200'>
                                    <div className='space-y-2 text-xs text-gray-600'>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-green-500'>🔒</span>
                                            <span>Secure SSL encryption</span>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-green-500'>✓</span>
                                            <span>Payment powered by Stripe</span>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-green-500'>✓</span>
                                            <span>Your data is protected</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Payment;
