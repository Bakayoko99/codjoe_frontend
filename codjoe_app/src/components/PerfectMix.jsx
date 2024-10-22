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
        <div className=' pb-6' >
            <h1 className=' font-serif text-2xl text-black text-center' >Codjoe's perfect mix</h1>
            <div className=' bg-perfect-mix h-0 pt-[117%] bg-contain bg-no-repeat my-4' >
                <div className='relative h-full flex justify-end items-end pt-7 pr-7'>
                    <Buttons data={perfectMixBtnData} />
                </div>
            </div>
        </div>
    );
}

export default PerfectMix;
