import React from 'react';

const CJUsers = () => {
    return (
        <div className='w-full text-black h-[87.7vh] bg-sky-500 p-2'>
            <div className='bg-green-200 h-full flex'>
                {/* <h1>userss</h1> */}
                <div className=' bg-slate-400 w-3/5'>okkk</div>
                <div className='bg-white w-2/5 flex justify-center items-center'>
                    <div className=' bg-red-500 w-4/5 h-4/5 rounded-2xl'>
                        <div className='bg-white h-1/5 rounded-t-2xl border-b-2 border-black flex justify-center items-center'>
                            <input className='rounded-2xl bg-white border-2 border-black p-2' placeholder='Search user' type="text" />
                        </div>
                        <div>
                            <div className='bg-slate-300 m-3 h-72 p-2 list-disc'>
                                <ul>
                                    <li>ok</li>
                                    <li>ok</li>
                                    <li>ok</li>
                                    <li>ok</li>
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
