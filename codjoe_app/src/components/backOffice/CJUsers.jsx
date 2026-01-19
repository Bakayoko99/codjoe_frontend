import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCodjoeData } from '../../context/CodjoeContext';

const CJUsers = () => {
    const [users, setUsers] = useState([
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            role: 'user',
            orders: 5,
            totalSpent: 299.95,
            createdAt: '2024-01-15',
            country: 'USA',
            birthday: '1990-05-15'
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane@example.com',
            role: 'user',
            orders: 12,
            totalSpent: 645.50,
            createdAt: '2023-12-10',
            country: 'UK',
            birthday: '1988-09-20'
        },
        {
            id: 3,
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@codjoe.com',
            role: 'admin',
            orders: 0,
            totalSpent: 0,
            createdAt: '2023-11-01',
            country: 'France',
            birthday: '1985-03-12'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.lastName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setShowViewModal(true);
    };

    const handleDeleteUser = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
        setDeleteConfirmation('');
    };

    const confirmDelete = () => {
        if (deleteConfirmation.toLowerCase() === 'delete') {
            setUsers(users.filter(u => u.id !== selectedUser.id));
            setShowDeleteModal(false);
            setSelectedUser(null);
            setDeleteConfirmation('');
        }
    };

    return (
        <div className='w-full min-h-[87.7vh] bg-gradient-to-br from-gray-50 to-gray-100 p-6'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='mb-8'
                >
                    <h1 className='text-4xl font-bold text-gray-900 mb-2'>Users Management</h1>
                    <p className='text-gray-600'>Manage and monitor your customers</p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className='bg-white rounded-2xl shadow-lg p-6 mb-6'
                >
                    <div className='flex flex-col md:flex-row gap-4'>
                        <div className='flex-1'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Search</label>
                            <input
                                type='text'
                                placeholder='Search by name or email...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C29F75] focus:border-transparent bg-gray-100'
                            />
                        </div>
                        <div className='md:w-48'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Filter by Role</label>
                            <select
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                                className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C29F75] focus:border-transparent bg-gray-100'
                            >
                                <option value='all'>All Roles</option>
                                <option value='user'>Users</option>
                                <option value='admin'>Admins</option>
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* Users Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className='bg-white rounded-2xl shadow-lg overflow-hidden'
                >
                    <div className='overflow-x-auto'>
                        <table className='w-full'>
                            <thead className='bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200'>
                                <tr>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                                        User
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                                        Email
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                                        Role
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                                        Orders
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                                        Total Spent
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                                        Joined
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-200'>
                                {filteredUsers.map((user, index) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className='hover:bg-gray-50 transition-colors'
                                    >
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='flex items-center'>
                                                <div className='w-10 h-10 bg-gradient-to-br from-[#C29F75] to-[#B8956A] rounded-full flex items-center justify-center text-white font-bold'>
                                                    {user.firstName[0]}{user.lastName[0]}
                                                </div>
                                                <div className='ml-4'>
                                                    <div className='text-sm font-medium text-gray-900'>
                                                        {user.firstName} {user.lastName}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='text-sm text-gray-900'>{user.email}</div>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                user.role === 'admin'
                                                    ? 'bg-purple-100 text-purple-800'
                                                    : 'bg-green-100 text-green-800'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                            {user.orders}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900'>
                                            €{user.totalSpent.toFixed(2)}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                            {new Date(user.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                            <button 
                                                onClick={() => handleViewUser(user)}
                                                className='text-[#C29F75] hover:text-[#B8956A] mr-3 font-semibold transition-colors duration-200'
                                            >
                                                👁️ View
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteUser(user)}
                                                className='text-red-600 hover:text-red-900 font-semibold transition-colors duration-200'
                                            >
                                                🗑️ Delete
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredUsers.length === 0 && (
                        <div className='text-center py-12'>
                            <span className='text-6xl'>👥</span>
                            <p className='text-gray-500 mt-4'>No users found</p>
                        </div>
                    )}
                </motion.div>

                {/* Summary Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'
                >
                    <div className='bg-white rounded-xl shadow-lg p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm text-gray-600'>Total Users</p>
                                <p className='text-2xl font-bold text-gray-900'>{users.length}</p>
                            </div>
                            <span className='text-4xl'>👥</span>
                        </div>
                    </div>
                    <div className='bg-white rounded-xl shadow-lg p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm text-gray-600'>Total Orders</p>
                                <p className='text-2xl font-bold text-gray-900'>
                                    {users.reduce((sum, user) => sum + user.orders, 0)}
                                </p>
                            </div>
                            <span className='text-4xl'>🛍️</span>
                        </div>
                    </div>
                    <div className='bg-white rounded-xl shadow-lg p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm text-gray-600'>Total Revenue</p>
                                <p className='text-2xl font-bold text-gray-900'>
                                    €{users.reduce((sum, user) => sum + user.totalSpent, 0).toFixed(2)}
                                </p>
                            </div>
                            <span className='text-4xl'>💰</span>
                        </div>
                    </div>
                </motion.div>

                {/* Modal View User */}
                <AnimatePresence>
                    {showViewModal && selectedUser && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'
                            onClick={() => setShowViewModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className='bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header */}
                                <div className='bg-gradient-to-r from-[#C29F75] to-[#B8956A] p-6 rounded-t-2xl'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-4'>
                                            <div className='w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#C29F75] font-bold text-2xl'>
                                                {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                                            </div>
                                            <div>
                                                <h2 className='text-2xl font-bold text-white'>
                                                    {selectedUser.firstName} {selectedUser.lastName}
                                                </h2>
                                                <span className={`px-3 py-1 mt-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    selectedUser.role === 'admin'
                                                        ? 'bg-purple-100 text-purple-800'
                                                        : 'bg-green-100 text-green-800'
                                                }`}>
                                                    {selectedUser.role}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setShowViewModal(false)}
                                            className='text-white hover:text-gray-200 transition-colors'
                                        >
                                            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className='p-6 space-y-6'>
                                    {/* Contact Information */}
                                    <div>
                                        <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                                            📧 Contact Information
                                        </h3>
                                        <div className='bg-gray-50 rounded-xl p-4 space-y-3'>
                                            <div className='flex justify-between'>
                                                <span className='text-gray-600'>Email:</span>
                                                <span className='font-medium text-gray-900'>{selectedUser.email}</span>
                                            </div>
                                            <div className='flex justify-between'>
                                                <span className='text-gray-600'>Country:</span>
                                                <span className='font-medium text-gray-900'>{selectedUser.country}</span>
                                            </div>
                                            <div className='flex justify-between'>
                                                <span className='text-gray-600'>Birthday:</span>
                                                <span className='font-medium text-gray-900'>
                                                    {new Date(selectedUser.birthday).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Account Statistics */}
                                    <div>
                                        <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                                            📊 Account Statistics
                                        </h3>
                                        <div className='grid grid-cols-3 gap-4'>
                                            <div className='bg-blue-50 rounded-xl p-4 text-center'>
                                                <p className='text-2xl font-bold text-blue-600'>{selectedUser.orders}</p>
                                                <p className='text-sm text-gray-600 mt-1'>Orders</p>
                                            </div>
                                            <div className='bg-green-50 rounded-xl p-4 text-center'>
                                                <p className='text-2xl font-bold text-green-600'>€{selectedUser.totalSpent.toFixed(2)}</p>
                                                <p className='text-sm text-gray-600 mt-1'>Total Spent</p>
                                            </div>
                                            <div className='bg-purple-50 rounded-xl p-4 text-center'>
                                                <p className='text-2xl font-bold text-purple-600'>
                                                    {Math.floor((new Date() - new Date(selectedUser.createdAt)) / (1000 * 60 * 60 * 24))}
                                                </p>
                                                <p className='text-sm text-gray-600 mt-1'>Days Active</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Member Since */}
                                    <div>
                                        <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                                            📅 Account Details
                                        </h3>
                                        <div className='bg-gray-50 rounded-xl p-4'>
                                            <div className='flex justify-between'>
                                                <span className='text-gray-600'>Member Since:</span>
                                                <span className='font-medium text-gray-900'>
                                                    {new Date(selectedUser.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className='bg-gray-50 p-6 rounded-b-2xl flex justify-end gap-3'>
                                    <button
                                        onClick={() => setShowViewModal(false)}
                                        className='px-6 py-2 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors'
                                    >
                                        Close
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Modal Delete User */}
                <AnimatePresence>
                    {showDeleteModal && selectedUser && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'
                            onClick={() => setShowDeleteModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className='bg-white rounded-2xl shadow-2xl max-w-md w-full'
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header with warning icon */}
                                <div className='p-6'>
                                    <div className='flex items-center gap-4'>
                                        <div className='w-12 h-12 rounded-full bg-red-100 flex items-center justify-center'>
                                            <svg className='w-6 h-6 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className='text-xl font-bold text-gray-900'>Delete User</h3>
                                            <p className='text-sm text-gray-500 mt-1'>This action cannot be undone</p>
                                        </div>
                                    </div>

                                    <div className='mt-6 bg-red-50 border border-red-200 rounded-xl p-4'>
                                        <p className='text-sm text-red-800'>
                                            You are about to delete <span className='font-bold'>{selectedUser.firstName} {selectedUser.lastName}</span> ({selectedUser.email}).
                                            All associated data will be permanently removed.
                                        </p>
                                    </div>

                                    <div className='mt-6'>
                                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                            Type <span className='text-red-600 font-mono'>DELETE</span> to confirm
                                        </label>
                                        <input
                                            type='text'
                                            value={deleteConfirmation}
                                            onChange={(e) => setDeleteConfirmation(e.target.value)}
                                            className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent'
                                            placeholder='Type DELETE'
                                        />
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className='bg-gray-50 p-6 rounded-b-2xl flex justify-end gap-3'>
                                    <button
                                        onClick={() => setShowDeleteModal(false)}
                                        className='px-6 py-2 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors'
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        disabled={deleteConfirmation.toLowerCase() !== 'delete'}
                                        className={`px-6 py-2 rounded-xl font-semibold text-white transition-all ${
                                            deleteConfirmation.toLowerCase() === 'delete'
                                                ? 'bg-red-600 hover:bg-red-700 cursor-pointer'
                                                : 'bg-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        Delete User
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default CJUsers;
