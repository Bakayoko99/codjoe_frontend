import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCodjoeData } from '../context/CodjoeContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
    const { setUserLoginData } = useCodjoeData();
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
        }

        return newErrors;
    };

    const loginUser = async (e) => {
        e.preventDefault();

        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        };

        const validationErrors = validate(data);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setUserLoginData(data);
    }

    const fieldClass = (hasError) =>
        `w-full rounded-2xl bg-gray-50 border px-4 py-3 outline-none focus:ring-2 transition-all placeholder:text-gray-400 text-black ${
            hasError
                ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-200 focus:border-codjoe-biscuit focus:ring-codjoe-biscuit/20'
        }`;

    return (
        <div className='bg-gradient-to-br from-gray-50 to-gray-100 text-black min-h-screen flex items-center justify-center pt-20 px-4'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='w-full max-w-md'
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className='font-bold text-4xl md:text-5xl mb-3 text-gray-900'
                    >
                        Bon retour
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className='text-gray-600 text-sm md:text-base'
                    >
                        Connectez-vous pour accéder à vos commandes, favoris et plus encore
                    </motion.p>
                </div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onSubmit={loginUser}
                    className="bg-white rounded-3xl shadow-xl p-8 space-y-5"
                    aria-label="Formulaire de connexion"
                    noValidate
                >
                    <div>
                        <label htmlFor="login-email" className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
                        <input
                            id="login-email"
                            name="email"
                            type="email"
                            required
                            aria-required="true"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'login-email-error' : undefined}
                            autoComplete="email"
                            className={fieldClass(errors.email)}
                            placeholder="vous@exemple.com"
                        />
                        {errors.email && (
                            <p id="login-email-error" className='mt-1 text-sm text-red-600'>{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="login-password" className='block text-sm font-medium text-gray-700 mb-2'>Mot de passe</label>
                        <input
                            id="login-password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            aria-required="true"
                            aria-invalid={!!errors.password}
                            aria-describedby={errors.password ? 'login-password-error' : undefined}
                            className={fieldClass(errors.password)}
                            placeholder="••••••••••"
                        />
                        {errors.password && (
                            <p id="login-password-error" className='mt-1 text-sm text-red-600'>{errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        aria-label="Se connecter"
                        className="w-full rounded-2xl bg-codjoe-biscuit hover:bg-codjoe-biscuit/90 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        Se connecter
                    </button>

                    <div className="text-center pt-4">
                        <p className="text-sm text-gray-600">
                            Vous n&apos;avez pas de compte ?{' '}
                            <Link className='text-codjoe-biscuit font-semibold hover:underline' to={'/signup'}>
                                Créer un compte
                            </Link>
                        </p>
                    </div>
                </motion.form>
            </motion.div>
        </div>
    );
}

export default Login;
