import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Buttons from './Buttons';

const ListCard = ({ id, name, price, isSoldOut, image }) => {


    // useEffect(() => {
    //     // console.log('image listc', image);
    // }, []);


    return (
        <div>
            <Link to={`/product/${id}`}
                onClick={() => {
                    console.log('clicked')
                }}
            >
                {/* <div className={`bg-[url(${image})] h-[185px] w-[180px] border-2`}> */}
                <div className=' h-[245px] w-[180px] min-[460px]:h-[276px] min-[460px]:w-[215px]'>
                    <img src={image} alt='product' className='h-full w-full object-cover' />
                    {/* <div className='relative h-full flex justify-center items-center'>
                        <div className='w-[142px] h-10 bg-[rgba(167, 126, 91, 0.7)] border-2 text-white rounded-[28.50px] m-1 flex justify-center items-center'>
                            <p className=' font-bold'>Sold out</p>
                        </div>
                    </div> */}
                </div>
                <div className='h-10 my-3 w-40'>
                    <div>
                        <p className='font-medium text-black overflow-hidden w-40 h-5'>{name}</p>
                        <p className='text-[#AFAFBD] h-5'>€{price}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default ListCard;
