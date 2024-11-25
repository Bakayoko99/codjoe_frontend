import React, { useState } from 'react';
import { useCodjoeData } from '../../context/CodjoeContext';

const CJUsers = () => {

    const { } = useCodjoeData();


    const [accordion, setAccordion] = useState(0);

    // const handleAccordion = (n) => {



    // }


    return (
        <div className='w-full text-black h-[87.7vh] bg-sky-400 p-2'>
            <div className='bg-green-200 h-full flex'>
                {/* <h1>userss</h1> */}
                <div className=' w-3/5'>
                    {/* accordion */}
                    <div className='m-7 drop-shadow-2xl'>
                        <div className={`${accordion == 1 ? 'h-96' : 'h-10'} duration-500 bg-white border `} >
                            <p className="h-10 bg-sky-400 text-white justify-center flex items-center cursor-pointer" onClick={() => setAccordion(1)}>
                                Add User
                            </p>
                            <div className={`${accordion == 1 ? '' : 'hidden'} duration-300`}>
                                <form action="">
                                    <div className="mt-5 mx-3 grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label className="block text-sm/6 font-medium text-gray-900">First name</label>
                                            <div className="mt-2">
                                                <input type="text" name="first-name" id="first-name" className="block w-full rounded-md border-0 p-1.5 text-black bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label className="block text-sm/6 font-medium text-gray-900">Last name</label>
                                            <div className="mt-2">
                                                <input type="text" name="last-name" id="last-name" className="block w-full rounded-md border-0 p-1.5 text-black bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label className="block text-sm/6 font-medium text-gray-900">Email</label>
                                            <div className="mt-2">
                                                <input type="email" name="email" id="email" className="block w-full rounded-md border-0 p-1.5 text-black bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label className="block text-sm/6 font-medium text-gray-900">Password</label>
                                            <div className="mt-2">
                                                <input type="password" name="password" id="password" className="block w-full rounded-md border-0 p-1.5 text-black bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label className="block text-sm/6 font-medium text-gray-900">Country</label>
                                            <div className="mt-2">
                                                <input type="text" name="country" id="country" className="block w-full rounded-md border-0 p-1.5 text-black bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label className="block text-sm/6 font-medium text-gray-900">Birthday</label>
                                            <div className="mt-2">
                                                <input type="date" name="birthday" id="birthday" className="block w-full rounded-md border-0 p-1.5 text-black bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                                            </div>
                                        </div>
                                        <div className='sm:col-span-6 flex justify-center items-center'>
                                            <button type="submit"
                                                className="inline-flex items-center justify-center w-44 rounded-3xl bg-codjoe-biscuit p-2 py-3 mb-10 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400">
                                                Add User
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* <div>
                                <div class="border-b border-gray-900/10 pb-12">
                                    <h2 class="text-base/7 font-semibold text-gray-900">Personal Information</h2>
                                    <p class="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div class="sm:col-span-3">
                                            <label for="first-name" class="block text-sm/6 font-medium text-gray-900">First name</label>
                                            <div class="mt-2">
                                                <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                                            </div>
                                        </div>

                                        <div class="sm:col-span-3">
                                            <label for="last-name" class="block text-sm/6 font-medium text-gray-900">Last name</label>
                                            <div class="mt-2">
                                                <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="sm:col-span-4">
                                        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                                        <div class="mt-2">
                                            <input id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                                        </div>
                                    </div>

                                    <div class="sm:col-span-3">
                                        <label for="country" class="block text-sm/6 font-medium text-gray-900">Country</label>
                                        <div class="mt-2">
                                            <select id="country" name="country" autocomplete="country-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6">
                                                <option>United States</option>
                                                <option>Canada</option>
                                                <option>Mexico</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-span-full">
                                        <label for="street-address" class="block text-sm/6 font-medium text-gray-900">Street address</label>
                                        <div class="mt-2">
                                            <input type="text" name="street-address" id="street-address" autocomplete="street-address" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                                        </div>
                                    </div>
                                    <div class="sm:col-span-2 sm:col-start-1">
                                        <label for="city" class="block text-sm/6 font-medium text-gray-900">City</label>
                                        <div class="mt-2">
                                            <input type="text" name="city" id="city" autocomplete="address-level2" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                                        </div>
                                    </div>

                                    <div class="sm:col-span-2">
                                        <label for="region" class="block text-sm/6 font-medium text-gray-900">State / Province</label>
                                        <div class="mt-2">
                                            <input type="text" name="region" id="region" autocomplete="address-level1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                                        </div>
                                    </div>

                                    <div class="sm:col-span-2">
                                        <label for="postal-code" class="block text-sm/6 font-medium text-gray-900">ZIP / Postal code</label>
                                        <div class="mt-2">
                                            <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                                        </div>
                                    </div>
                                </div>
                            </div> */}


                        </div>
                        <div className={`${accordion == 2 ? 'h-80' : 'h-10'} duration-500 bg-white border `} >
                            <p className="h-10 bg-sky-400 text-white justify-center flex items-center cursor-pointer" onClick={() => setAccordion(2)}>
                                Edit User Details
                            </p>
                            <div>

                            </div>
                        </div>
                        <div className={`${accordion == 3 ? 'h-80' : 'h-10'} duration-500 bg-white border `} >
                            <p className="h-10 bg-sky-400" onClick={() => setAccordion(3)}>

                            </p>
                            <div>

                            </div>
                        </div>
                    </div>
                    {/* // */}
                </div>
                <div className='w-2/5 flex justify-center m-7'>
                    <div className=' bg-slate-400 w-4/5 h-4/5 rounded-2xl drop-shadow-2xl'>
                        <div className='bg-white h-1/5 rounded-t-2xl border-b-2 border-black flex justify-center items-center'>
                            <input className='rounded-2xl bg-white border-2 border-black p-2' placeholder='Search user' type="text" />
                        </div>
                        <div>
                            <div className='bg-slate-300 m-3 h-72 p-2 list-disc'>
                                <ul>
                                    <li className='h-7 px-3 border rounded-sm my-1&'>ok</li>
                                    <li className='h-7 px-3 border rounded-sm my-1&'>ok</li>
                                    <li className='h-7 px-3 border rounded-sm my-1&'>ok</li>
                                    <li className='h-7 px-3 border rounded-sm my-1&'>ok</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}





export default CJUsers;
