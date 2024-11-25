import React from 'react';
import { Link } from 'react-router-dom';

const AfterPay = () => {
    return (
        <div className='min-h-[99vh] bg-white pt-20 text-black'>
            <div className="flex flex-col mt-16 min-h-screen bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Checkout complete</h1>
                    <p className="text-sm text-gray-500 mt-6">
                        Thank you for your order<br />
                        you will receive an email with the order number.
                    </p>
                    <div className="mt-6 space-y-4 flex justify-center items-center">
                        <button
                            className="bg-codjoe-biscuit text-white mt-7 relative bottom-7 h-14 w-52 rounded-3xl font-medium flex justify-center items-center">
                            <Link to={'/'} >
                                Shop again
                            </Link>
                        </button>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default AfterPay;
