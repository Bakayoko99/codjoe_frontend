import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCodjoeData } from '../../context/CodjoeContext';
import axios from 'axios';

const CJStats = () => {
    const { products, userCart } = useCodjoeData();
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        totalUsers: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Simuler le chargement des stats
                setStats({
                    totalProducts: products.length || 0,
                    totalOrders: 45, // À remplacer par une vraie requête API
                    totalRevenue: 12450.99,
                    totalUsers: 128
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching stats:', error);
                setLoading(false);
            }
        };

        fetchStats();
    }, [products]);

    const statCards = [
        {
            title: 'Total Products',
            value: stats.totalProducts,
            icon: '📦',
            color: 'from-blue-500 to-blue-600',
            change: '+12%'
        },
        {
            title: 'Total Orders',
            value: stats.totalOrders,
            icon: '🛍️',
            color: 'from-green-500 to-green-600',
            change: '+23%'
        },
        {
            title: 'Revenue',
            value: `€${stats.totalRevenue.toLocaleString()}`,
            icon: '💰',
            color: 'from-purple-500 to-purple-600',
            change: '+18%'
        },
        {
            title: 'Total Users',
            value: stats.totalUsers,
            icon: '👥',
            color: 'from-orange-500 to-orange-600',
            change: '+8%'
        }
    ];

    return (
        <div className='w-full min-h-[87.7vh] bg-gradient-to-br from-gray-50 to-gray-100 p-6'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='mb-8'
                >
                    <h1 className='text-4xl font-bold text-gray-900 mb-2'>Dashboard</h1>
                    <p className='text-gray-600'>Overview of your store performance</p>
                </motion.div>

                {/* Stats Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                    {statCards.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
                        >
                            <div className='flex items-center justify-between mb-4'>
                                <span className='text-4xl'>{stat.icon}</span>
                                <span className='text-xs bg-white/20 px-2 py-1 rounded-full'>
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className='text-lg font-medium opacity-90 mb-1'>{stat.title}</h3>
                            <p className='text-3xl font-bold'>{stat.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className='bg-white rounded-2xl shadow-lg p-6'
                >
                    <h2 className='text-2xl font-bold text-gray-900 mb-6'>Recent Activity</h2>
                    <div className='space-y-4'>
                        {[
                            { action: 'New order', detail: 'Order #ORD-20260118-0001', time: '2 minutes ago', icon: '🛍️', color: 'bg-green-100 text-green-600' },
                            { action: 'Product added', detail: 'New Hoodie Collection', time: '1 hour ago', icon: '📦', color: 'bg-blue-100 text-blue-600' },
                            { action: 'New user', detail: 'john@example.com', time: '3 hours ago', icon: '👤', color: 'bg-purple-100 text-purple-600' },
                            { action: 'Order shipped', detail: 'Order #ORD-20260117-0045', time: '5 hours ago', icon: '🚚', color: 'bg-orange-100 text-orange-600' }
                        ].map((activity, index) => (
                            <div key={index} className='flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors'>
                                <div className={`w-12 h-12 ${activity.color} rounded-full flex items-center justify-center text-2xl`}>
                                    {activity.icon}
                                </div>
                                <div className='flex-1'>
                                    <p className='font-semibold text-gray-900'>{activity.action}</p>
                                    <p className='text-sm text-gray-600'>{activity.detail}</p>
                                </div>
                                <span className='text-xs text-gray-500'>{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default CJStats;
