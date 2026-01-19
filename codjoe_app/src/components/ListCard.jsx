import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ListCard = ({ id, name, price, isSoldOut, image }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className='group'
        >
            <Link to={`/product/${id}`}>
                <div className='relative h-[245px] w-[180px] min-[460px]:h-[300px] min-[460px]:w-[230px] overflow-hidden rounded-2xl shadow-md group-hover:shadow-xl transition-all duration-300'>
                    <img 
                        src={image} 
                        alt={name} 
                        className='h-full w-full object-cover group-hover:scale-105 transition-transform duration-500' 
                    />
                    
                    {/* Overlay hover effect */}
                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300' />
                    
                    {/* Sold out badge */}
                    {isSoldOut && (
                        <div className='absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full'>
                            Sold out
                        </div>
                    )}
                    
                    {/* Quick view button on hover */}
                    <div className='absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <div className='bg-white text-codjoe-biscuit px-4 py-2 rounded-full text-sm font-medium shadow-lg'>
                            Quick view
                        </div>
                    </div>
                </div>
                
                <div className='mt-3 w-[180px] min-[460px]:w-[230px]'>
                    <p className='font-medium text-black text-sm min-[460px]:text-base truncate group-hover:text-codjoe-biscuit transition-colors duration-200'>
                        {name}
                    </p>
                    <p className='text-gray-500 text-sm font-semibold mt-1'>
                        €{price}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
}

export default ListCard;
