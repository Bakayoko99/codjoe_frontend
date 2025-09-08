import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCodjoeData } from '../context/CodjoeContext';
import { Buffer } from 'buffer';
import axios from 'axios';
import Buttons from './Buttons';
import { Link } from 'react-router-dom';

const Product = () => {

    const { id } = useParams();
    const { sizesData, setOneProductId, oneProduct, addCartNewProduct } = useCodjoeData();

    const [showDiv, setShowDiv] = useState(false);
    const [product, setProduct] = useState({});
    const [sizeOpen, setSizeOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState('');
    const [lgSizeOpen, setLgSizeOpen] = useState(false)

    const productBtnData = [
        {
            type: '',
            btn1: {
                text: 'Buy now',
                // link: '/list/tops',
            }
        }
    ]


    // useEffect(() => {
    //     const handleScroll = () => {
    //         const windowHeight = window.innerHeight;
    //         const documentHeight = document.documentElement.scrollHeight;
    //         const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    //         const scrollBottom = scrollTop + windowHeight;

    //         if (scrollBottom === documentHeight) {
    //             setShowDiv(true);
    //         } else {
    //             setShowDiv(false);
    //         }
    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    useEffect(() => {

        if (oneProduct != '') {
            setProduct(oneProduct)
            console.log('one product page: ', oneProduct)
        }
        console.log('one product page: empty ')

    }, [oneProduct]);

    const handleCart = () => {

        if (selectedSize.length < 1) {
            setLgSizeOpen(!lgSizeOpen)
        } else {
            const cartNewItem = {
                id: id,
                size: selectedSize,
                quantity: 1
            }

            console.log("prroductttt handleCart size ok", cartNewItem);
            addCartNewProduct(cartNewItem)
            // setCartNewProduct(cartNewItem)
        }

    }

    useEffect(() => {

        console.log('id product: ', id);
        setOneProductId(id)

    }, []);

    const toggleSize = () => {
        setSizeOpen(!sizeOpen);
        console.log('size open', sizeOpen);
    }

    const handleSize = (size) => {
        setSelectedSize(size);
        console.log('selected size', size);
    }


    return (
        <>
            <div className='max-[1023px]:hidden bg-white pt-20 min-h-[97vh]'>
                <div className='h-[85vh]'>
                    <div className=' h-[365px] w-full grid grid-cols-3 gap-20 px-5 pt-[5%]'>
                        {/* <div className=' bg-orange-200 h-[365px] w-full px-20 flex justify-between'> */}

                        {product.mainImg ? (
                            <div className=' rounded-2xl relative mx-auto  overflow-hidden'>
                                {/* h-full  w-80 */}
                                <img className=' h-full w-full object-cover' src={product?.mainImg} alt="product image" />
                            </div>

                        ) : (
                            // <div className='h-full w-90 flex justify-center items-center'>
                            <div className=" ml-5 h-full w-90 animate-pulse bg-codjoe-biscuit flex justify-center items-center bg-white/20 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/30">
                                <span className="w-12 h-12 rounded-[50%] inline-block border-t-codjoe-biscuit border-t-[3px] border-r-[3px] border-r-transparent animate-spin"></span>
                            </div>
                            // </div>
                        )}
                        <div className='text-black h-full w-[600px] col-span-2'>
                            {/* <div className='text-black bg-slate-500 h-full w-[600px]'> */}
                            <p className='text-2xl font-medium mb-1'>
                                {product.name ? product.name : 'Loading...'}
                            </p>
                            <p className={`${product?.price ? '' : 'animate-pulse bg-gray-300 h-5 w-full mt-5 mb-5'} text-[#AFAFBD] text-xl mb-1`}>
                                {product?.price ? `€${product?.price}` : ''}
                            </p>
                            <p className={`${product?.name ? '' : 'animate-pulse bg-gray-300 h-10 w-full'} mb-6 font-light`}>
                                {product?.name ? 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita aliquam fuga sint porro reiciendis ipsa nesciunt harum exercitationem voluptas est' : ''}
                            </p>
                            <div className=' w-full flex justify-between'>
                                {/* <select className=' px-3 h-14 bg-white rounded-[28px] w-64'>
                                    <option selected>Size</option>
                                    {
                                        sizesData.map((size, i)=> (
                                            <option value={size}>{size}</option>
                                        ))
                                    }
                                    
                                </select> */}

                                <button className=' h-14 bg-white rounded-[28px] w-64 text-left pl-10 relative drop-shadow-lg' onClick={() => { console.log('selectedSize: ', selectedSize.length), setLgSizeOpen(!lgSizeOpen) }}
                                >Size {selectedSize != '' && `: ${selectedSize}`}
                                    <span className=' rotate-90 absolute right-11'>
                                        {'>'}
                                    </span>
                                </button>
                                <Link
                                    onClick={() => handleCart()}
                                    className=' h-14 bg-white rounded-[28px] w-64 drop-shadow-lg flex justify-center items-center'
                                    to={`${selectedSize.length != '' ? '/cart' : ''}`}
                                >
                                    Buy now
                                </Link>

                            </div>
                            <div className={` ${lgSizeOpen === false ? 'opacity-0' : ''} h-56 w-64 bg-[#C29F75] mt-5 rounded-[28px] flex items-center justify-center duration-300`}>
                                <ul className={`flex justify-evenly items-center flex-col h-full text-white w-full text-center ${lgSizeOpen === false ? 'hidden' : ''}`}>
                                    <li>SELECT YOUR SIZE</li>
                                    {
                                        sizesData.map((size, i) => (
                                            <li key={i} className={`${selectedSize == size && 'border-2 rounded-xl'} cursor-pointer  w-20`} onClick={() => { handleSize(size), setLgSizeOpen(!lgSizeOpen) }}>
                                                {size}
                                            </li>
                                        ))
                                    }
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' lg:hidden bg-white mt-20 h-full' onClick={sizeOpen ? toggleSize : undefined}>
                <div className='h-[441px] w-screen bg-contain bg-no-repeat max-w-full mt-4 '>
                    <img className=' h-full w-full object-contain' src={product?.mainImg} alt="main image" />

                </div>
                {
                    product.imgs?.length > 0 &&
                    product.imgs.map((image, index) => {
                        return (
                            <div key={index} className='h-[441px] w-screen bg-contain bg-no-repeat max-w-full mt-4 '>
                                <img className=' h-full w-full object-contain' src={image} alt="product image" />
                            </div>
                        )
                    })

                }

                <div className=' rounded-t-3xl h-[155px] relative'>

                    <div className={`w-screen h-[172px] rounded-t-3xl bg-white bottom-0 shadow-2xl border-4 fixed transition-all duration-500 ${sizeOpen ? 'h-[470px]' : ''}`}>
                        <div className='h-10 flex justify-between m-6'>
                            <div>
                                <p className='font-medium leading-[2.15rem] text-2xl text-black overflow-hidden h-9'>{product.name}</p>
                                <p className='text-[#AFAFBD] text-xl'>€{product.price}</p>
                            </div>
                        </div>
                        <div className=' flex justify-between mr-6'>
                            {/* <Buttons data={productBtnData} /> */}
                            <div>
                                <p onClick={toggleSize} className={`w-[150px] h-12 border-4 rounded-[28.50px] text-black flex justify-center items-center`}>
                                    Size : {selectedSize}
                                </p>
                            </div>
                            <button onClick={() => handleCart()} className={`w-[150px] h-12 bg-codjoe-biscuit text-white rounded-[28.50px] m-1 flex justify-center items-center`}>
                                <Link
                                    to={`${selectedSize.length != '' ? '/cart' : ''}`}
                                >
                                    Buy now
                                </Link>
                            </button>
                        </div>
                    </div>

                    <div className={`w-screen h-0 rounded-t-3xl bg-codjoe-biscuit fixed transition-all duration-500 bottom-0 ${sizeOpen ? 'h-[375px]' : 'h-0'} `}>

                        <div className={`${sizeOpen ? 'flex' : 'hidden'} flex-col items-center justify-center h-full`}>
                            <div className='h-14 w-80 bg-white rounded-[28.50px] mb-2 flex justify-center items-center'>
                                <p className='font-medium text-black'>Sizes</p>
                            </div>
                            <div>
                                {sizesData.map((size, index) => {
                                    return (
                                        <div key={index} onClick={() => handleSize(size)} className={`h-14 w-80 rounded-[28.50px] flex justify-center items-center ${selectedSize == size ? 'bg-white text-black' : 'text-white'}`}>
                                            {/* ${selectedSize == size ? 'bg-white' : ''} */}
                                            <p className='font-medium'>{size}</p>
                                        </div>
                                    )
                                })}

                            </div>

                        </div>

                    </div>
                </div>
                {/* <div className='w-screen h-[400px] rounded-t-3xl bg-green-600 bottom-[-400px] sticky'>

            </div> */}


                <div>
                    {showDiv && <div className="fixed bottom-0 right-0 bg-gray-200 p-4">Bottom reached!</div>}
                </div>

            </div>
        </>

    );
}

export default Product;
