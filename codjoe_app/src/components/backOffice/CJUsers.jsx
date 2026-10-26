import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCodjoeData } from '../../context/CodjoeContext';

const CJUsers = () => {
    const { fetchAllUsers, changeUserRole, deleteUserByAdmin, showAlert } = useCodjoeData();

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const loadUsers = async () => {
        try {
            setIsLoading(true);
            const data = await fetchAllUsers();
            setUsers(data);
        } catch (error) {
            console.error('Erreur lors du chargement des utilisateurs:', error);
            showAlert('Impossible de charger les utilisateurs.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const handleRoleChange = async (user, newRole) => {
        try {
            await changeUserRole(user._id, newRole);
            setUsers((prev) => prev.map((u) => (u._id === user._id ? { ...u, role: newRole } : u)));
            showAlert('Rôle mis à jour avec succès.', 'success');
        } catch (error) {
            showAlert('Impossible de mettre à jour le rôle.', 'error');
        }
    };

    const handleDeleteUser = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
        setDeleteConfirmation('');
    };

    const confirmDelete = async () => {
        if (deleteConfirmation.toLowerCase() !== 'supprimer') return;
        setIsDeleting(true);
        try {
            await deleteUserByAdmin(selectedUser._id);
            setUsers((prev) => prev.filter((u) => u._id !== selectedUser._id));
            showAlert('Utilisateur supprimé avec succès.', 'success');
            setShowDeleteModal(false);
            setSelectedUser(null);
            setDeleteConfirmation('');
        } catch (error) {
            showAlert("Impossible de supprimer l'utilisateur.", 'error');
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <div className='w-full min-h-[87.7vh] bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center'>
                <div className="w-16 h-16 border-4 border-gray-200 border-t-[#C29F75] rounded-full animate-spin mb-4"></div>
                <p className='text-gray-600'>Chargement des utilisateurs...</p>
            </div>
        );
    }

    return (
        <div className='w-full min-h-[87.7vh] bg-gradient-to-br from-gray-50 to-gray-100 p-6'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='mb-8'
                >
                    <h1 className='text-4xl font-bold text-gray-900 mb-2'>Gestion des utilisateurs</h1>
                    <p className='text-gray-600'>Gérez et suivez vos clients</p>
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
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Rechercher</label>
                            <input
                                type='text'
                                placeholder='Rechercher par nom ou email...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C29F75] focus:border-transparent bg-gray-100'
                            />
                        </div>
                        <div className='md:w-48'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Filtrer par rôle</label>
                            <select
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                                className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C29F75] focus:border-transparent bg-gray-100'
                            >
                                <option value='all'>Tous les rôles</option>
                                <option value='user'>Utilisateurs</option>
                                <option value='admin'>Administrateurs</option>
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
                                        Utilisateur
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                                        Email
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                                        Rôle
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                                        Inscrit le
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-200'>
                                {filteredUsers.map((user, index) => (
                                    <motion.tr
                                        key={user._id}
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
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user, e.target.value)}
                                                className={`px-3 py-1 text-xs leading-5 font-semibold rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-[#C29F75] cursor-pointer ${
                                                    user.role === 'admin'
                                                        ? 'bg-purple-100 text-purple-800'
                                                        : 'bg-green-100 text-green-800'
                                                }`}
                                            >
                                                <option value='user'>Utilisateur</option>
                                                <option value='admin'>Administrateur</option>
                                            </select>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                            {new Date(user.createdAt).toLocaleDateString('fr-FR', {
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
                                                👁️ Voir
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user)}
                                                className='text-red-600 hover:text-red-900 font-semibold transition-colors duration-200'
                                            >
                                                🗑️ Supprimer
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
                            <p className='text-gray-500 mt-4'>Aucun utilisateur trouvé</p>
                        </div>
                    )}
                </motion.div>

                {/* Summary Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'
                >
                    <div className='bg-white rounded-xl shadow-lg p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm text-gray-600'>Total utilisateurs</p>
                                <p className='text-2xl font-bold text-gray-900'>{users.length}</p>
                            </div>
                            <span className='text-4xl'>👥</span>
                        </div>
                    </div>
                    <div className='bg-white rounded-xl shadow-lg p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm text-gray-600'>Administrateurs</p>
                                <p className='text-2xl font-bold text-gray-900'>
                                    {users.filter((u) => u.role === 'admin').length}
                                </p>
                            </div>
                            <span className='text-4xl'>🛡️</span>
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
                                                    {selectedUser.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
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
                                            📧 Coordonnées
                                        </h3>
                                        <div className='bg-gray-50 rounded-xl p-4 space-y-3'>
                                            <div className='flex justify-between'>
                                                <span className='text-gray-600'>Email :</span>
                                                <span className='font-medium text-gray-900'>{selectedUser.email}</span>
                                            </div>
                                            <div className='flex justify-between'>
                                                <span className='text-gray-600'>Pays :</span>
                                                <span className='font-medium text-gray-900'>{selectedUser.country}</span>
                                            </div>
                                            <div className='flex justify-between'>
                                                <span className='text-gray-600'>Date de naissance :</span>
                                                <span className='font-medium text-gray-900'>
                                                    {selectedUser.birthday ? new Date(selectedUser.birthday).toLocaleDateString('fr-FR', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    }) : '—'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Member Since */}
                                    <div>
                                        <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                                            📅 Détails du compte
                                        </h3>
                                        <div className='bg-gray-50 rounded-xl p-4'>
                                            <div className='flex justify-between'>
                                                <span className='text-gray-600'>Membre depuis :</span>
                                                <span className='font-medium text-gray-900'>
                                                    {new Date(selectedUser.createdAt).toLocaleDateString('fr-FR', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                            <div className='flex justify-between mt-2'>
                                                <span className='text-gray-600'>Email vérifié :</span>
                                                <span className='font-medium text-gray-900'>
                                                    {selectedUser.emailVerified ? 'Oui' : 'Non'}
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
                                        Fermer
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
                                            <h3 className='text-xl font-bold text-gray-900'>Supprimer l&apos;utilisateur</h3>
                                            <p className='text-sm text-gray-500 mt-1'>Cette action est irréversible</p>
                                        </div>
                                    </div>

                                    <div className='mt-6 bg-red-50 border border-red-200 rounded-xl p-4'>
                                        <p className='text-sm text-red-800'>
                                            Vous êtes sur le point de supprimer <span className='font-bold'>{selectedUser.firstName} {selectedUser.lastName}</span> ({selectedUser.email}).
                                            Toutes les données associées seront définitivement supprimées.
                                        </p>
                                    </div>

                                    <div className='mt-6'>
                                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                            Tapez <span className='text-red-600 font-mono'>SUPPRIMER</span> pour confirmer
                                        </label>
                                        <input
                                            type='text'
                                            value={deleteConfirmation}
                                            onChange={(e) => setDeleteConfirmation(e.target.value)}
                                            className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent'
                                            placeholder='Tapez SUPPRIMER'
                                        />
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className='bg-gray-50 p-6 rounded-b-2xl flex justify-end gap-3'>
                                    <button
                                        onClick={() => setShowDeleteModal(false)}
                                        className='px-6 py-2 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors'
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        disabled={deleteConfirmation.toLowerCase() !== 'supprimer' || isDeleting}
                                        className={`px-6 py-2 rounded-xl font-semibold text-white transition-all ${
                                            deleteConfirmation.toLowerCase() === 'supprimer' && !isDeleting
                                                ? 'bg-red-600 hover:bg-red-700 cursor-pointer'
                                                : 'bg-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        {isDeleting ? 'Suppression...' : "Supprimer l'utilisateur"}
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
