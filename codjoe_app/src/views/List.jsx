import React, { useState, useEffect } from 'react';
// import { tops } from '../constants';
import { useCodjoeData } from '../context/CodjoeContext';
import ListCard from '../components/ListCard';


const List = ({ categoryName }) => {

    const { products, testData } = useCodjoeData();
    console.log('proddd from context', products);


    return (
        <div className='bg-white pt-20 w-full text-black min-h-[97vh] pb-5'>
            <h1 className='text-xl text-start my-3 mx-3'>{categoryName}</h1>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 justify-items-center'>

                {
                    products?.map((item, index) => {
                        return (
                            <ListCard key={item._id} id={item._id} name={item.name} price={item.price} isSoldOut={item.soldOut} image={item.mainImg} />
                        )
                    })
                }

            </div>
        </div>
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