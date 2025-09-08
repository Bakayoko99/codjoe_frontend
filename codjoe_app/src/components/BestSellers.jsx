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
            title: 'Classic Jeans',
            price: '$79.99',
            imgClass: 'bg-classic-jeans',
            bestSellersBtnData: [
                {
                    type: '',
                    btn1: {
                        text: 'Buy now',
                        link: '/product/6644b60b3f1fd26bf1a66772',
                    },
                }
            ],
        },
        {
            id: 3,
            title: 'black shirt',
            price: '$99.50',
            imgClass: 'bg-summer-jacket',
            bestSellersBtnData: [
                {
                    type: '',
                    btn1: {
                        text: 'Buy now',
                        link: '/product/6644b60b3f1fd26bf1a66772',
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

                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        className="w-96 bg-white "
                        variants={itemVariants}
                    >
                        {/* <div className={`h-48 bg-contain bg-no-repeat mb-4 rounded-xl ${item.imgClass}`} />
                    <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
                    <p className="text-gray-500 mb-3">{item.price}</p>
                    <Buttons data={[{ type: '', btn1: { text: 'Buy now', link: item.link } }]} /> */}

                        {/* <div className='mt-8 p-6 w-full' > */}
                        <div className='w-96'>
                            <div className='bg-best-sellers h-0 pt-[150%] bg-contain bg-no-repeat my-4 rounded-[27px]' />
                            <div className='h-10 flex justify-between'>
                                <div>
                                    <p className='font-medium leading-[1.15rem] text-black'>Codjoe Red Shirt</p>
                                    <p className='text-[#AFAFBD]'>$59.95</p>
                                </div>
                                <div className='flex items-center'>
                                    <Buttons data={item.bestSellersBtnData} />
                                </div>

                            </div>
                            {/* <div className='bg-best-sellers bg-contain bg-no-repeat h-40 rounded-[27px]  bg-amber-400 my-4'> */}
                        </div>


                        {/* </div> */}
                    </motion.div>
                ))}
            </motion.div>
        </>
    );
};

export default BestSellers;

