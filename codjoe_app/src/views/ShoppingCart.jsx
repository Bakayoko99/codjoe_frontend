import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CartItem from '../components/CartItem';
import { useCodjoeData } from '../context/CodjoeContext';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';


const ShoppingCart = () => {

    const navigate = useNavigate()

    const { 
        userID, 
        userCart, 
        getManyProducts, 
        manyProducts, 
        cartSubtotal, 
        isLoggedIn,
        removeCartProduct,
        updateCartQuantity,
        updateCartSize,
        sizesData
    } = useCodjoeData();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // Fonction utilitaire pour vérifier et normaliser le panier
    const getValidCart = () => {
        if (!userCart) return [];
        if (Array.isArray(userCart)) return userCart;
        try {
            // Si userCart est une string JSON, essayer de la parser
            return JSON.parse(userCart);
        } catch (e) {
            console.error('Error parsing userCart:', e);
            return [];
        }
    };

    const validCart = getValidCart();
    const hasItems = validCart.length > 0;
    const shippingFee = hasItems ? 5.99 : 0;
    const total = hasItems ? (parseFloat(cartSubtotal) + shippingFee).toFixed(2) : 0;

    // Le composant se met à jour automatiquement quand userCart change dans le contexte
    // Pas besoin de useEffect ici car validCart est recalculé à chaque render

    const handleCheckout = (e) => {
        if (!hasItems) {
            e.preventDefault();
            setAlertMessage('Your cart is empty. Please add items before checkout.');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            return false;
        }
    };

    const handleRemoveItem = async (productId, size) => {
        try {
            await removeCartProduct(productId, size);
            setAlertMessage('Item removed from cart');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
        } catch (error) {
            setAlertMessage('Error removing item');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    const handleUpdateQuantity = async (productId, size, quantity) => {
        try {
            await updateCartQuantity(productId, size, quantity);
        } catch (error) {
            setAlertMessage('Error updating quantity');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    const handleUpdateSize = async (productId, oldSize, newSize) => {
        try {
            const res = await updateCartSize(productId, oldSize, newSize);
            return res;
        } catch (error) {
            throw error;
        }
    };

    // Animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    return (
        <>
            <SEO 
                title="Shopping Cart - CODJOE"
                description="Review your CODJOE shopping cart. Secure checkout with multiple payment options available."
                robots="noindex, nofollow"
            />
            {/* Alert */}
            <AnimatePresence>
                {showAlert && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className='fixed top-24 left-1/2 transform -translate-x-1/2 z-50'
                    >
                        <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-3">
                            <span className="text-2xl">⚠️</span>
                            <p className="font-medium">{alertMessage}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Version Desktop */}
            <div className='max-[1023px]:hidden bg-gradient-to-br from-gray-50 to-white pt-20 min-h-screen'>
                <motion.div 
                    className='max-w-7xl mx-auto px-6 lg:px-8 py-8'
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className='text-center mb-8'>
                        <h1 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-2'>Shopping Cart</h1>
                        <p className='text-gray-600'>
                            {hasItems ? `${validCart.length} item${validCart.length > 1 ? 's' : ''} in your cart` : 'Your cart is empty'}
                        </p>
                    </motion.div>

                    {hasItems ? (
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                            {/* Liste des produits */}
                            <div className='lg:col-span-2 space-y-4'>
                                <AnimatePresence>
                                    {validCart.map((product, index) => (
                                        <CartItem
                                            key={product.id || index}
                                            id={product.id}
                                            name={product.name}
                                            price={product.price}
                                            quantity={product.quantity}
                                            size={product.size}
                                            img={product.mainImg}
                                            onRemove={handleRemoveItem}
                                            onUpdateQuantity={handleUpdateQuantity}
                                            onUpdateSize={handleUpdateSize}
                                            availableSizes={sizesData}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Résumé de la commande */}
                            <motion.div variants={itemVariants} className='lg:col-span-1'>
                                <div className='bg-white rounded-2xl shadow-xl p-6 sticky top-24'>
                                    <h2 className='text-2xl font-bold text-gray-900 mb-6'>Order Summary</h2>
                                    
                                    <div className='space-y-4 mb-6'>
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

                                    {/* Bouton checkout */}
                                    <Link
                                        to="/payment"
                                        onClick={handleCheckout}
                                        className='w-full bg-[#C29F75] hover:bg-[#B8956A] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                                    >
                                        <span>Proceed to Checkout</span>
                                        <span>→</span>
                                    </Link>
                                    
                                    <Link
                                        to="/"
                                        className='w-full mt-3 border-2 border-gray-300 hover:border-[#C29F75] text-gray-700 hover:text-[#C29F75] font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center'
                                    >
                                        Continue Shopping
                                    </Link>
                                    
                                    {/* Trust badges */}
                                    <div className='mt-6 pt-6 border-t border-gray-200'>
                                        <div className='space-y-3 text-sm text-gray-600'>
                                            <div className='flex items-center gap-2'>
                                                <span className='text-green-500'>✓</span>
                                                <span>Secure checkout</span>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <span className='text-green-500'>✓</span>
                                                <span>Free returns within 30 days</span>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <span className='text-green-500'>✓</span>
                                                <span>Express delivery available</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ) : (
                        <motion.div variants={itemVariants} className='text-center py-16'>
                            <div className='text-gray-300 text-9xl mb-6'>🛒</div>
                            <h2 className='text-3xl font-bold text-gray-700 mb-4'>Your cart is empty</h2>
                            <p className='text-gray-500 text-lg mb-8'>Discover our collection and add some products</p>
                            <Link
                                to="/"
                                className='inline-block bg-[#C29F75] hover:bg-[#B8956A] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                            >
                                Start Shopping
                            </Link>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Version Mobile */}
            <div className='lg:hidden bg-gradient-to-br from-gray-50 to-white text-gray-900 pt-16 sm:pt-20 min-h-screen pb-4'>
                <div className='px-4 sm:px-6'>
                    {/* Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='mb-6'
                    >
                        <h1 className='text-2xl sm:text-3xl font-bold mb-2'>Shopping Cart</h1>
                        <p className='text-gray-600'>
                            {hasItems ? `${validCart.length} item${validCart.length > 1 ? 's' : ''}` : 'Your cart is empty'}
                        </p>
                    </motion.div>
                    
                    {hasItems ? (
                        <>
                            {/* Liste des produits */}
                            <motion.div 
                                className='space-y-4 mb-6'
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <AnimatePresence>
                                    {validCart.map((product, index) => (
                                        <CartItem
                                            key={product.id || index}
                                            id={product.id}
                                            name={product.name}
                                            price={product.price}
                                            quantity={product.quantity}
                                            size={product.size}
                                            img={product.mainImg}
                                            onRemove={handleRemoveItem}
                                            onUpdateQuantity={handleUpdateQuantity}
                                            onUpdateSize={handleUpdateSize}
                                            availableSizes={sizesData}
                                        />
                                    ))}
                                </AnimatePresence>
                            </motion.div>

                            {/* Section checkout mobile fixe */}
                            <motion.div 
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className='fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl z-40'
                            >
                                <div className='max-w-lg mx-auto'>
                                    {/* Résumé des prix */}
                                    <div className='bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 mb-4 border border-gray-100'>
                                        <div className='flex justify-between items-center pb-2 mb-2 border-b border-gray-200'>
                                            <span className='font-medium text-gray-700'>Subtotal</span>
                                            <span className='text-gray-900 font-semibold'>€{cartSubtotal > 0 ? cartSubtotal : 0}</span>
                                        </div>
                                        <div className='flex justify-between items-center pb-2 mb-2 border-b border-gray-200'>
                                            <span className='font-medium text-gray-700'>Shipping</span>
                                            <span className='text-gray-600 font-semibold'>€{shippingFee.toFixed(2)}</span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='font-bold text-gray-900'>Total</span>
                                            <span className='text-[#C29F75] font-bold text-lg'>€{total}</span>
                                        </div>
                                    </div>

                                    {/* Bouton checkout */}
                                    <Link
                                        to="/payment"
                                        onClick={handleCheckout}
                                        className='bg-[#C29F75] hover:bg-[#B8956A] w-full h-12 sm:h-14 rounded-xl font-semibold flex justify-center items-center text-white transition-all duration-300 shadow-lg active:scale-95'
                                    >
                                        <span>Proceed to Checkout</span>
                                        <span className='ml-2'>→</span>
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Espace pour éviter que le contenu soit masqué par le footer fixe */}
                            <div className='h-48'></div>
                        </>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className='text-center py-12'
                        >
                            <div className='text-gray-300 text-7xl mb-4'>🛒</div>
                            <h2 className='text-xl font-bold text-gray-700 mb-2'>Your cart is empty</h2>
                            <p className='text-gray-500 mb-6'>Add some products to get started</p>
                            <Link
                                to="/"
                                className='inline-block bg-[#C29F75] hover:bg-[#B8956A] px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg active:scale-95'
                            >
                                Start Shopping
                            </Link>
                        </motion.div>
                    )}
                </div>
            </div>

        </>

    );
}

export default ShoppingCart;
