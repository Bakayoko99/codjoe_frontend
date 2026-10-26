import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCodjoeData } from '../../context/CodjoeContext';

const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const STATUS_LABELS = {
    pending: 'En attente',
    processing: 'En préparation',
    shipped: 'Expédiée',
    delivered: 'Livrée',
    cancelled: 'Annulée'
};

const STATUS_COLORS = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
};

const CJOrders = () => {
    const { fetchAllOrders, changeOrderStatus, showAlert } = useCodjoeData();

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [updatingId, setUpdatingId] = useState(null);

    const loadOrders = async () => {
        try {
            setIsLoading(true);
            const data = await fetchAllOrders();
            setOrders(data);
        } catch (error) {
            console.error('Erreur lors du chargement des commandes:', error);
            showAlert('Impossible de charger les commandes.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        setUpdatingId(orderId);
        try {
            await changeOrderStatus(orderId, newStatus);
            setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o)));
            showAlert('Statut de la commande mis à jour.', 'success');
        } catch (error) {
            const msg = error.response?.data?.message || 'Impossible de mettre à jour le statut.';
            showAlert(msg, 'error');
        } finally {
            setUpdatingId(null);
        }
    };

    const filteredOrders = orders.filter((order) => {
        const matchesSearch = (order.orderNumber || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const totalRevenue = orders
        .filter((o) => o.status !== 'cancelled')
        .reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0);

    return (
        <div className='w-full min-h-[87.7vh] bg-gradient-to-br from-gray-50 to-gray-100 p-6'>
            <div className='max-w-7xl mx-auto'>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='mb-8'
                >
                    <h1 className='text-4xl font-bold text-gray-900 mb-2'>Gestion des commandes</h1>
                    <p className='text-gray-600'>Suivez et mettez à jour le statut des commandes clients</p>
                </motion.div>

                {/* Filters */}
                <div className='bg-white rounded-2xl shadow-lg p-6 mb-6'>
                    <div className='flex flex-col md:flex-row gap-4'>
                        <div className='flex-1'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Rechercher</label>
                            <input
                                type='text'
                                placeholder='Rechercher par numéro de commande...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C29F75] focus:border-transparent bg-gray-100'
                            />
                        </div>
                        <div className='md:w-56'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Filtrer par statut</label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C29F75] focus:border-transparent bg-gray-100'
                            >
                                <option value='all'>Tous les statuts</option>
                                {STATUS_OPTIONS.map((s) => (
                                    <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Orders table */}
                <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
                    {isLoading ? (
                        <div className='flex flex-col items-center justify-center py-20'>
                            <div className="w-16 h-16 border-4 border-gray-200 border-t-[#C29F75] rounded-full animate-spin mb-4"></div>
                            <p className='text-gray-600'>Chargement des commandes...</p>
                        </div>
                    ) : (
                        <div className='overflow-x-auto'>
                            <table className='w-full'>
                                <thead className='bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200'>
                                    <tr>
                                        <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Commande</th>
                                        <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Date</th>
                                        <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Articles</th>
                                        <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Total</th>
                                        <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Statut</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200'>
                                    {filteredOrders.map((order) => (
                                        <tr key={order._id} className='hover:bg-gray-50 transition-colors'>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                                                {order.orderNumber}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                                {new Date(order.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                                {order.items?.length || 0}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900'>
                                                €{(parseFloat(order.total) || 0).toFixed(2)}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <select
                                                    value={order.status}
                                                    disabled={updatingId === order._id}
                                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                    className={`px-3 py-1.5 text-xs leading-5 font-semibold rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-[#C29F75] cursor-pointer ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-800'}`}
                                                >
                                                    {STATUS_OPTIONS.map((s) => (
                                                        <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {filteredOrders.length === 0 && (
                                <div className='text-center py-12'>
                                    <span className='text-6xl'>🛍️</span>
                                    <p className='text-gray-500 mt-4'>Aucune commande trouvée</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Summary */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                    <div className='bg-white rounded-xl shadow-lg p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm text-gray-600'>Total des commandes</p>
                                <p className='text-2xl font-bold text-gray-900'>{orders.length}</p>
                            </div>
                            <span className='text-4xl'>🛍️</span>
                        </div>
                    </div>
                    <div className='bg-white rounded-xl shadow-lg p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm text-gray-600'>Chiffre d&apos;affaires</p>
                                <p className='text-2xl font-bold text-gray-900'>€{totalRevenue.toFixed(2)}</p>
                            </div>
                            <span className='text-4xl'>💰</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CJOrders;
