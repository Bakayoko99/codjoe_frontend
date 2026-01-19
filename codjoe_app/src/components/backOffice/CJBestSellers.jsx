import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCodjoeData } from '../../context/CodjoeContext';

const CJBestSellers = () => {
    const { products } = useCodjoeData();
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        // Simuler des best sellers (en production, ces données viendraient d'une API)
        const mockBestSellers = products.slice(0, 6).map((product, index) => ({
            ...product,
            sales: Math.floor(Math.random() * 200) + 50,
            revenue: (parseFloat(product.price) * (Math.floor(Math.random() * 200) + 50)).toFixed(2),
            rank: index + 1
        })).sort((a, b) => b.sales - a.sales);
        
        setBestSellers(mockBestSellers);
    }, [products]);

    return (
        <div className='w-full min-h-[87.7vh] bg-gradient-to-br from-gray-50 to-gray-100 p-6'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='mb-8'
                >
                    <h1 className='text-4xl font-bold text-gray-900 mb-2'>Best Sellers</h1>
                    <p className='text-gray-600'>Top performing products in your store</p>
                </motion.div>

                {/* Best Sellers Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {bestSellers.map((product, index) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className='bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2'
                        >
                            {/* Badge de rang */}
                            <div className='relative'>
                                <div className='absolute top-4 left-4 z-10'>
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${
                                        product.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                                        product.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                                        product.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                                        'bg-gradient-to-br from-[#C29F75] to-[#B8956A]'
                                    }`}>
                                        #{product.rank}
                                    </div>
                                </div>
                                
                                {/* Image du produit */}
                                <div className='aspect-square bg-gray-100'>
                                    <img
                                        src={product.mainImg}
                                        alt={product.name}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                            </div>

                            {/* Informations du produit */}
                            <div className='p-6'>
                                <h3 className='text-xl font-bold text-gray-900 mb-2 line-clamp-1'>
                                    {product.name}
                                </h3>
                                <p className='text-2xl font-bold text-[#C29F75] mb-4'>
                                    €{product.price}
                                </p>

                                {/* Statistiques */}
                                <div className='space-y-3'>
                                    <div className='flex items-center justify-between pb-3 border-b border-gray-100'>
                                        <span className='text-sm text-gray-600'>Total Sales</span>
                                        <span className='text-lg font-bold text-gray-900'>{product.sales}</span>
                                    </div>
                                    <div className='flex items-center justify-between pb-3 border-b border-gray-100'>
                                        <span className='text-sm text-gray-600'>Revenue</span>
                                        <span className='text-lg font-bold text-green-600'>€{product.revenue}</span>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-sm text-gray-600'>Category</span>
                                        <span className='text-sm font-medium text-gray-900'>
                                            {product.category || 'N/A'}
                                        </span>
                                    </div>
                                </div>

                                {/* Barre de progression */}
                                <div className='mt-4'>
                                    <div className='flex justify-between text-xs text-gray-600 mb-1'>
                                        <span>Stock Status</span>
                                        <span>In Stock</span>
                                    </div>
                                    <div className='w-full bg-gray-200 rounded-full h-2'>
                                        <div
                                            className='bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full'
                                            style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Summary Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className='mt-8 bg-white rounded-2xl shadow-lg p-6'
                >
                    <h2 className='text-2xl font-bold text-gray-900 mb-6'>Performance Overview</h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        <div className='text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl'>
                            <p className='text-sm text-gray-600 mb-2'>Total Units Sold</p>
                            <p className='text-4xl font-bold text-blue-600'>
                                {bestSellers.reduce((sum, p) => sum + p.sales, 0)}
                            </p>
                        </div>
                        <div className='text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl'>
                            <p className='text-sm text-gray-600 mb-2'>Total Revenue</p>
                            <p className='text-4xl font-bold text-green-600'>
                                €{bestSellers.reduce((sum, p) => sum + parseFloat(p.revenue), 0).toFixed(2)}
                            </p>
                        </div>
                        <div className='text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl'>
                            <p className='text-sm text-gray-600 mb-2'>Average Sale Price</p>
                            <p className='text-4xl font-bold text-purple-600'>
                                €{bestSellers.length > 0 
                                    ? (bestSellers.reduce((sum, p) => sum + parseFloat(p.price), 0) / bestSellers.length).toFixed(2)
                                    : '0.00'
                                }
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default CJBestSellers;
