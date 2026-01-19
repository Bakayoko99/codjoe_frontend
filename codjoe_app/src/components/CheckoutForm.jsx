import React, { useEffect, useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import { useCodjoeData } from '../context/CodjoeContext';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()

    const { createPaymentIntent, clientSecret, createOrder, userCart } = useCodjoeData()

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    
    // Shipping Address State
    const [shippingAddress, setShippingAddress] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        country: '',
        postalCode: ''
    });

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            setMessage('Payment system not ready. Please refresh the page.');
            setShowError(true);
            return;
        }

        // Validation de l'adresse de livraison
        if (!shippingAddress.firstName || !shippingAddress.lastName || 
            !shippingAddress.address || !shippingAddress.country) {
            setMessage('Please fill in all required shipping address fields.');
            setShowError(true);
            return;
        }

        setIsProcessing(true);
        setMessage(null);
        setShowError(false);

        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/succesfulPay`
                },
                redirect: "if_required"
            });

            if (error) {
                setMessage(error.message || 'Payment failed. Please try again.');
                setShowError(true);
                console.error('Payment error:', error.message);
            } else if (paymentIntent && paymentIntent.status === "succeeded") {
                // Créer la commande après paiement réussi avec l'adresse de livraison
                try {
                    await createOrder(paymentIntent.id, shippingAddress);
                    setMessage("Payment successful! Creating your order...");
                    setShowSuccess(true);
                    setTimeout(() => {
                        navigate('/succesfulPay');
                    }, 1500);
                } catch (orderError) {
                    console.error('Error creating order:', orderError);
                    setMessage("Payment successful but order creation failed. Please contact support.");
                    setShowError(true);
                }
            } else if (paymentIntent) {
                setMessage(`Payment status: ${paymentIntent.status}`);
                setShowError(true);
                console.log('Payment status:', paymentIntent.status);
            } else {
                setMessage("Unexpected payment status. Please contact support.");
                setShowError(true);
            }
        } catch (err) {
            console.error('Payment exception:', err);
            setMessage('An unexpected error occurred. Please try again.');
            setShowError(true);
        } finally {
            setIsProcessing(false);
        }
    }

    return (
        <form id='payment-form' className='space-y-6' onSubmit={handleSubmit}>
            
            {/* Shipping Address Section */}
            <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
                <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
                    <span>📦</span>
                    Shipping Address
                </h3>
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            First Name <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={shippingAddress.firstName}
                            onChange={handleAddressChange}
                            required
                            className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C29F75] focus:ring-2 focus:ring-[#C29F75]/20 outline-none transition-all bg-white text-black'
                            placeholder='John'
                        />
                    </div>
                    
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Last Name <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={shippingAddress.lastName}
                            onChange={handleAddressChange}
                            required
                            className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C29F75] focus:ring-2 focus:ring-[#C29F75]/20 outline-none transition-all bg-white text-black'
                            placeholder='Doe'
                        />
                    </div>
                    
                    <div className='md:col-span-2'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Address <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={shippingAddress.address}
                            onChange={handleAddressChange}
                            required
                            className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C29F75] focus:ring-2 focus:ring-[#C29F75]/20 outline-none transition-all bg-white text-black'
                            placeholder='123 Main Street, Apt 4B'
                        />
                    </div>
                    
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            City
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={shippingAddress.city}
                            onChange={handleAddressChange}
                            className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C29F75] focus:ring-2 focus:ring-[#C29F75]/20 outline-none transition-all bg-white text-black'
                            placeholder='Paris'
                        />
                    </div>
                    
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Postal Code
                        </label>
                        <input
                            type="text"
                            name="postalCode"
                            value={shippingAddress.postalCode}
                            onChange={handleAddressChange}
                            className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C29F75] focus:ring-2 focus:ring-[#C29F75]/20 outline-none transition-all bg-white text-black'
                            placeholder='75001'
                        />
                    </div>
                    
                    <div className='md:col-span-2'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Country <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type="text"
                            name="country"
                            value={shippingAddress.country}
                            onChange={handleAddressChange}
                            required
                            className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C29F75] focus:ring-2 focus:ring-[#C29F75]/20 outline-none transition-all bg-white text-black'
                            placeholder='France'
                        />
                    </div>
                </div>
            </div>
            
            {/* Payment Element */}
            <div className='mb-6'>
                <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
                    <span>💳</span>
                    Payment Details
                </h3>
                <PaymentElement 
                    id="payment-element"
                    options={{
                        layout: {
                            type: 'tabs',
                            defaultCollapsed: false,
                        }
                    }}
                />
            </div>

            {/* Messages */}
            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`p-4 rounded-xl ${
                            showSuccess 
                                ? 'bg-green-50 border border-green-200' 
                                : showError 
                                ? 'bg-red-50 border border-red-200' 
                                : 'bg-blue-50 border border-blue-200'
                        }`}
                    >
                        <div className='flex items-center gap-3'>
                            <span className='text-2xl'>
                                {showSuccess ? '✓' : showError ? '⚠️' : 'ℹ️'}
                            </span>
                            <p className={`font-medium ${
                                showSuccess 
                                    ? 'text-green-800' 
                                    : showError 
                                    ? 'text-red-800' 
                                    : 'text-blue-800'
                            }`}>
                                {message}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Submit Button */}
            <div className='flex flex-col gap-3 pt-4'>
                <button 
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
                        !stripe || isProcessing
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-[#C29F75] hover:bg-[#B8956A] hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95'
                    }`}
                >
                    {isProcessing ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Processing...</span>
                        </>
                    ) : (
                        <>
                            <span>Pay Now</span>
                            <span>→</span>
                        </>
                    )}
                </button>

                <button
                    type="button"
                    onClick={() => navigate('/cart')}
                    disabled={isProcessing}
                    className='w-full py-3 px-6 rounded-xl font-medium text-gray-700 hover:text-[#C29F75] border-2 border-gray-300 hover:border-[#C29F75] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    Back to Cart
                </button>
            </div>

            {/* Security Note */}
            <div className='pt-4 border-t border-gray-200'>
                <p className='text-xs text-gray-500 text-center'>
                    🔒 Your payment information is secure and encrypted
                </p>
            </div>
        </form>
    );
}

export default CheckoutForm;
