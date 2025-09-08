import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, BrowserRouter } from 'react-router-dom';
import { CodjoeProvider } from '../context/CodjoeContext';
import Navbar from '../components/Navbar';
import HomeHead from '../components/HomeHead';
import BestSellers from '../components/BestSellers';
import PerfectMix from '../components/PerfectMix';


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
            <div className='mx-16'>
                <section className='bg-home-head h-0 pt-[116%] w-screen bg-contain bg-no-repeat max-w-full mt-20 lg:hidden'>
                    <HomeHead screen={screen} />
                </section>
                <section className=' lg:block mt-20 hidden'>
                    <HomeHead screen={screen} />
                </section>
                <section className='mx-10'>
                    <h1 className='text-5xl font-bold font text-black '>Best sellers</h1>
                    <BestSellers />
                </section>
                <section className='mt-20'>
                    <PerfectMix />
                </section>
            </div>
        </>
    )
}

export default Home

{/* <div className='bg-home-head bg-cover bg-center w-full h-52'> */ }
{/* <div className='bg-home-head bg-cover w-full h-[56vh] max-h-full object-scale-down bg-center mt-20'> */ }