import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Alert = ({ show, message, type = 'error', onClose }) => {
    const types = {
        error: {
            bg: 'bg-red-50',
            border: 'border-red-200',
            text: 'text-red-800',
            icon: '❌',
            iconBg: 'bg-red-100'
        },
        success: {
            bg: 'bg-green-50',
            border: 'border-green-200',
            text: 'text-green-800',
            icon: '✅',
            iconBg: 'bg-green-100'
        },
        warning: {
            bg: 'bg-yellow-50',
            border: 'border-yellow-200',
            text: 'text-yellow-800',
            icon: '⚠️',
            iconBg: 'bg-yellow-100'
        },
        info: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-blue-800',
            icon: 'ℹ️',
            iconBg: 'bg-blue-100'
        }
    };

    const style = types[type] || types.error;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
                >
                    <div className={`${style.bg} ${style.border} border-2 rounded-2xl shadow-2xl p-4 flex items-start gap-4`}>
                        <div className={`${style.iconBg} rounded-full p-2 flex-shrink-0`}>
                            <span className="text-2xl">{style.icon}</span>
                        </div>
                        <div className="flex-1 pt-1">
                            <p className={`${style.text} font-semibold text-sm md:text-base`}>
                                {message}
                            </p>
                        </div>
                        {onClose && (
                            <button
                                onClick={onClose}
                                className={`${style.text} hover:opacity-70 transition-opacity flex-shrink-0 p-1`}
                                aria-label="Close alert"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Alert;
