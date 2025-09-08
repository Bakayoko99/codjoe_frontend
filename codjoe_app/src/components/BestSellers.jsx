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
            <tr className='border border-black w-full' />
            <motion.div
                className="mt-8 p-6 w-full flex justify-evenly space-x-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className='flex gap-36'>
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            className="w-96 bg-white "
                            variants={itemVariants}
                        >
                            <div className='w-96'>
                                <Link to={item.bestSellersBtnData[0].btn1.link}>
                                    <div className={`h-0 pt-[150%] bg-cover bg-no-repeat my-4 rounded-[27px] ${item.imgClass}`} />
                                </Link>
                                <div className='h-10 flex justify-between'>
                                    <div>
                                        <p className='font-medium leading-[1.15rem] text-black'>{item.title}</p>
                                        <p className='text-[#AFAFBD]'>{item.price}</p>
                                    </div>
                                    <div className='flex items-center'>
                                        <Buttons data={item.bestSellersBtnData} toLink={item.bestSellersBtnData[0].btn1.link} />
                                    </div>

                                </div>
                            </div>

                            {/* <div className='bg-best-sellers bg-contain bg-no-repeat h-40 rounded-[27px]  bg-amber-400 my-4'> */}


                            {/* </div> */}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </>
    );
};

export default BestSellers;

