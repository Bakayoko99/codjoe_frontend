import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CartItem = ({ 
    id,
    name, 
    price, 
    size, 
    quantity, 
    img, 
    onRemove, 
    onUpdateQuantity,
    onUpdateSize,
    availableSizes = ['S', 'M', 'L', 'XL', 'XXL']
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isEditingSize, setIsEditingSize] = useState(false);
    const [showSizeError, setShowSizeError] = useState(false);

    const handleQuantityChange = (delta) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1 && onUpdateQuantity) {
            onUpdateQuantity(id, size, newQuantity);
        }
    };

    const handleSizeChange = (newSize) => {
        if (newSize !== size && onUpdateSize) {
            onUpdateSize(id, size, newSize)
                .then(() => {
                    setIsEditingSize(false);
                    setShowSizeError(false);
                })
                .catch((error) => {
                    setShowSizeError(true);
                    setTimeout(() => setShowSizeError(false), 3000);
                });
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className='w-full mb-4'
        >
            <div className='bg-white h-auto w-full flex gap-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 border border-gray-100 relative'>
                {/* Image */}
                <div className='w-24 sm:w-28 md:w-32 h-28 sm:h-32 md:h-36 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 relative group'>
                    <img 
                        className='h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500' 
                        src={img} 
                        alt={name} 
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </div>

                {/* Détails du produit */}
                <div className='flex-1 flex flex-col justify-between py-1'>
                    <div>
                        <h3 className='font-bold text-base sm:text-lg text-gray-900 line-clamp-2 mb-3 hover:text-[#C29F75] transition-colors'>
                            {name}
                        </h3>
                        
                        <div className='space-y-2'>
                            {/* Size selector */}
                            <div className='flex items-center gap-2'>
                                <span className='text-sm text-gray-500'>Size:</span>
                                {isEditingSize ? (
                                    <div className='flex gap-1'>
                                        {availableSizes.map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => handleSizeChange(s)}
                                                className={`px-2 py-1 text-xs rounded transition-all ${
                                                    s === size
                                                        ? 'bg-[#C29F75] text-white'
                                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                                }`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setIsEditingSize(false)}
                                            className='px-2 py-1 text-xs rounded bg-red-100 hover:bg-red-200 text-red-700'
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setIsEditingSize(true)}
                                        className='font-semibold text-sm text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors'
                                    >
                                        {size}
                                    </button>
                                )}
                            </div>

                            {/* Quantity controls */}
                            <div className='flex items-center gap-2'>
                                <span className='text-sm text-gray-500'>Qty:</span>
                                <div className='flex items-center gap-2 bg-gray-100 rounded-lg p-1'>
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= 1}
                                        className='w-7 h-7 flex items-center justify-center rounded bg-white hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                                    >
                                        −
                                    </button>
                                    <span className='font-semibold text-sm text-gray-900 min-w-[20px] text-center'>
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        className='w-7 h-7 flex items-center justify-center rounded bg-white hover:bg-gray-200 transition-colors'
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Size error message */}
                            <AnimatePresence>
                                {showSizeError && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className='text-xs text-red-600 bg-red-50 px-2 py-1 rounded'
                                    >
                                        This size already exists in cart
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    
                    {/* Prix et actions */}
                    <div className='flex items-center justify-between mt-3'>
                        <p className='text-xl font-bold text-[#C29F75]'>
                            €{(parseFloat(price) * quantity).toFixed(2)}
                        </p>
                        
                        {/* Delete button - visible on hover */}
                        {onRemove && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ 
                                    opacity: isHovered ? 1 : 0,
                                    scale: isHovered ? 1 : 0.8
                                }}
                                onClick={() => onRemove(id, size)}
                                className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                                title='Remove item'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default CartItem;
