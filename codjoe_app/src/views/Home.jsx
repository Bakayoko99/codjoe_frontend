import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, BrowserRouter } from 'react-router-dom';
import { CodjoeProvider } from '../context/CodjoeContext';
import Navbar from '../components/Navbar';
import HomeHead from '../components/HomeHead';
import BestSellers from '../components/BestSellers';
import PerfectMix from '../components/PerfectMix';
import SEO from '../components/SEO';


const Home = () => {

    const [screen, setScreen] = useState('')

    useEffect(() => {

        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;

        if (screenHeight > screenWidth) {
            setScreen('sm-screens')
        } else {
            setScreen('lg-screens')
        }

        console.log('screen', screen);
        // console.log("Screen width:", screenWidth);
        // console.log("Screen height:", screenHeight);

    });


    return (
        <>
            <SEO 
                title="CODJOE - Premium Fashion & Streetwear Collection"
                description="Discover CODJOE's exclusive collection of premium streetwear. Shop the latest trends in tops, bottoms, and accessories. Free shipping on orders over €50."
                keywords="streetwear, fashion, premium clothing, CODJOE, tops, bottoms, best sellers, online shopping"
                type="website"
            />
            <div className='mx-4 sm:mx-8 lg:mx-16'>
                {/* Section mobile */}
                <section className='bg-home-head h-0 pt-[116%] w-full bg-contain bg-no-repeat max-w-full mt-20 lg:hidden mb-10'>
                    <HomeHead screen={screen} />
                </section>
                
                {/* Section desktop */}
                <section className='lg:block mt-20 hidden'>
                    <HomeHead screen={screen} />
                </section>
                
                {/* Section Best Sellers */}
                <section className='mx-2 sm:mx-6 lg:mx-10 mt-4 sm:mt-8 lg:mt-12'>
                    <h1 className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-black mb-2 sm:mb-3 lg:mb-4'>Best sellers</h1>
                    <BestSellers />
                </section>
                
                {/* Section Perfect Mix */}
                <section className='mt-12 sm:mt-16 lg:mt-20'>
                    <PerfectMix />
                </section>
            </div>
        </>
    )
}

export default Home

{/* <div className='bg-home-head bg-cover bg-center w-full h-52'> */ }
{/* <div className='bg-home-head bg-cover w-full h-[56vh] max-h-full object-scale-down bg-center mt-20'> */ }