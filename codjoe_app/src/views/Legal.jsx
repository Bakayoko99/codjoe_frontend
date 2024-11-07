import React from 'react';
import { Outlet } from 'react-router-dom';

const Legal = () => {
    return (
        <div className=' bg-white text-black min-h-[100vh] flex items-center pt-20 flex-col'>
            <div className='h-screen w-4/5 bg-codjoe-biscuit'>
                <Outlet />
            </div>

        </div>
    );
}

export default Legal;
