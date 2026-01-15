import React, { useEffect, useState } from 'react';
import Buttons from './Buttons';
import img1 from '../assets/images/products/Photos/tops/top1.jpg';
import img2 from '../assets/images/products/Photos/tops/top2.jpg';
import img3 from '../assets/images/products/Photos/tops/top3.jpg';
import { Link } from 'react-router-dom';
import { useCodjoeData } from '../context/CodjoeContext';

const HomeHead = ({ screen }) => {

    const { manyProducts } = useCodjoeData()

    const [lgScreenProducts, setlgScreenProducts] = useState([]);

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
    ]

    const homeheadLgBtnData = [
        {
            type: '',
            btn1: {
                text: 'Buy now',
                // link: ,
                toProducts: ['tops', 'bottoms'],
                btnHeight: 'h-9',
            },
        }
    ]

    useEffect(() => {
        console.log('homeHead products : ', manyProducts);
        setlgScreenProducts(manyProducts)
    });

    return (
        <>

            {
                screen === 'sm-screens' && (
                    <div className='relative h-full flex justify-center items-end pt-[23px] lg:hidden'>

                        <Buttons data={homeheadBtnData} />
                        {/* <Buttons type='toggle' text='View tops' text2='View bottoms' toProducts={['tops', 'bottoms']} /> */}

                    </div>
                )
            }
            {
                screen === 'lg-screens' && (
                    <div className='max-[1023px]:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 justify-items-center h-auto px-4'>
                        {
                            lgScreenProducts.length === 0 ? (
                                [1, 2, 3].map((i) => (
                                    <div key={i} className='w-full max-w-sm animate-pulse mb-5'>
                                        <div className='h-64 sm:h-80 lg:h-96 mb-3 bg-[#F5F5F5] flex justify-center items-center rounded-lg'>
                                            <span className="w-12 h-12 rounded-[50%] inline-block border-t-codjoe-biscuit border-t-[3px] border-r-[3px] border-r-transparent animate-spin" />
                                        </div>
                                        <div className='h-14 flex justify-between items-end'>
                                            <div>
                                                <p className='font-medium leading-[1.15rem] text-black'>Loading...</p>
                                                <p className='text-[#AFAFBD]'>Loading...</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                lgScreenProducts.map((product) => (
                                    <div key={product._id} className='w-full max-w-sm'>
                                        <Link to={`/product/${product._id}`}>
                                            <div className='h-64 sm:h-80 lg:h-96 mb-3 rounded-lg overflow-hidden'>
                                                <img className='h-full w-full object-cover hover:scale-105 transition-transform duration-300' src={product.mainImg} alt={product.name} />
                                            </div>
                                        </Link>
                                        <div className='h-[60px] flex justify-between items-end'>
                                            <div className='flex-1 pr-2'>
                                                <p className='font-medium leading-[1.15rem] text-black truncate'>{product.name}</p>
                                                <p className='text-[#AFAFBD]'>${product.price}</p>
                                            </div>
                                            <div className='flex items-center flex-shrink-0'>
                                                <Buttons data={homeheadLgBtnData} toLink={`/product/${product._id}`} />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>
                )
            }

            {/* <div className=''> */}

        </>

    );
}

export default HomeHead;



// <div className=' w-[23vh] lg:w-[45vh] xl:w-[50vh]'>
//     <div className=' pt-[125%] mb-3 bg-home-head-lg-img2 bg-cover bg-no-repeat bg-center '>
//         {/* <div className='h-[86%] bg-home-head-lg-img2 bg-contain bg-no-repeat bg-center '> */}
//     </div>
//     <div className='h-[60px] flex justify-between items-end'>
//         <div>
//             <p className='font-medium leading-[1.15rem] text-black'>Codjoe Red Shirt</p>
//             <p className='text-[#AFAFBD]'>$59.95</p>
//         </div>
//         <div className='flex items-center'>
//             {/* <Link to={'/product/65f8da98b5ba701fca305d4d'}> */}
//             <Buttons data={homeheadLgBtnData} />
//             {/* </Link> */}
//         </div>

//     </div>
// </div>
// <div className=' w-[23vh] lg:w-[45vh] xl:w-[50vh]'>
//     <div className='pt-[125%] mb-3 bg-home-head-lg-img3 bg-cover bg-no-repeat bg-center'>
//         {/* <div className='h-[86%] bg-home-head-lg-img3 bg-contain bg-no-repeat bg-center'> */}
//     </div>
//     <div className='h-[60px] flex justify-between items-end'>
//         <div>
//             <p className='font-medium leading-[1.15rem] text-black'>Codjoe Red Shirt</p>
//             <p className='text-[#AFAFBD]'>$59.95</p>
//         </div>
//         <div className='flex items-center'>
//             <Buttons data={homeheadLgBtnData} />
//         </div>

//     </div>
// </div>
