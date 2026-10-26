import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCodjoeData } from '../context/CodjoeContext';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{10,128}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Signup = () => {
    const { setUserSignupData } = useCodjoeData();
    const [errors, setErrors] = useState({});

    const validate = (data) => {
        const newErrors = {};

        if (!data.email.trim()) {
            newErrors.email = "L'adresse email est obligatoire.";
        } else if (!EMAIL_REGEX.test(data.email.trim())) {
            newErrors.email = "Le format de l'adresse email est invalide.";
        }

        if (!data.password) {
            newErrors.password = 'Le mot de passe est obligatoire.';
        } else if (!PASSWORD_REGEX.test(data.password)) {
            newErrors.password = 'Le mot de passe doit contenir au moins 10 caractères, avec une majuscule, une minuscule, un chiffre et un caractère spécial.';
        }

        if (!data.confirmPsw) {
            newErrors.confirmPsw = 'Veuillez confirmer votre mot de passe.';
        } else if (data.password !== data.confirmPsw) {
            newErrors.confirmPsw = 'Les mots de passe ne correspondent pas.';
        }

        if (!data.firstName.trim()) newErrors.firstName = 'Le prénom est obligatoire.';
        if (!data.lastName.trim()) newErrors.lastName = 'Le nom est obligatoire.';
        if (!data.country.trim()) newErrors.country = 'Le pays est obligatoire.';
        if (!data.birthday) newErrors.birthday = 'La date de naissance est obligatoire.';

        return newErrors;
    };

    const signupUser = async (e) => {
        e.preventDefault();

        const data = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            password: e.target.password.value,
            confirmPsw: e.target.confirmPsw.value,
            country: e.target.country.value,
            birthday: e.target.birthday.value
        };

        const validationErrors = validate(data);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setUserSignupData({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            country: data.country,
            birthday: data.birthday
        });
    }

    const fieldClass = (hasError) =>
        `w-full rounded-2xl bg-gray-50 border px-4 py-3 outline-none focus:ring-2 transition-all placeholder:text-gray-400 text-black ${
            hasError
                ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-200 focus:border-codjoe-biscuit focus:ring-codjoe-biscuit/20'
        }`;

    return (
        <div className='bg-gradient-to-br from-gray-50 to-gray-100 text-black min-h-screen flex items-center justify-center pt-20 pb-10 px-4'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='w-full max-w-lg'
            >
                <div className='text-center mb-8'>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className='inline-block mb-6'
                    >
                        <div className='w-16 h-16 bg-codjoe-biscuit rounded-full flex items-center justify-center shadow-lg'>
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className='font-bold text-4xl md:text-5xl mb-3 text-gray-900'
                    >
                        Rejoignez CODJOE
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className='text-gray-600 text-sm md:text-base'
                    >
                        Créez votre compte pour commencer vos achats
                    </motion.p>
                </div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onSubmit={signupUser}
                    className="bg-white rounded-3xl shadow-xl p-8 space-y-4"
                    aria-label="Formulaire d'inscription"
                    noValidate
                >
                    <div>
                        <label htmlFor="signup-email" className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
                        <input
                            id="signup-email"
                            name="email"
                            type="email"
                            required
                            aria-required="true"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'signup-email-error' : undefined}
                            autoComplete="email"
                            className={fieldClass(errors.email)}
                            placeholder="vous@exemple.com"
                        />
                        {errors.email && (
                            <p id="signup-email-error" className='mt-1 text-sm text-red-600'>{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="signup-password" className='block text-sm font-medium text-gray-700 mb-2'>Mot de passe</label>
                        <input
                            id="signup-password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            aria-required="true"
                            aria-invalid={!!errors.password}
                            aria-describedby="signup-password-hint"
                            className={fieldClass(errors.password)}
                            placeholder="••••••••••"
                        />
                        <p id="signup-password-hint" className='mt-1 text-xs text-gray-500'>
                            Au moins 10 caractères, avec une majuscule, une minuscule, un chiffre et un caractère spécial.
                        </p>
                        {errors.password && (
                            <p className='mt-1 text-sm text-red-600'>{errors.password}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="signup-confirm-password" className='block text-sm font-medium text-gray-700 mb-2'>Confirmer le mot de passe</label>
                        <input
                            id="signup-confirm-password"
                            name="confirmPsw"
                            type="password"
                            autoComplete="new-password"
                            required
                            aria-required="true"
                            aria-invalid={!!errors.confirmPsw}
                            className={fieldClass(errors.confirmPsw)}
                            placeholder="••••••••••"
                        />
                        {errors.confirmPsw && (
                            <p className='mt-1 text-sm text-red-600'>{errors.confirmPsw}</p>
                        )}
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label htmlFor="signup-firstname" className='block text-sm font-medium text-gray-700 mb-2'>Prénom</label>
                            <input
                                id="signup-firstname"
                                name="firstName"
                                type="text"
                                required
                                aria-required="true"
                                aria-invalid={!!errors.firstName}
                                autoComplete="given-name"
                                className={fieldClass(errors.firstName)}
                                placeholder="Jean"
                            />
                            {errors.firstName && (
                                <p className='mt-1 text-sm text-red-600'>{errors.firstName}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="signup-lastname" className='block text-sm font-medium text-gray-700 mb-2'>Nom</label>
                            <input
                                id="signup-lastname"
                                name="lastName"
                                type="text"
                                required
                                aria-required="true"
                                aria-invalid={!!errors.lastName}
                                autoComplete="family-name"
                                className={fieldClass(errors.lastName)}
                                placeholder="Dupont"
                            />
                            {errors.lastName && (
                                <p className='mt-1 text-sm text-red-600'>{errors.lastName}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="signup-country" className='block text-sm font-medium text-gray-700 mb-2'>Pays</label>
                            <input
                                id="signup-country"
                                name="country"
                                type="text"
                                required
                                aria-required="true"
                                aria-invalid={!!errors.country}
                                autoComplete="country-name"
                                className={fieldClass(errors.country)}
                                placeholder="France"
                            />
                            {errors.country && (
                                <p className='mt-1 text-sm text-red-600'>{errors.country}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="signup-birthday" className='block text-sm font-medium text-gray-700 mb-2'>Date de naissance</label>
                            <input
                                id="signup-birthday"
                                name="birthday"
                                type="date"
                                required
                                aria-required="true"
                                aria-invalid={!!errors.birthday}
                                autoComplete="bday"
                                className={fieldClass(errors.birthday)}
                            />
                            {errors.birthday && (
                                <p className='mt-1 text-sm text-red-600'>{errors.birthday}</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        aria-label="Créer mon compte"
                        className="w-full rounded-2xl bg-codjoe-biscuit hover:bg-codjoe-biscuit/90 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 mt-6"
                    >
                        Créer mon compte
                    </button>

                    <div className="text-center pt-4">
                        <p className="text-sm text-gray-600">
                            Vous avez déjà un compte ?{' '}
                            <Link className='text-codjoe-biscuit font-semibold hover:underline' to={'/login'}>
                                Se connecter
                            </Link>
                        </p>
                    </div>
                </motion.form>
            </motion.div>
        </div>
    );
}

export default Signup;
