import React from 'react';
import { motion } from 'framer-motion';
import Buttons from './Buttons';
import { Link } from 'react-router-dom';

const BestSellers = () => {
    const items = [
        {
            id: 1,
            title: 'Codjoe Red Shirt',
            price: '$59.95',
            imgClass: 'bg-best-sellers',
            badge: 'Best Seller',
            bestSellersBtnData: [
                {
                    type: '',
                    btn1: {
                        text: 'Buy now',
                        link: '/product/6644cc253f1fd26bf1a6678e',
                    },
                }
            ],
        },
        {
            id: 2,
            title: 'Classic Jeans Jacket',
            price: '$79.99',
            imgClass: 'bg-classic-jeans-jacket',
            badge: 'Trending',
            bestSellersBtnData: [
                {
                    type: '',
                    btn1: {
                        text: 'Buy now',
                        link: '/product/6644cb3f3f1fd26bf1a6678a',
                    },
                }
            ],
        },
        {
            id: 3,
            title: 'Summer Jacket',
            price: '$99.50',
            imgClass: 'bg-summer-jacket',
            badge: 'Hot',
            bestSellersBtnData: [
                {
                    type: '',
                    btn1: {
                        text: 'Buy now',
                        link: '/product/6644c9a73f1fd26bf1a66786',
                    },
                }
            ],
        },
    ];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1, 
            transition: { 
                type: 'spring', 
                stiffness: 80,
                damping: 15
            } 
        },
    };

    return (
        <div className="">
            {/* Divider */}
            <div className='w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8'></div>
            
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        className="group"
                        variants={itemVariants}
                        whileHover={{ y: -10 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <div className='relative'>
                            {/* Image container */}
                            <Link to={item.bestSellersBtnData[0].btn1.link}>
                                <div className={`
                                    aspect-[3/4] bg-cover bg-center rounded-2xl overflow-hidden 
                                    shadow-lg hover:shadow-2xl transition-all duration-500
                                    ${item.imgClass}
                                `}>
                                    {/* Overlay */}
                                    <div className='w-full h-full bg-gradient-to-t from-black/40 via-transparent to-transparent 
                                        opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                    </div>
                                    
                                    {/* Badge */}
                                    <div className='absolute top-4 right-4 bg-[#C29F75] text-white px-3 py-1.5 
                                        rounded-full text-xs font-bold uppercase tracking-wide shadow-lg
                                        transform group-hover:scale-110 transition-transform duration-300'>
                                        {item.badge}
                                    </div>
                                </div>
                            </Link>

                            {/* Product info */}
                            <div className='mt-4 space-y-2'>
                                <div className='flex justify-between items-start gap-3'>
                                    <div className='flex-1 min-w-0'>
                                        <Link to={item.bestSellersBtnData[0].btn1.link}>
                                            <h3 className='font-semibold text-gray-900 text-base lg:text-lg 
                                                hover:text-[#C29F75] transition-colors truncate'>
                                                {item.title}
                                            </h3>
                                        </Link>
                                        <p className='text-[#C29F75] font-bold text-xl mt-1'>{item.price}</p>
                                    </div>
                                    <div className='flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300'>
                                        <Buttons 
                                            data={item.bestSellersBtnData} 
                                            toLink={item.bestSellersBtnData[0].btn1.link} 
                                        />
                                    </div>
                                </div>

                                {/* Quick view link */}
                                <Link 
                                    to={item.bestSellersBtnData[0].btn1.link}
                                    className='inline-block text-sm text-gray-500 hover:text-gray-900 
                                        underline underline-offset-2 opacity-0 group-hover:opacity-100 
                                        transition-opacity duration-300'
                                >
                                    View details →
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default BestSellers;

