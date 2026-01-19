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
        <div className='w-full min-h-[87.7vh] bg-gradient-to-br from-gray-50 to-gray-100 p-6'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='mb-8 flex justify-between items-center'>
                    <div>
                        <h1 className='text-4xl font-bold text-gray-900 mb-2'>Products Management</h1>
                        <p className='text-gray-600'>Manage your product catalog</p>
                    </div>
                    <button 
                        className='bg-[#C29F75] hover:bg-[#B8956A] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1' 
                        onClick={() => setNewProductModal(true)}
                    >
                        + Add New Product
                    </button>
                </div>

                {/* Modals */}
                {newProductModal && (
                    <Modal setOpenModal={setNewProductModal} openModal={newProductModal} title={'New product'} type={'addProduct'} />
                )}
                {seeMainImgModal && (
                    <Modal setOpenModal={setSeeMainImgModal} openModal={seeMainImgModal} title={'Main Image'} type={'mainImg'} mainImg={mainImg} />
                )}
                {deleteProductModal && (
                    <Modal setOpenModal={setDeleteProductModal} openModal={deleteProductModal} title={'Delete Product'} type={'deleteProduct'} deleteData={deleteData} />
                )}

                {/* Products Table */}
                <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
                    <div className='overflow-x-auto'>
                        <table className="w-full">
                            <thead className='bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200'>
                                <tr>
                                    {titles.map((title, index) => (
                                        <th key={index} className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                                            {title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-200'>
                                {products.map((product, index) => (
                                    <tr key={product._id} className='hover:bg-gray-50 transition-colors'>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='flex items-center'>
                                                <div className='w-12 h-12 rounded-lg overflow-hidden bg-gray-100 mr-3'>
                                                    <img 
                                                        src={product.mainImg} 
                                                        alt={product.name}
                                                        className='w-full h-full object-cover'
                                                    />
                                                </div>
                                                <span className='text-sm font-medium text-gray-900'>{product.name}</span>
                                            </div>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <span className='text-sm font-semibold text-gray-900'>€{product.price}</span>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                            {product.quantity}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <button 
                                                onClick={() => mainImgData(product.mainImg)} 
                                                className='text-[#C29F75] hover:text-[#B8956A] font-medium text-sm'
                                            >
                                                View
                                            </button>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <button className='text-[#C29F75] hover:text-[#B8956A] font-medium text-sm'>
                                                View ({product.imgs?.length || 0})
                                            </button>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <span className='px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                                                In Stock
                                            </span>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                            S, M, L, XL, XXL
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <span className='px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'>
                                                {product.category || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                            <button 
                                                onClick={() => deleteProductData({ name: product.name, id: product._id })}
                                                className='text-red-600 hover:text-red-900 transition-colors'
                                            >
                                                <img className='h-5 w-5' src={deleteIcon} alt="delete" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {products.length === 0 && (
                        <div className='text-center py-12'>
                            <span className='text-6xl'>📦</span>
                            <p className='text-gray-500 mt-4'>No products found</p>
                        </div>
                    )}
                </div>

                {/* Summary */}
                <div className='mt-6 bg-white rounded-xl shadow-lg p-6'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-sm text-gray-600'>Total Products</p>
                            <p className='text-3xl font-bold text-gray-900'>{products.length}</p>
                        </div>
                        <span className='text-5xl'>📦</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CJProducts;
