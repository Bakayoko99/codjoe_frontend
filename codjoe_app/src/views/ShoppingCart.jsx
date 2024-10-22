
import React, { useState, useEffect } from 'react';
import Buttons from '../components/Buttons';
import CartItem from '../components/CartItem';
import { useCodjoeData } from '../context/CodjoeContext';
import { Link, useNavigate } from 'react-router-dom';


const ShoppingCart = () => {

    const navigate = useNavigate()

    const { userID, userCart, getManyProducts, manyProducts, cartSubtotal, isLoggedIn } = useCodjoeData();
    const [idExists, setIdExists] = useState(false);
    // const [cart, setCart] = useState([])

    // const [opened, setOpened] = useState(false);

    // const toggleModal = () => { 
    //     setOpened(!opened);
    // };


    useEffect(() => {

        // setTimeout(() => {
        // if (!isLoggedIn) {
        //     console.log('cart page: user not connected');
        //     setIdExists(false)
        //     navigate('/login')
        // }
        // setIdExists(true)

        // }, 5 * 1000)

        console.log('userCart shoppinCarttt tt:', userCart);
        console.log('cartSubtotal shoppinCarttt tt:', cartSubtotal);

    }, []);


    // const cartBtnData = [
    //     {
    //         type: 'toggle',
    //         btn1: {
    //             text: 'Edit',
    //             link: '#',
    //             toProducts: ['tops', 'bottoms']
    //         },
    //         btn2: {
    //             text: 'Checkout',
    //             link: '#',
    //             toProducts: ['tops', 'bottoms']
    //         }
    //     }
    // ]

    return (
        <>
            <div className='max-[1023px]:hidden bg-white pt-20 h-[99vh] min-h-[99vh]'>

                {
                    // idExists &&
                    <>
                        <div className='flex flex-row h-full'>
                            <div className='  w-full h-full flex items-center'>
                                <div className='h-[45%] w-full mx-10'>
                                    <div className='flex items-center flex-col text-black mb-5'>
                                        <p className=' font-medium'>Welcome to your</p>
                                        <p className=' text-5xl font-semibold'>Shopping cart</p>
                                    </div>
                                    <div className=' bg-white drop-shadow-2xl w-full h-32 rounded-3xl text-black flex justify-center flex-col px-5'>
                                        <div className='flex justify-between pb-2'>
                                            <p className=' font-medium'>Subtotal</p>
                                            <p className='text-[#AFAFBD]'>€{cartSubtotal > 0 ? cartSubtotal : 0}</p>
                                        </div>
                                        <div className=' h-px bg-[#AFAFBD] w-full' />

                                        <div className='flex justify-between pt-2'>
                                            <p className=' font-medium'>Shipping</p>
                                            <p className='text-[#AFAFBD]'>Calculated at next step</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-center'>
                                        <Link
                                            to={'/payment'}
                                            className=' bg-[#C29F75] relative bottom-7 h-14 w-52 rounded-3xl font-medium flex justify-center items-center'>Checkout</Link>
                                    </div>
                                </div>

                            </div>
                            <div className=' h-full w-full'>
                                <div className=' pt-5 grid grid-cols-1 justify-items-center overflow-y-scroll h-full'>
                                    {
                                        userCart && userCart?.map((product) => (
                                            <CartItem
                                                key={product.id}
                                                name={product.name}
                                                price={product.price}
                                                quantity={product.quantity}
                                                size={product.size}
                                                img={product.mainImg}
                                            />
                                        ))

                                    }


                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>

            <div className='lg:hidden bg-white text-black pt-20 h-[99vh] min-h-[99vh]'>
                {
                    // idExists &&
                    <>

                        <h1 className='text-xl text-start my-3'>Shopping cart</h1>
                        <div className='grid grid-cols-1 justify-items-center'>
                            {
                                userCart && userCart?.map((product) => (
                                    <CartItem
                                        key={product.id}
                                        name={product.name}
                                        price={product.price}
                                        quantity={product.quantity}
                                        size={product.size}
                                        img={product.mainImg}
                                    />
                                ))

                            }
                        </div>


                    </>
                }
            </div>

        </>

    );
}

export default ShoppingCart;
