import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCodjoeData } from '../context/CodjoeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from './SEO';

const Product = () => {

    const { id } = useParams();
    const { sizesData, setOneProductId, oneProduct, addCartNewProduct } = useCodjoeData();

    const [product, setProduct] = useState({});
    const [sizeOpen, setSizeOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState('');
    const [lgSizeOpen, setLgSizeOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [allImages, setAllImages] = useState([])

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
            setProduct(oneProduct);
            // Combiner l'image principale et les images supplémentaires
            const images = [oneProduct.mainImg, ...(oneProduct.imgs || [])].filter(Boolean);
            setAllImages(images);
        }
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
        // Réinitialiser l'état lors du changement de produit
        setCurrentImageIndex(0);
        setSelectedSize('');
        setSizeOpen(false);
        setLgSizeOpen(false);

    }, [id, setOneProductId]);

    const toggleSize = () => {
        setSizeOpen(!sizeOpen);
        console.log('size open', sizeOpen);
    }

    const handleSize = (size) => {
        setSelectedSize(size);
    }

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };


    return (
        <>
            <SEO 
                title={product.name ? `${product.name} - CODJOE` : 'Loading Product - CODJOE'}
                description={product.name ? `Shop ${product.name} at CODJOE. Premium quality, modern design. Price: €${product.price}. Available in multiple sizes.` : 'Loading...'}
                keywords={product.name ? `${product.name}, ${product.category || 'fashion'}, streetwear, CODJOE, online shopping` : 'fashion, streetwear'}
                image={product.mainImg || '/codjoe_logo.png'}
                type="product"
            />
            {product.name && (
                <Helmet>
                    <script type="application/ld+json">
                        {JSON.stringify({
                            "@context": "https://schema.org/",
                            "@type": "Product",
                            "name": product.name,
                            "image": product.mainImg,
                            "description": `${product.name} - Premium ${product.category || 'fashion'} by CODJOE`,
                            "brand": {
                                "@type": "Brand",
                                "name": "CODJOE"
                            },
                            "offers": {
                                "@type": "Offer",
                                "url": window.location.href,
                                "priceCurrency": "EUR",
                                "price": product.price,
                                "availability": "https://schema.org/InStock",
                                "seller": {
                                    "@type": "Organization",
                                    "name": "CODJOE"
                                }
                            }
                        })}
                    </script>
                </Helmet>
            )}

            {/* Version Desktop */}
            <div className='max-[1023px]:hidden bg-white pt-20 min-h-screen pb-10'>
                <div className='max-w-7xl mx-auto px-6 lg:px-8 pt-8'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
                        
                        {/* Carousel d'images */}
                        <div className='sticky top-24'>
                            {allImages.length > 0 ? (
                                <div className='space-y-4'>
                                    {/* Image principale */}
                                    <div className='relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-gray-100'>
                                        <AnimatePresence mode='wait'>
                                            <motion.img
                                                key={currentImageIndex}
                                                src={allImages[currentImageIndex]}
                                                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                                                className='w-full h-full object-cover'
                                                initial={{ opacity: 0, scale: 1.05 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </AnimatePresence>

                                        {/* Boutons de navigation */}
                                        {allImages.length > 1 && (
                                            <>
                                                <button
                                                    onClick={prevImage}
                                                    className='absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110'
                                                    aria-label="Previous image"
                                                >
                                                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={nextImage}
                                                    className='absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110'
                                                    aria-label="Next image"
                                                >
                                                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>

                                                {/* Indicateurs */}
                                                <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
                                                    {allImages.map((_, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => goToImage(index)}
                                                            className={`h-2 rounded-full transition-all duration-300 ${
                                                                index === currentImageIndex 
                                                                    ? 'w-8 bg-white' 
                                                                    : 'w-2 bg-white/50 hover:bg-white/75'
                                                            }`}
                                                            aria-label={`Go to image ${index + 1}`}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Miniatures */}
                                    {allImages.length > 1 && (
                                        <div className='grid grid-cols-4 gap-3'>
                                            {allImages.map((image, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => goToImage(index)}
                                                    className={`aspect-square rounded-lg overflow-hidden transition-all duration-200 ${
                                                        index === currentImageIndex
                                                            ? 'ring-2 ring-codjoe-biscuit ring-offset-2 shadow-lg'
                                                            : 'opacity-60 hover:opacity-100 hover:shadow-md'
                                                    }`}
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`Thumbnail ${index + 1}`}
                                                        className='w-full h-full object-cover'
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Loading State
                                <div className='aspect-[3/4] rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center animate-pulse'>
                                    <div className="w-16 h-16 border-4 border-gray-300 border-t-codjoe-biscuit rounded-full animate-spin"></div>
                                </div>
                            )}
                        </div>

                        {/* Informations produit */}
                        <div className='text-black space-y-6'>
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
            {/* Version Mobile */}
            <div className='lg:hidden bg-white pt-20 min-h-screen pb-32'>
                {/* Images scroll */}
                <div className='space-y-2'>
                    {allImages.length > 0 ? (
                        allImages.map((image, index) => (
                            <div key={index} className='aspect-[3/4] w-full bg-gray-100'>
                                <img 
                                    className='w-full h-full object-cover' 
                                    src={image} 
                                    alt={`${product.name} - Image ${index + 1}`}
                                    loading={index === 0 ? "eager" : "lazy"}
                                />
                            </div>
                        ))
                    ) : (
                        <div className='aspect-[3/4] w-full bg-gray-200 flex items-center justify-center animate-pulse'>
                            <div className="w-12 h-12 border-4 border-gray-300 border-t-codjoe-biscuit rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>

                {/* Footer fixe avec informations et actions */}
                <div className='fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-50'>
                    {/* Panel de sélection de taille (se déploie vers le haut) */}
                    <div 
                        className={`bg-codjoe-biscuit transition-all duration-500 overflow-hidden ${
                            sizeOpen ? 'max-h-[380px]' : 'max-h-0'
                        }`}
                    >
                        <div className='p-6 space-y-3'>
                            <div className='bg-white rounded-2xl py-3 text-center'>
                                <p className='font-semibold text-gray-900'>Sélectionnez votre taille</p>
                            </div>
                            <div className='space-y-2'>
                                {sizesData.map((size, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            handleSize(size);
                                            toggleSize();
                                        }}
                                        className={`w-full py-3 rounded-2xl font-medium transition-all duration-200 ${
                                            selectedSize === size
                                                ? 'bg-white text-gray-900 shadow-lg'
                                                : 'text-white hover:bg-white/10'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Informations et boutons principaux */}
                    <div className='p-4 space-y-3 border-t border-gray-100'>
                        {/* Nom et prix */}
                        <div>
                            <h1 className='font-bold text-xl text-gray-900 line-clamp-1'>
                                {product.name}
                            </h1>
                            <p className='text-2xl font-bold text-codjoe-biscuit mt-1'>
                                €{product.price}
                            </p>
                        </div>

                        {/* Boutons d'action */}
                        <div className='flex gap-3'>
                            <button
                                onClick={toggleSize}
                                className='flex-1 h-12 bg-white border-2 border-gray-200 rounded-xl font-medium text-gray-900 flex items-center justify-center gap-2 transition-all duration-200 active:scale-95'
                            >
                                {selectedSize ? (
                                    <>
                                        <span>Taille:</span>
                                        <span className='font-bold text-codjoe-biscuit'>{selectedSize}</span>
                                    </>
                                ) : (
                                    'Choisir taille'
                                )}
                            </button>
                            
                            <Link
                                onClick={() => {
                                    if (selectedSize) {
                                        handleCart();
                                    }
                                }}
                                to={selectedSize ? '/cart' : '#'}
                                className={`flex-1 h-12 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 ${
                                    selectedSize
                                        ? 'bg-codjoe-biscuit text-white shadow-lg'
                                        : 'bg-gray-200 text-gray-400'
                                }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Acheter
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Product;
