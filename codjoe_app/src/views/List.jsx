import React from 'react';
import { useCodjoeData } from '../context/CodjoeContext';
import { motion } from 'framer-motion';
import ListCard from '../components/ListCard';
import SEO from '../components/SEO';

const List = ({ categoryName }) => {
    const { products } = useCodjoeData();

    return (
        <>
            <SEO 
                title={categoryName ? `${categoryName} Collection - CODJOE` : 'Our Collection - CODJOE'}
                description={categoryName ? `Browse our ${categoryName} collection. Discover the latest trends in ${categoryName.toLowerCase()} at CODJOE. Premium quality guaranteed.` : 'Browse our complete fashion collection at CODJOE. Premium streetwear, tops, bottoms and more.'}
                keywords={categoryName ? `${categoryName}, fashion, clothing, streetwear, CODJOE, online shopping` : 'fashion, clothing, streetwear, collection, CODJOE'}
            />
            <div className='bg-white pt-20 w-full text-black min-h-[97vh] pb-10'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className='my-8'
                    >
                        <h1 className='text-3xl md:text-4xl font-bold text-black mb-2'>
                            {categoryName || 'Our Collection'}
                        </h1>
                        <div className='h-1 w-20 bg-codjoe-biscuit rounded-full'></div>
                        <p className='text-gray-600 mt-4'>
                            {products?.length || 0} products available
                        </p>
                    </motion.div>

                    {products && products.length > 0 ? (
                        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center'>
                            {products.map((item) => (
                                <ListCard 
                                    key={item._id} 
                                    id={item._id} 
                                    name={item.name} 
                                    price={item.price} 
                                    isSoldOut={item.soldOut} 
                                    image={item.mainImg} 
                            />
                            ))}
                        </div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className='flex flex-col items-center justify-center py-20'
                        >
                            <div className='text-gray-400 text-6xl mb-4'>📦</div>
                            <p className='text-gray-600 text-lg'>No products found</p>
                            <p className='text-gray-400 text-sm mt-2'>Check back soon for new items</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
}

export default List;

{/* <div>
                    <div className=' bg-orange-300 h-[185px] w-[180px] border-2'>
                    </div>
                    <div className='h-10 flex justify-between my-3 ml-1'>
                        <div>
                            <p className='font-medium leading-[1.15rem] text-black'>Codjoe Red Shirt</p>
                            <p className='text-[#AFAFBD]'>$59.95</p>
                        </div>

                    </div>

                </div> */}