import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCodjoeData } from '../context/CodjoeContext';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Orders = () => {
    const { getUserOrders, isLoggedIn, products } = useCodjoeData();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        console.log('products:::', products);

        const fetchOrders = async () => {
            if (!isLoggedIn) {
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const response = await getUserOrders();

                if (response.data) {
                    // Map product details to each order item
                    const ordersWithProductDetails = response.data.map(order => {
                        const itemsWithDetails = order.items.map(item => {
                            const product = products.find(p => p._id === item.productId);
                            // Utiliser les données de la commande si disponibles, sinon chercher dans products
                            const productPrice = parseFloat(item.productPrice || (product ? product.price : 0));
                            const productName = item.productName || (product ? product.name : 'Unknown Product');
                            const subtotal = parseFloat(item.subtotal || (item.quantity * productPrice));
                            
                            return {
                                ...item,
                                productName,
                                productPrice,
                                subtotal,
                                productImage: product ? product.mainImg : null
                            };
                        });
                        return {
                            ...order,
                            items: itemsWithDetails
                        };
                    });
                    
                    setOrders(ordersWithProductDetails);
                    console.log('User orders loaded with product details:', ordersWithProductDetails);
                } else {
                    setOrders([]);
                }

            } catch (error) {
                console.error('Error loading orders:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [isLoggedIn, products]);

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
            processing: 'bg-blue-100 text-blue-800 border-blue-300',
            shipped: 'bg-purple-100 text-purple-800 border-purple-300',
            delivered: 'bg-green-100 text-green-800 border-green-300',
            cancelled: 'bg-red-100 text-red-800 border-red-300'
        };
        return colors[status] || colors.pending;
    };

    const getStatusIcon = (status) => {
        const icons = {
            pending: '⏳',
            processing: '📦',
            shipped: '🚚',
            delivered: '✅',
            cancelled: '❌'
        };
        return icons[status] || '📋';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (!isLoggedIn) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20 pb-10'>
                <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className='text-6xl mb-4 block'>🔒</span>
                        <h1 className='text-3xl font-bold text-gray-900 mb-4'>Please Log In</h1>
                        <p className='text-gray-600 mb-8'>You need to be logged in to view your orders</p>
                        <Link
                            to='/login'
                            className='inline-block bg-[#C29F75] hover:bg-[#B8956A] text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl'
                        >
                            Go to Login
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO
                title="My Orders - CODJOE"
                description="Track and manage your CODJOE orders. View order history and shipping status."
                robots="noindex, nofollow"
            />
            <div className='min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20 pb-10'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='mb-8'
                    >
                        <h1 className='text-4xl font-bold text-gray-900 mb-2'>My Orders</h1>
                        <p className='text-gray-600'>Track and manage your orders</p>
                    </motion.div>

                    {isLoading ? (
                        <div className='flex flex-col items-center justify-center py-20'>
                            <div className="w-16 h-16 border-4 border-gray-200 border-t-[#C29F75] rounded-full animate-spin mb-4"></div>
                            <p className='text-gray-600'>Loading your orders...</p>
                        </div>
                    ) : orders.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className='bg-white rounded-2xl shadow-lg p-12 text-center'
                        >
                            <span className='text-6xl mb-4 block'>📦</span>
                            <h2 className='text-2xl font-bold text-gray-900 mb-2'>No Orders Yet</h2>
                            <p className='text-gray-600 mb-6'>Start shopping to see your orders here</p>
                            <Link
                                to='/'
                                className='inline-block bg-[#C29F75] hover:bg-[#B8956A] text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl'
                            >
                                Start Shopping
                            </Link>
                        </motion.div>
                    ) : (
                        <div className='space-y-4'>
                            {orders.map((order, index) => (
                                <motion.div
                                    key={order._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className='bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'
                                >
                                    {/* Order Header */}
                                    <div className='bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-200'>
                                        <div className='flex flex-wrap justify-between items-start gap-4'>
                                            <div>
                                                <div className='flex items-center gap-3 mb-2'>
                                                    <h3 className='text-xl font-bold text-gray-900'>
                                                        Order #{order.orderNumber}
                                                    </h3>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                                                        {getStatusIcon(order.status)} {order.status.toUpperCase()}
                                                    </span>
                                                </div>
                                                <p className='text-sm text-gray-600'>
                                                    Placed on {formatDate(order.createdAt)}
                                                </p>
                                            </div>
                                            <div className='text-right'>
                                                <p className='text-sm text-gray-600 mb-1'>Total</p>
                                                <p className='text-2xl font-bold text-[#C29F75]'>€{(parseFloat(order.total) || 0).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className='p-6'>
                                        <div className='space-y-4'>
                                            {order.items.map((item, itemIndex) => (
                                                <div key={itemIndex} className='flex gap-4 pb-4 border-b border-gray-100 last:border-0'>
                                                    <div className='w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center'>
                                                        {item.productImage ? (
                                                            <img
                                                                src={item.productImage}
                                                                alt={item.productName}
                                                                className='w-full h-full object-cover rounded-lg'
                                                            />
                                                        ) : (
                                                            <span className='text-2xl'>👕</span>
                                                        )}
                                                    </div>
                                                    <div className='flex-1'>
                                                        <h4 className='font-semibold text-gray-900'>{item.productName}</h4>
                                                        <div className='flex gap-4 mt-1 text-sm text-gray-600'>
                                                            <span>Size: {item.size}</span>
                                                            <span>Qty: {item.quantity}</span>
                                                            <span>€{(parseFloat(item.productPrice) || 0).toFixed(2)} each</span>
                                                        </div>
                                                    </div>
                                                    <div className='text-right'>
                                                        <p className='font-semibold text-gray-900'>€{(parseFloat(item.subtotal) || 0).toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Order Summary */}
                                        <div className='mt-6 pt-6 border-t-2 border-gray-200'>
                                            <div className='space-y-2'>
                                                <div className='flex justify-between text-gray-700'>
                                                    <span>Subtotal</span>
                                                    <span>€{(parseFloat(order.subtotal) || 0).toFixed(2)}</span>
                                                </div>
                                                <div className='flex justify-between text-gray-700'>
                                                    <span>Shipping</span>
                                                    <span>€{(parseFloat(order.shippingFee) || 0).toFixed(2)}</span>
                                                </div>
                                                <div className='flex justify-between text-lg font-bold text-gray-900 pt-2'>
                                                    <span>Total</span>
                                                    <span className='text-[#C29F75]'>€{(parseFloat(order.total) || 0).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Shipping Address */}
                                        {order.shippingAddress && (
                                            <div className='mt-6 p-4 bg-gray-50 rounded-xl'>
                                                <h4 className='font-semibold text-gray-900 mb-2'>Shipping Address</h4>
                                                <p className='text-sm text-gray-600'>
                                                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                                                    {order.shippingAddress.address}<br />
                                                    {order.shippingAddress.city && `${order.shippingAddress.city}, `}
                                                    {order.shippingAddress.country}
                                                    {order.shippingAddress.postalCode && ` - ${order.shippingAddress.postalCode}`}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Orders;
