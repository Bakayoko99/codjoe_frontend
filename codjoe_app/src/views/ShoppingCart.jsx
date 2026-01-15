
import React, { useState, useEffect } from 'react';
import Buttons from '../components/Buttons';
import CartItem from '../components/CartItem';
import { useCodjoeData } from '../context/CodjoeContext';
import { Link, useNavigate } from 'react-router-dom';


const ShoppingCart = () => {

    const navigate = useNavigate()

    const { userID, userCart, getManyProducts, manyProducts, cartSubtotal, isLoggedIn } = useCodjoeData();
    const [idExists, setIdExists] = useState(false);

    // Fonction utilitaire pour vérifier et normaliser le panier
    const getValidCart = () => {
        if (!userCart) return [];
        if (Array.isArray(userCart)) return userCart;
        try {
            // Si userCart est une string JSON, essayer de la parser
            return JSON.parse(userCart);
        } catch (e) {
            console.error('Error parsing userCart:', e);
            return [];
        }
    };

    const validCart = getValidCart();
    const hasItems = validCart.length > 0;
    // const [cart, setCart] = useState([])

    // const [opened, setOpened] = useState(false);

    // const toggleModal = () => { 
    //     setOpened(!opened);
    // };


    useEffect(() => {
        console.log('ShoppingCart mounted');
        console.log('userCart raw:', userCart);
        console.log('validCart:', validCart);
        console.log('hasItems:', hasItems);
        console.log('cartSubtotal:', cartSubtotal);
        console.log('isLoggedIn:', isLoggedIn);
    }, [userCart, cartSubtotal, isLoggedIn, validCart, hasItems]);


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
            <div className='max-[1023px]:hidden bg-white pt-20 h-screen min-h-screen'>
                {
                    // idExists &&
                    <>
                        <div className='flex flex-row h-full'>
                            <div className='w-full h-full flex items-center'>
                                <div className='h-[45%] w-full mx-6 lg:mx-10'>
                                    <div className='flex items-center flex-col text-black mb-6 lg:mb-8'>
                                        <p className='font-medium text-lg'>Welcome to your</p>
                                        <p className='text-3xl lg:text-4xl xl:text-5xl font-semibold'>Shopping cart</p>
                                    </div>
                                    
                                    {/* Résumé des prix */}
                                    <div className='bg-white drop-shadow-2xl w-full h-32 rounded-3xl text-black flex justify-center flex-col px-6'>
                                        <div className='flex justify-between pb-3'>
                                            <p className='font-medium text-lg'>Subtotal</p>
                                            <p className='text-[#AFAFBD] text-lg font-semibold'>€{cartSubtotal > 0 ? cartSubtotal : 0}</p>
                                        </div>
                                        <div className='h-px bg-[#AFAFBD] w-full' />
                                        <div className='flex justify-between pt-3'>
                                            <p className='font-medium text-lg'>Shipping</p>
                                            <p className='text-[#AFAFBD]'>Calculated at next step</p>
                                        </div>
                                    </div>
                                    
                                    {/* Bouton checkout */}
                                    <div className='flex justify-center'>
                                        {hasItems ? (
                                            <Link
                                                to="/payment"
                                                className='bg-[#C29F75] hover:bg-[#B8956A] relative bottom-7 h-14 w-52 rounded-3xl font-medium flex justify-center items-center text-white transition-colors shadow-lg'
                                                onClick={(e) => {
                                                    console.log('Checkout button clicked');
                                                    console.log('validCart:', validCart);
                                                    console.log('cartSubtotal:', cartSubtotal);
                                                    // Vérification supplémentaire
                                                    if (!hasItems) {
                                                        e.preventDefault();
                                                        console.log('Preventing navigation: cart is empty');
                                                        alert('Your cart is empty. Please add items before checkout.');
                                                        return false;
                                                    }
                                                }}
                                            >
                                                Proceed to Checkout
                                            </Link>
                                        ) : (
                                            <Link
                                                to="/"
                                                className='bg-gray-400 hover:bg-gray-500 relative bottom-7 h-14 w-52 rounded-3xl font-medium flex justify-center items-center text-white transition-colors'
                                            >
                                                Continue Shopping
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Liste des produits */}
                            <div className='h-full w-full'>
                                <div className='pt-5 grid grid-cols-1 justify-items-center overflow-y-auto h-full px-4'>
                                    {hasItems ? (
                                        validCart.map((product, index) => (
                                            <CartItem
                                                key={product.id || index}
                                                name={product.name}
                                                price={product.price}
                                                quantity={product.quantity}
                                                size={product.size}
                                                img={product.mainImg}
                                            />
                                        ))
                                    ) : (
                                        <div className='text-center py-12'>
                                            <div className='text-gray-400 text-8xl mb-6'>🛒</div>
                                            <h2 className='text-2xl font-semibold text-gray-600 mb-4'>Your cart is empty</h2>
                                            <p className='text-gray-500 text-lg'>Add some products to get started</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>

            <div className='lg:hidden bg-white text-black pt-16 sm:pt-20 min-h-screen'>
                {
                    // idExists &&
                    <>
                        <div className='px-4 sm:px-6'>
                            <h1 className='text-xl sm:text-2xl text-start my-4 sm:my-6 font-semibold'>Shopping cart</h1>
                            
                            {/* Liste des produits */}
                            <div className='grid grid-cols-1 justify-items-center mb-6'>
                                {validCart.map((product, index) => (
                                    <CartItem
                                        key={product.id || index}
                                        name={product.name}
                                        price={product.price}
                                        quantity={product.quantity}
                                        size={product.size}
                                        img={product.mainImg}
                                    />
                                ))}
                            </div>

                            {/* Section checkout mobile */}
                            {hasItems && (
                                <div className='fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg'>
                                    <div className='max-w-lg mx-auto'>
                                        {/* Résumé des prix */}
                                        <div className='bg-gray-50 rounded-xl p-4 mb-4'>
                                            <div className='flex justify-between items-center pb-3'>
                                                <p className='font-medium text-gray-800'>Subtotal</p>
                                                <p className='text-gray-600 font-semibold'>€{cartSubtotal > 0 ? cartSubtotal : 0}</p>
                                            </div>
                                            <div className='h-px bg-gray-300 w-full mb-3' />
                                            <div className='flex justify-between items-center'>
                                                <p className='font-medium text-gray-800'>Shipping</p>
                                                <p className='text-gray-500 text-sm'>Calculated at next step</p>
                                            </div>
                                        </div>

                                        {/* Bouton checkout */}
                                        <Link
                                            to="/payment"
                                            className='bg-[#C29F75] hover:bg-[#B8956A] w-full h-12 sm:h-14 rounded-2xl font-medium flex justify-center items-center text-white transition-colors shadow-md'
                                            onClick={(e) => {
                                                console.log('Mobile checkout button clicked');
                                                console.log('validCart:', validCart);
                                                console.log('cartSubtotal:', cartSubtotal);
                                                // Vérification supplémentaire
                                                if (!hasItems) {
                                                    e.preventDefault();
                                                    console.log('Preventing mobile navigation: cart is empty');
                                                    alert('Your cart is empty. Please add items before checkout.');
                                                    return false;
                                                }
                                            }}
                                        >
                                            Proceed to Checkout
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* Message panier vide */}
                            {!hasItems && (
                                <div className='text-center py-12'>
                                    <div className='text-gray-400 text-6xl mb-4'>🛒</div>
                                    <h2 className='text-xl font-semibold text-gray-600 mb-2'>Your cart is empty</h2>
                                    <p className='text-gray-500 mb-6'>Add some products to get started</p>
                                    <Link
                                        to="/"
                                        className='bg-[#C29F75] hover:bg-[#B8956A] px-6 py-3 rounded-xl text-white font-medium transition-colors'
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            )}

                            {/* Espace pour éviter que le contenu soit masqué par le footer fixe */}
                            {hasItems && (
                                <div className='h-32'></div>
                            )}
                        </div>
                    </>
                }
            </div>

        </>

    );
}

export default ShoppingCart;
