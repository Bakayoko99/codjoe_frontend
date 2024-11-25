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

                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" >

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <form onSubmit={addProductSubmit}>

                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">

                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                    <h3 className="text-base font-semibold text-gray-900 text-center" id="modal-title">{title}</h3>
                                                    <div className="mt-5 mx-3 grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-6">

                                                        <div className="sm:col-span-3">
                                                            <label className="block text-sm/6 font-medium text-gray-900">Product name</label>
                                                            <div className="mt-2">
                                                                <input type="text" name="product_name" id="product-name" autoComplete="name" className="block w-full rounded-md border-0 p-1.5 text-black bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-3">
                                                            <label className="block text-sm/6 font-medium text-gray-900">Price</label>
                                                            <div className="mt-2">
                                                                <input type="number" name="price" id="price" autoComplete="price" className="block w-full rounded-md border-0 p-1.5 text-black bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-3">
                                                            <label className="block text-sm/6 font-medium text-gray-900">Quantity</label>
                                                            <div className="mt-2">
                                                                <input type="number" name="quantity" id="quantity" autoComplete="quantity" className="block w-full rounded-md border-0 p-1.5 text-black bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-3">
                                                            <label className="block text-sm/6 font-medium text-gray-900">SoldOut</label>
                                                            <div className="mt-2 h-9 flex items-center">
                                                                {/* <input type='radio' name="last-name" id="last-name" autoComplete="given-name" className="block w-full rounded-md border-0 p-1.5 text-black bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" /> */}
                                                                <label className="mr-2">
                                                                    <input className='mr-1' type="radio" name="soldOut" value={true} />
                                                                    True
                                                                </label>
                                                                <label className="radio">
                                                                    <input className='mr-1' type="radio" name="soldOut" value={false} />
                                                                    False
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-3">
                                                            <label className="block text-sm/6 font-medium text-gray-900">Main image</label>
                                                            <div className="mt-2">
                                                                <input type='file' accept='image/*' name="main_image" id="main_image" autoComplete="main_image" className="block w-full rounded-md border-0 p-1.5 text-black bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-3">
                                                            <label className="block text-sm/6 font-medium text-gray-900">Other images</label>
                                                            <div className="mt-2">
                                                                <input type="file" accept='image/*' name="images" id="images" multiple autoComplete="images" className="block w-full rounded-md border-0 p-1.5 text-black bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-3">
                                                            <label className="block text-sm/6 font-medium text-gray-900">Sizes</label>
                                                            <div className="mt-2">
                                                                {/* <input type='text' name="sizes" id="sizes" autoComplete="sizes" className="block w-full rounded-md border-0 p-1.5 text-black bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" /> */}
                                                                <div className='flex h-9 items-center'>
                                                                    {
                                                                        sizesList.map((size) => (
                                                                            <div key={size.name} className='mr-1'>
                                                                                <input type="checkbox" id={size.name} name="sizes" value={size.size} />
                                                                                <label className='ml-1' >{size.size}</label>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-3">
                                                            <label className="block text-sm/6 font-medium text-gray-900">Category</label>
                                                            <div className="mt-2 flex items-center h-9">
                                                                {/* <input type="text" name="category" id="category" autoComplete="category" className="block w-full rounded-md border-0 p-1.5 text-black bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" /> */}
                                                                <select className='bg-white' name="category" id="category_select">
                                                                    <option value="">-- choose a category--</option>
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
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button type="submit" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Add product</button>
                                            <button type="reset" onClick={() => setOpenModal(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
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