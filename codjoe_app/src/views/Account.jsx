import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCodjoeData } from '../context/CodjoeContext';
import SEO from '../components/SEO';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Account = () => {
    const { getMyProfile, updateMyProfile, deleteMyAccount, exportMyData, showAlert } = useCodjoeData();

    const [profile, setProfile] = useState(null);
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', address: '', country: '', birthday: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await getMyProfile();
                setProfile(data);
                setForm({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    email: data.email || '',
                    address: data.address || '',
                    country: data.country || '',
                    birthday: data.birthday ? data.birthday.slice(0, 10) : ''
                });
            } catch (error) {
                console.error('Erreur lors du chargement du profil:', error);
                showAlert('Impossible de charger votre profil.', 'error');
            } finally {
                setIsLoading(false);
            }
        };
        loadProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!form.firstName.trim()) newErrors.firstName = 'Le prénom est obligatoire.';
        if (!form.lastName.trim()) newErrors.lastName = 'Le nom est obligatoire.';
        if (!form.email.trim()) {
            newErrors.email = "L'adresse email est obligatoire.";
        } else if (!EMAIL_REGEX.test(form.email.trim())) {
            newErrors.email = "Le format de l'adresse email est invalide.";
        }
        if (!form.country.trim()) newErrors.country = 'Le pays est obligatoire.';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        setIsSaving(true);
        try {
            const res = await updateMyProfile(form);
            setProfile(res.data);
            showAlert('Votre profil a été mis à jour avec succès.', 'success');
        } catch (error) {
            const msg = error.response?.data?.message || "Impossible de mettre à jour le profil.";
            showAlert(msg, 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleExportData = async () => {
        try {
            const data = await exportMyData();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'mes-donnees-codjoe.json';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            showAlert('Vos données personnelles ont été téléchargées.', 'success');
        } catch (error) {
            showAlert("Impossible d'exporter vos données.", 'error');
        }
    };

    const handleDeleteAccount = async () => {
        if (deleteConfirmation.toLowerCase() !== 'supprimer') return;
        setIsDeleting(true);
        try {
            await deleteMyAccount();
            showAlert('Votre compte a été supprimé.', 'success');
        } catch (error) {
            showAlert('Impossible de supprimer votre compte.', 'error');
            setIsDeleting(false);
        }
    };

    const fieldClass = (hasError) =>
        `w-full rounded-xl bg-gray-50 border px-4 py-3 outline-none focus:ring-2 transition-all text-black ${
            hasError
                ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-200 focus:border-codjoe-biscuit focus:ring-codjoe-biscuit/20'
        }`;

    if (isLoading) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20 flex items-center justify-center'>
                <div className="w-16 h-16 border-4 border-gray-200 border-t-[#C29F75] rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            <SEO
                title="Mon compte - CODJOE"
                description="Gérez les informations de votre compte CODJOE : coordonnées, données personnelles et suppression de compte."
                robots="noindex, nofollow"
            />
            <div className='min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20 pb-16 px-4'>
                <div className='max-w-3xl mx-auto'>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='mb-8'
                    >
                        <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>Mon compte</h1>
                        <p className='text-gray-600'>
                            Consultez, modifiez vos informations personnelles ou exercez vos droits RGPD.
                        </p>
                    </motion.div>

                    {/* Informations personnelles */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8'
                    >
                        <h2 className='text-xl font-bold text-gray-900 mb-6'>Informations personnelles</h2>
                        <form onSubmit={handleSubmit} noValidate className='space-y-5'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div>
                                    <label htmlFor="account-firstName" className='block text-sm font-medium text-gray-700 mb-2'>Prénom</label>
                                    <input
                                        id="account-firstName"
                                        name="firstName"
                                        type="text"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        className={fieldClass(errors.firstName)}
                                    />
                                    {errors.firstName && <p className='mt-1 text-sm text-red-600'>{errors.firstName}</p>}
                                </div>
                                <div>
                                    <label htmlFor="account-lastName" className='block text-sm font-medium text-gray-700 mb-2'>Nom</label>
                                    <input
                                        id="account-lastName"
                                        name="lastName"
                                        type="text"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        className={fieldClass(errors.lastName)}
                                    />
                                    {errors.lastName && <p className='mt-1 text-sm text-red-600'>{errors.lastName}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="account-email" className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
                                <input
                                    id="account-email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className={fieldClass(errors.email)}
                                />
                                {errors.email && <p className='mt-1 text-sm text-red-600'>{errors.email}</p>}
                                {profile && !profile.emailVerified && (
                                    <p className='mt-1 text-xs text-amber-600'>Cette adresse email n&apos;est pas encore vérifiée.</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="account-address" className='block text-sm font-medium text-gray-700 mb-2'>Adresse</label>
                                <input
                                    id="account-address"
                                    name="address"
                                    type="text"
                                    value={form.address}
                                    onChange={handleChange}
                                    className={fieldClass(errors.address)}
                                    placeholder="Numéro, rue, ville"
                                />
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div>
                                    <label htmlFor="account-country" className='block text-sm font-medium text-gray-700 mb-2'>Pays</label>
                                    <input
                                        id="account-country"
                                        name="country"
                                        type="text"
                                        value={form.country}
                                        onChange={handleChange}
                                        className={fieldClass(errors.country)}
                                    />
                                    {errors.country && <p className='mt-1 text-sm text-red-600'>{errors.country}</p>}
                                </div>
                                <div>
                                    <label htmlFor="account-birthday" className='block text-sm font-medium text-gray-700 mb-2'>Date de naissance</label>
                                    <input
                                        id="account-birthday"
                                        name="birthday"
                                        type="date"
                                        value={form.birthday}
                                        onChange={handleChange}
                                        className={fieldClass(errors.birthday)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSaving}
                                className='bg-[#C29F75] hover:bg-[#B8956A] disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg'
                            >
                                {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                            </button>
                        </form>
                    </motion.div>

                    {/* RGPD */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className='bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8'
                    >
                        <h2 className='text-xl font-bold text-gray-900 mb-2'>Vos données personnelles (RGPD)</h2>
                        <p className='text-gray-600 text-sm mb-6'>
                            Conformément au RGPD, vous pouvez à tout moment télécharger une copie de vos données personnelles.
                        </p>
                        <button
                            onClick={handleExportData}
                            className='bg-white border-2 border-gray-200 hover:border-[#C29F75] text-gray-700 hover:text-[#C29F75] font-semibold px-6 py-3 rounded-xl transition-all duration-300'
                        >
                            Télécharger mes données
                        </button>
                    </motion.div>

                    {/* Suppression de compte */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className='bg-red-50 border border-red-200 rounded-2xl p-6 sm:p-8'
                    >
                        <h2 className='text-xl font-bold text-red-900 mb-2'>Supprimer mon compte</h2>
                        <p className='text-red-700 text-sm mb-6'>
                            Cette action est irréversible. Toutes vos données personnelles et votre historique seront définitivement supprimés (droit à l&apos;oubli).
                        </p>
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className='bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300'
                        >
                            Supprimer mon compte
                        </button>
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {showDeleteModal && (
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
                            className='bg-white rounded-2xl shadow-2xl max-w-md w-full p-6'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className='text-xl font-bold text-gray-900 mb-2'>Confirmer la suppression</h3>
                            <p className='text-sm text-gray-600 mb-4'>
                                Cette action est définitive. Tapez <span className='font-mono font-bold'>SUPPRIMER</span> pour confirmer.
                            </p>
                            <input
                                type='text'
                                value={deleteConfirmation}
                                onChange={(e) => setDeleteConfirmation(e.target.value)}
                                className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 mb-4'
                                placeholder='Tapez SUPPRIMER'
                            />
                            <div className='flex justify-end gap-3'>
                                <button
                                    onClick={() => { setShowDeleteModal(false); setDeleteConfirmation(''); }}
                                    className='px-5 py-2 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50'
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={deleteConfirmation.toLowerCase() !== 'supprimer' || isDeleting}
                                    className={`px-5 py-2 rounded-xl font-semibold text-white transition-all ${
                                        deleteConfirmation.toLowerCase() === 'supprimer' && !isDeleting
                                            ? 'bg-red-600 hover:bg-red-700'
                                            : 'bg-gray-400 cursor-not-allowed'
                                    }`}
                                >
                                    {isDeleting ? 'Suppression...' : 'Supprimer définitivement'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Account;
