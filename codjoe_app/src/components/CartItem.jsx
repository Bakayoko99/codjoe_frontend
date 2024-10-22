import React from 'react';
import Buttons from './Buttons';

const CartItem = ({ name, price, size, quantity, img }) => {

    const cartBtnData = [
        {
            type: 'toggle',
            btn1: {
                text: 'Edit',
                link: '#',
                toProducts: ['tops', 'bottoms']
            },
            btn2: {
                text: 'Checkout',
                link: '#',
                toProducts: ['tops', 'bottoms']
            }
        }
    ]

    return (
        <>
            <div className='flex flex-col items-center relative mb-5'>
                <div className='bg-white h-44 min-[600px]:h-[227px] w-80 min-[600px]:w-[507px] flex rounded-3xl shadow-xl'>
                    <div className='w-[181px] rounded-2xl relative m-3 overflow-hidden'>
                        {/* <div className=' bg-orange-400 h-[147px] w-[134px] rounded-2xl relative mx-auto  overflow-hidden'> */}

                        <img className='h-full w-full object-cover' src={img} alt="product image" />

                    </div>

                    <div className='h-full w-auto  py-10 pl-5 flex'>
                        <div className='grid grid-cols-1'>
                            <p className='font-medium leading-[1.15rem] text-black'>{name}</p>
                            <p className='font-light leading-[1.15rem] text-black'>Size : {size}</p>
                            <p className='text-[#AFAFBD]'>${price}</p>
                        </div>
                    </div>

                </div>
                {/* <div className=' relative bottom-5 shadow-2xl rounded-[28.50px]'>
                    <Buttons data={cartBtnData} />
                </div> */}
            </div>
        </>
    );
}

export default CartItem;
