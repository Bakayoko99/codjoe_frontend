import React from 'react';
import Buttons from './Buttons';

const PerfectMix = () => {

    const perfectMixBtnData = [
        {
            type: '',
            btn1: {
                text: 'View all',
                // link: '/list/tops',
            }
        }
    ]
    return (
        <div className='pb-4 sm:pb-6 px-4 sm:px-6 lg:px-8'>
            <h1 className='font-serif text-xl sm:text-2xl lg:text-3xl text-black text-center mb-4 sm:mb-6'>Codjoe's perfect mix</h1>
            <div className='bg-perfect-mix h-0 pt-[100%] sm:pt-[110%] lg:pt-[117%] bg-contain bg-center bg-no-repeat my-4 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg'>
                <div className='relative h-full flex justify-end items-end p-4 sm:p-6 lg:p-7'>
                    <Buttons data={perfectMixBtnData} />
                </div>
            </div>
        </div>
    );
}

export default PerfectMix;
