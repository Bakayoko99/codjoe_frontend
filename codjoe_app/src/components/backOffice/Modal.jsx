import React from 'react';
import { categories } from '../../constants';
import { useCodjoeData } from '../../context/CodjoeContext';

const Modal = ({ setOpenModal, openModal, title, type, mainImg, deleteData }) => {

    const { setAddNewProduct, setDeleteProduct } = useCodjoeData();


    const sizesList = [
        {
            name: 'size_s',
            size: 'S'
        },
        {
            name: 'size_m',
            size: 'M'
        },
        {
            name: 'size_l',
            size: 'L'
        },
        {
            name: 'size_xl',
            size: 'XL'
        },
        {
            name: 'size_xxl',
            size: 'XXL'
        }
    ]

    const addProductSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: e.target.product_name.value,
            price: e.target.price.value,
            quantity: e.target.quantity.value,
            soldOut: e.target.soldOut.value,
            mainImg: e.target.main_image.files[0],
            imgs: e.target.images.files,
            sizes: [],
            category: e.target.category.value,

        }

        let sizesTarget = e.target.sizes

        sizesTarget.forEach(size => {
            if (size.checked) {
                data.sizes.push(size.defaultValue)
            }

        });

        data.sizes = data.sizes.join(',')


        function getFormData(object) {
            const formData = new FormData();
            Object.keys(object).forEach(key => {
                const value = object[key];
                if (Array.isArray(value)) {
                    value.forEach(val => formData.append(key, val));
                } else if (value instanceof FileList) {
                    Array.from(value).forEach(file => formData.append(key, file));
                } else if (value !== undefined) {
                    formData.append(key, value);
                }
            });
            return formData;
        }

        const formData = getFormData(data);

        setAddNewProduct(formData)
        setOpenModal(false)
        window.location.reload()

    }

    const handleDeleteProduct = (data) => {

        console.log('delete data ', data);

        setDeleteProduct(data.id)
        setOpenModal(false)
        window.location.reload()
    }


    return (
        <>
            {
                type === 'addProduct' &&

                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" >

                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn" >

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                                <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl animate-slideUp">
                                    <form onSubmit={addProductSubmit}>

                                        <div className="bg-gradient-to-br from-white to-gray-50 px-6 pb-6 pt-6 sm:p-8 sm:pb-6">
                                            <div className="sm:flex sm:items-start">

                                                <div className="w-full">
                                                    {/* Header avec icône */}
                                                    <div className="flex items-center gap-3 mb-6">
                                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C29F75] to-[#B8956A] flex items-center justify-center shadow-lg">
                                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                                            </svg>
                                                        </div>
                                                        <h3 className="text-2xl font-bold text-gray-900" id="modal-title">{title}</h3>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-6">

                                                        <div className="sm:col-span-3">
                                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Product name *</label>
                                                            <input 
                                                                type="text" 
                                                                name="product_name" 
                                                                id="product-name" 
                                                                required
                                                                className="block w-full rounded-xl border-2 border-gray-200 p-3 text-gray-900 bg-white shadow-sm focus:border-[#C29F75] focus:ring-2 focus:ring-[#C29F75]/20 transition-all duration-200 sm:text-sm" 
                                                                placeholder="Enter product name"
                                                            />
                                                        </div>

                                                        <div className="sm:col-span-3">
                                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price (€) *</label>
                                                            <input 
                                                                type="number" 
                                                                name="price" 
                                                                id="price" 
                                                                required
                                                                step="0.01"
                                                                className="block w-full rounded-xl border-2 border-gray-200 p-3 text-gray-900 bg-white shadow-sm focus:border-[#C29F75] focus:ring-2 focus:ring-[#C29F75]/20 transition-all duration-200 sm:text-sm" 
                                                                placeholder="0.00"
                                                            />
                                                        </div>

                                                        <div className="sm:col-span-3">
                                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity *</label>
                                                            <input 
                                                                type="number" 
                                                                name="quantity" 
                                                                id="quantity" 
                                                                required
                                                                min="0"
                                                                className="block w-full rounded-xl border-2 border-gray-200 p-3 text-gray-900 bg-white shadow-sm focus:border-[#C29F75] focus:ring-2 focus:ring-[#C29F75]/20 transition-all duration-200 sm:text-sm" 
                                                                placeholder="0"
                                                            />
                                                        </div>

                                                        <div className="sm:col-span-3">
                                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Status *</label>
                                                            <div className="flex items-center gap-4 h-12">
                                                                <label className="flex items-center gap-2 cursor-pointer group">
                                                                    <input 
                                                                        className='w-4 h-4 text-[#C29F75] focus:ring-[#C29F75] border-gray-300 rounded' 
                                                                        type="radio" 
                                                                        name="soldOut" 
                                                                        value={true} 
                                                                    />
                                                                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Sold Out</span>
                                                                </label>
                                                                <label className="flex items-center gap-2 cursor-pointer group">
                                                                    <input 
                                                                        className='w-4 h-4 text-[#C29F75] focus:ring-[#C29F75] border-gray-300 rounded' 
                                                                        type="radio" 
                                                                        name="soldOut" 
                                                                        value={false} 
                                                                        defaultChecked
                                                                    />
                                                                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Available</span>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div className="sm:col-span-6">
                                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Main image *</label>
                                                            <input 
                                                                type='file' 
                                                                accept='image/*' 
                                                                name="main_image" 
                                                                id="main_image" 
                                                                required
                                                                className="block w-full text-sm text-gray-900 bg-white border-2 border-gray-200 rounded-xl cursor-pointer focus:border-[#C29F75] focus:ring-2 focus:ring-[#C29F75]/20 transition-all duration-200 file:mr-4 file:py-3 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold file:bg-[#C29F75] file:text-white hover:file:bg-[#B8956A] file:transition-colors file:duration-200" 
                                                            />
                                                        </div>

                                                        <div className="sm:col-span-6">
                                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Additional images</label>
                                                            <input 
                                                                type="file" 
                                                                accept='image/*' 
                                                                name="images" 
                                                                id="images" 
                                                                multiple 
                                                                className="block w-full text-sm text-gray-900 bg-white border-2 border-gray-200 rounded-xl cursor-pointer focus:border-[#C29F75] focus:ring-2 focus:ring-[#C29F75]/20 transition-all duration-200 file:mr-4 file:py-3 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 file:transition-colors file:duration-200" 
                                                            />
                                                            <p className="mt-1 text-xs text-gray-500">You can select multiple files</p>
                                                        </div>

                                                        <div className="sm:col-span-3">
                                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Available Sizes *</label>
                                                            <div className='flex gap-3 flex-wrap py-2'>
                                                                {
                                                                    sizesList.map((size) => (
                                                                        <label key={size.name} className='flex items-center gap-2 cursor-pointer group'>
                                                                            <input 
                                                                                type="checkbox" 
                                                                                id={size.name} 
                                                                                name="sizes" 
                                                                                value={size.size}
                                                                                className='w-4 h-4 text-[#C29F75] focus:ring-[#C29F75] border-gray-300 rounded' 
                                                                            />
                                                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{size.size}</span>
                                                                        </label>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>

                                                        <div className="sm:col-span-3">
                                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                                                            <select 
                                                                className='w-full bg-white border-2 border-gray-200 rounded-xl p-3 text-gray-900 focus:border-[#C29F75] focus:ring-2 focus:ring-[#C29F75]/20 transition-all duration-200 cursor-pointer' 
                                                                name="category" 
                                                                id="category_select"
                                                                required
                                                            >
                                                                <option value="">-- Choose a category --</option>
                                                                {
                                                                    categories.map((e) => (
                                                                        <option key={e.id} value={e.name.toLowerCase()}>{e.name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse sm:px-8 gap-3 border-t border-gray-200">
                                            <button 
                                                type="submit" 
                                                className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-[#C29F75] to-[#B8956A] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                Add Product
                                            </button>
                                            <button 
                                                type="reset" 
                                                onClick={() => setOpenModal(false)} 
                                                className="inline-flex w-full sm:w-auto justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                type === 'mainImg' &&

                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" onClick={() => setOpenModal(false)}>

                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="button" onClick={() => setOpenModal(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Close</button>
                                </div>
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="flex justify-center items-center flex-col">

                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <div className="mt-2 h-80 w-80">
                                                <img className='h-full object-cover w-full' src={mainImg} alt="mainImg" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                type === 'deleteProduct' &&

                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" >

                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                            <svg className="size-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                                <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                            </svg>
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <h3 className="text-base font-semibold text-gray-900" id="modal-title">{title} : {deleteData.name}</h3>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">Are you sure you want to delete this product ? All data will be permanently removed. This action cannot be undone.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="button" onClick={() => handleDeleteProduct(deleteData)} className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Delete</button>
                                    <button type="button" onClick={() => setOpenModal(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    );


}

export default Modal;



{/* <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" onClick={() => setOpenModal(false)}>

<div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                        <svg className="size-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" data-slot="icon">
                            <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                        </svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3 className="text-base font-semibold text-gray-900" id="modal-title">Deactivate account</h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Deactivate</button>
                <button type="button" onClick={() => setOpenModal(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
            </div>
        </div>
    </div>
</div>
</div> */}