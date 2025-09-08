import React from 'react';
import { Outlet } from 'react-router-dom';

const Legal = () => {
    return (
        <div className='bg-white text-black min-h-screen pt-20'>
            <div className='w-full'>
                <Outlet />
            </div>
        </div>
    );
}

export default Legal;
