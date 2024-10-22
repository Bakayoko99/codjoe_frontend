import React from 'react';
import Buttons from './Buttons';

const BestSellers = () => {

    const bestSellersBtnData = [ 
        {
            type: '',
            btn1: {
                text: 'Buy now',
                link: '/product/6644cc253f1fd26bf1a6678e',
            },
            // btn2: {
            //     text: 'View bottoms',
            //     link: '/list/bottoms',
            //     toProducts: ['tops', 'bottoms']
            // }
        }
    ]
    return (
        <div className='mt-8 p-6' >
            <h1 className='text-5xl font-bold font text-black' >Best sellers</h1>
            <div className='bg-best-sellers h-0 pt-[150%] bg-contain bg-no-repeat my-4 rounded-[27px]' />
            <div className='h-10 flex justify-between'>
                <div>
                    <p className='font-medium leading-[1.15rem] text-black'>Codjoe Red Shirt</p>
                    <p className='text-[#AFAFBD]'>$59.95</p>
                </div>
                <div className='flex items-center'>
                    <Buttons data={bestSellersBtnData} />
                </div>

            </div>
            {/* <div className='bg-best-sellers bg-contain bg-no-repeat h-40 rounded-[27px]  bg-amber-400 my-4'> */}


        </div>
    );
}

export default BestSellers;
