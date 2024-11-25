import React, { useEffect, useState } from 'react';
import { useCodjoeData } from '../../context/CodjoeContext';

import editIcon from '../../assets/icons/bOffice/edit.png';
import deleteIcon from '../../assets/icons/bOffice/delete.png';
import Modal from './Modal';

const CJProducts = () => {

    const { products } = useCodjoeData();

    const [newProductModal, setNewProductModal] = useState(false);
    const [seeMainImgModal, setSeeMainImgModal] = useState(false);
    const [mainImg, setMainImg] = useState('');
    const [deleteProductModal, setDeleteProductModal] = useState(false);
    const [deleteData, setDeleteData] = useState({});


    const titles = [
        'Name', 'Price', 'Av. quantity', 'Main image', 'Others images', 'SoldOut', 'Available sizes', 'Category', ''
    ]

    useEffect(() => {

        console.log('proddcj', products);

    }, []);

    const mainImgData = (img) => {

        setSeeMainImgModal(true)
        setMainImg(img)

        const ttest = true

        console.log('nool test', ttest.toString());
        
    }

    const deleteProductData = (data) => {
        setDeleteProductModal(true)
        setDeleteData(data)
    }

    return (
        <div className='w-full text-black h-[87.7vh] bg-sky-500 p-2'>
            <div className='bg-green-200 h-full'>
                {/* <h1>productss</h1> */}
                <div className='py-2 px-5'>
                    {/* <div className='drop-shadow-2xl shadow-2xl h-10 bg-white mb-5 min-w-[65rem] overflow-auto'>

                    </div> */}
                    <button className='h-10 w-40 rounded-2xl bg-slate-400 mb-3' onClick={() => setNewProductModal(true)}>
                        Add New Products
                    </button>
                    {
                        newProductModal && (
                            <Modal setOpenModal={setNewProductModal} openModal={newProductModal} title={'New product'} type={'addProduct'} />
                        )
                    }
                    {
                        seeMainImgModal && (
                            <Modal setOpenModal={setSeeMainImgModal} openModal={seeMainImgModal} title={'Main Image'} type={'mainImg'} mainImg={mainImg} />
                        )
                    }
                    {
                        deleteProductModal && (
                            <Modal setOpenModal={setDeleteProductModal} openModal={deleteProductModal} title={'Delete Product'} type={'deleteProduct'} deleteData={deleteData} />
                        )
                    }

                    {/* products tab  */}
                    <div className='drop-shadow-2xl shadow-2xl h-[30rem] bg-white p-5 min-w-[65rem] overflow-auto'>

                        <table className="table-auto w-full h-full">
                            <thead >
                                <tr>
                                    {titles.map((e) => (
                                        <th key={e} className='ml-3 border-b pb-5 px-3'>{e}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className='mt-5'>
                                {products.map((e) => (
                                    <tr key={e._id} className='text-center'>
                                        <td className='py-5 text-left'>{e.name}</td>
                                        <td className='py-5'>{e.price}</td>
                                        <td className='py-5'>{e.quantity}</td>
                                        <td className='py-5'><button onClick={() => mainImgData(e.mainImg)} className='border-4 p-1 rounded-full'>see</button></td>
                                        <td className='py-5'><button className='border-4 p-1 rounded-full'>see</button></td>
                                        <td className='py-5'>{'false'}</td>
                                        <td className='py-5'>{'S, M, L, XL'}</td>
                                        <td className='py-5'>{e.category}</td>
                                        <td className='flex justify-center items-center h-full w-full py-5'>
                                            {/* <img className='h-5 mx-1 cursor-pointer' src={editIcon} alt="edit" /> */}
                                            <img className='h-6 mx-1 cursor-pointer' onClick={() => deleteProductData({ name: e.name, id: e._id })} src={deleteIcon} alt="delete" />
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>

                        {/* /// */}
                        {/* <div className="flex justify-center mb-5">
                            <div className=" h-14 flex justify-around p-1  w-[97%]">
                                <div className='text-center mr-3'>
                                    <p className=' border-b'>name</p>
                                </div>
                                <div className='text-center mr-3'>
                                    <p className=' border-b'>price</p>
                                </div>
                                <div className='text-center mr-3'>
                                    <p className=' border-b'>Av. quantity</p>
                                </div>
                                <div className='text-center mr-3'>
                                    <p className=' border-b'>Main image</p>
                                </div>
                                <div className='text-center mr-3'>
                                    <p className=' border-b'>Others images</p>
                                </div>
                                <div className='text-center mr-3'>
                                    <p className=' border-b'>SoldOut</p>
                                </div>
                                <div className='text-center mr-3'>
                                    <p className=' border-b'>Available sizes</p>
                                </div>
                                <div className='text-center mr-3'>
                                    <p className=' border-b'>Category</p>
                                </div>
                            </div>
                        </div> */}

                        {/* <div className="flex mb-5">
                            <div className="border h-14 flex justify-around p-1 drop-shadow-2xl shadow-2xl w-[97%]">
                                <div className='text-center mr-3'>
                                    <p className='text-sms'>codjoe xhite shirt</p>
                                </div>
                                <div className='text-center mr-3'>
                                    <p>50$</p>
                                </div>
                                <div className='text-center mr-3'>
                                    <p>5</p>
                                </div>
                                <div className='text-center mr-3'>
                                    <button>see</button>
                                </div>
                                <div className='text-center mr-3'>
                                    <button>see</button>
                                </div>
                                <div className='text-center mr-3'>
                                    <p>false</p>
                                </div>
                                <div className='text-center mr-3'>
                                    <p>S, M, L, XL</p>
                                </div>
                                <div className='text-center mr-3'>
                                    <p>Tops</p>
                                </div>
                            </div>
                            <div className='w-[3%] h-14'>
                                <div className='h-7 flex justify-center items-center'><img className='h-5 ' src={editIcon} alt="edit" /></div>
                                <div className='h-7 flex justify-center items-center'><img className='h-6 ' src={deleteIcon} alt="delete" /></div>
                            </div>
                        </div> */}


                        {/* <div className="flex">
                            <div className="border h-14 flex justify-around p-1 drop-shadow-2xl shadow-2xl w-[97%]">
                                <div className='text-center mr-3'>
                                    <p className=' border-b'>name</p>
                                    <p className='text-sms'>codjoe xhite shirt</p>
                                </div>
                                <div className='text-center mr-3'>
                                    <p className=' border-b'>price</p>
                                    <p>50$</p>
                                </div>
                                <div className='text-center mr-3'>
                                    <p className=' border-b'>Av. quantity</p>
                                    <p>5</p>
                                </div>
                                <div className='text-center mr-3'>
                                    <p className=' border-b'>Main image</p>
                                    <button>see</button>
                                </div>
                                <div className='text-center mr-3'>
                                    <p className=' border-b'>Others images</p>
                                    <button>see</button>
                                </div>
                                <div className='text-center mr-3'>
                                    <p className=' border-b'>SoldOut</p>
                                    <p>false</p>
                                </div>
                                <div className='text-center mr-3'>
                                    <p className=' border-b'>Available sizes</p>
                                    <p>S, M, L, XL</p>
                                </div>
                                <div className='text-center mr-3'>
                                    <p className=' border-b'>Category</p>
                                    <p>Tops</p>
                                </div>
                            </div>
                            <div className='w-[3%] h-14'>
                                <div className='h-7 flex justify-center items-center'><img className='h-5 ' src={editIcon} alt="edit" /></div>
                                <div className='h-7 flex justify-center items-center'><img className='h-6 ' src={deleteIcon} alt="delete" /></div>
                            </div>
                        </div> */}

                    </div>


                    {/* // */}
                </div>
                {/* <div className='w-2/5 flex justify-center m-7'>
                    <div className=' bg-slate-400 w-4/5 h-4/5 rounded-2xl drop-shadow-2xl'>
                        <div className='bg-white h-1/5 rounded-t-2xl border-b-2 border-black flex justify-center items-center'>
                            <input className='rounded-2xl bg-white border-2 border-black p-2' placeholder='Search product' type="text" />
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
                </div> */}
            </div>
        </div>
    );
}

export default CJProducts;
