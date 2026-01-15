// import React from 'react';
// import Buttons from './Buttons';

// const BestSellers = () => {

//     const bestSellersBtnData = [
//         {
//             type: '',
//             btn1: {
//                 text: 'Buy now',
//                 link: '/product/6644cc253f1fd26bf1a6678e',
//             },
//             // btn2: {
//             //     text: 'View bottoms',
//             //     link: '/list/bottoms',
//             //     toProducts: ['tops', 'bottoms']
//             // }
//         }
//     ]
//     return (
//         <div className='mt-8 p-6 w-full' >
//             <div className='w-96'>
//                 <h1 className='text-5xl font-bold font text-black' >Best sellers</h1>
//                 <div className='bg-best-sellers h-0 pt-[150%] bg-contain bg-no-repeat my-4 rounded-[27px]' />
//                 <div className='h-10 flex justify-between'>
//                     <div>
//                         <p className='font-medium leading-[1.15rem] text-black'>Codjoe Red Shirt</p>
//                         <p className='text-[#AFAFBD]'>$59.95</p>
//                     </div>
//                     <div className='flex items-center'>
//                         <Buttons data={bestSellersBtnData} />
//                     </div>

//                 </div>
//                 {/* <div className='bg-best-sellers bg-contain bg-no-repeat h-40 rounded-[27px]  bg-amber-400 my-4'> */}
//             </div>


//         </div>
//     );
// }

// export default BestSellers;

/////////////////////////////////////////////////////

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

    // Variants pour le conteneur: appliquer un décalage entre chaque enfant
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    // Variants pour chaque item: venir de la gauche
    const itemVariants = {
        hidden: { x: -100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 50 } },
    };

    return (
        <>
            <div className='border-t border-black w-full mb-6' />
            <motion.div
                className="mt-4 sm:mt-6 lg:mt-8 p-2 sm:p-4 lg:p-6 w-full"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 xl:gap-16'>
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            className="w-full max-w-sm mx-auto bg-white"
                            variants={itemVariants}
                        >
                            <div className='w-full'>
                                <Link to={item.bestSellersBtnData[0].btn1.link}>
                                    <div className={`h-0 pt-[125%] sm:pt-[135%] lg:pt-[150%] bg-cover bg-center bg-no-repeat my-4 rounded-[27px] hover:shadow-lg transition-shadow duration-300 ${item.imgClass}`} />
                                </Link>
                                <div className='h-16 sm:h-12 flex justify-between items-end'>
                                    <div className='flex-1 pr-2'>
                                        <p className='font-medium leading-[1.15rem] text-black text-sm sm:text-base truncate'>{item.title}</p>
                                        <p className='text-[#AFAFBD] text-sm sm:text-base'>{item.price}</p>
                                    </div>
                                    <div className='flex items-center flex-shrink-0'>
                                        <Buttons data={item.bestSellersBtnData} toLink={item.bestSellersBtnData[0].btn1.link} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </>
    );
};

export default BestSellers;

