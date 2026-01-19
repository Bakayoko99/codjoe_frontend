import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Buttons from './Buttons';
import { Link } from 'react-router-dom';
import { useCodjoeData } from '../context/CodjoeContext';

const HomeHead = ({ screen }) => {
    const { manyProducts } = useCodjoeData();
    const [lgScreenProducts, setLgScreenProducts] = useState([]);
    const [imagesLoaded, setImagesLoaded] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const homeheadBtnData = [
        {
            type: 'toggle',
            btn1: {
                text: 'View tops',
                link: '/list/tops',
                toProducts: ['tops', 'bottoms']
            },
            btn2: {
                text: 'View bottoms',
                link: '/list/bottoms',
                toProducts: ['tops', 'bottoms']
            }
        }
    ];

    const homeheadLgBtnData = [
        {
            type: '',
            btn1: {
                text: 'Buy now',
                toProducts: ['tops', 'bottoms'],
                btnHeight: 'h-9',
            },
        }
    ];

    useEffect(() => {
        if (manyProducts && manyProducts.length > 0) {
            setLgScreenProducts(manyProducts.slice(0, 3));
            setIsLoading(false);
        }
    }, [manyProducts]);

    const handleImageLoad = (productId) => {
        setImagesLoaded(prev => ({ ...prev, [productId]: true }));
    };

    // Variants d'animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <>
            {/* Version Mobile */}
            {screen === 'sm-screens' && (
                <div className='relative h-full flex justify-center items-end pt-[23px] lg:hidden'>
                    <Buttons data={homeheadBtnData} />
                </div>
            )}

            {/* Version Desktop */}
            {screen === 'lg-screens' && (
                <>
                    <div className="w-full h-8 lg:h-16" />
                    <motion.div 
                        className='max-[1023px]:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center px-4 lg:px-6'
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {isLoading || lgScreenProducts.length === 0 ? (
                            // Loading State
                            [1, 2, 3].map((i) => (
                                <motion.div 
                                    key={i} 
                                    className='w-full max-w-sm animate-pulse'
                                    variants={itemVariants}
                                >
                                    <div className='aspect-[3/4] mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex justify-center items-center overflow-hidden'>
                                        <div className="w-16 h-16 border-4 border-gray-300 border-t-[#C29F75] rounded-full animate-spin"></div>
                                    </div>
                                    <div className='space-y-2'>
                                        <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                                        <div className='h-4 bg-gray-200 rounded w-1/2'></div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            // Products Display
                            lgScreenProducts.map((product) => (
                                <motion.div 
                                    key={product._id} 
                                    className='w-full max-w-sm group'
                                    variants={itemVariants}
                                    whileHover={{ y: -8 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <Link to={`/product/${product._id}`}>
                                        <div className='relative aspect-[3/4] mb-4 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 to-gray-200'>
                                            {/* Skeleton loader tant que l'image charge */}
                                            {!imagesLoaded[product._id] && (
                                                <div className='absolute inset-0 flex items-center justify-center'>
                                                    <div className="w-12 h-12 border-4 border-gray-300 border-t-[#C29F75] rounded-full animate-spin"></div>
                                                </div>
                                            )}
                                            
                                            <img 
                                                className={`w-full h-full object-cover transform group-hover:scale-110 transition-all duration-500 ease-out ${
                                                    imagesLoaded[product._id] ? 'opacity-100' : 'opacity-0'
                                                }`}
                                                src={product.mainImg} 
                                                alt={product.name}
                                                loading="eager"
                                                decoding="async"
                                                onLoad={() => handleImageLoad(product._id)}
                                                onError={(e) => {
                                                    console.error('Image load error for product:', product._id);
                                                    e.target.src = '/codjoe_logo.png'; // Fallback image
                                                    handleImageLoad(product._id);
                                                }}
                                            />
                                            
                                            {/* Overlay gradient */}
                                            <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                                            
                                            {/* Badge si nouveau produit */}
                                            {product.isNew && imagesLoaded[product._id] && (
                                                <div className='absolute top-4 left-4 bg-[#C29F75] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg'>
                                                    NEW
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                    
                                    <div className='flex justify-between items-start gap-3'>
                                        <div className='flex-1 min-w-0'>
                                            <Link to={`/product/${product._id}`}>
                                                <h3 className='font-semibold text-gray-900 text-base lg:text-lg truncate hover:text-[#C29F75] transition-colors'>
                                                    {product.name}
                                                </h3>
                                            </Link>
                                            <p className='text-[#C29F75] font-bold text-lg'>${product.price}</p>
                                        </div>
                                        <div className='flex-shrink-0'>
                                            <Buttons data={homeheadLgBtnData} toLink={`/product/${product._id}`} />
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                </>
            )}
        </>
    );
};

export default HomeHead;
