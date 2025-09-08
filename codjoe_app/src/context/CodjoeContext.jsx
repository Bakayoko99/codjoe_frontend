import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Buffer } from 'buffer';
import { jwtDecode } from 'jwt-decode'
import { useLocalStorage } from '../hooks/useLocalStorage';

export const CodjoeContext = React.createContext();

export const CodjoeProvider = ({ children, initialValue }) => {

    const navigate = useNavigate();

    // const backUrl = 'https://codjoe-backend.onrender.com' || 'http://localhost:8085'

    const backUrl = 'http://localhost:8085'

    //* products states
    const [products, setProducts] = useState([]);
    const [oneProductId, setOneProductId] = useState('');
    const [oneProduct, setOneProduct] = useState('');
    const [manyProducts, setManyProducts] = useState([]);
    const [testProducts, setTestProducts] = useState([]);
    const [addNewProduct, setAddNewProduct] = useState(null);
    const [deleteProduct, setDeleteProduct] = useState('');


    //* auth states
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [userID, setUserID] = useState('');
    const [loginSuccess, setLoginSucess] = useState(false);

    const [user, setUser] = useLocalStorage("codjoe-user", null);

    const [userSignupData, setUserSignupData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        country: '',
        birthday: ''
    });
    const [userLoginData, setUserLoginData] = useState({
        email: '',
        password: ''
    });

    const [userRole, setUserRole] = useState(null);
    //
    //* cart states

    const [userCart, setUserCart] = useState([]);
    const [cartSubtotal, setCartSubtotal] = useState('');

    //* payment states
    // const [sPublicKey, setSPublicKey] = useState(null);
    const [clientSecret, setClientSecret] = useState('');


    const loginRes = async (userData) => {

        // const res = await axios.get('http://localhost:8085/api/codjoe')
        const res = await axios.post(`${backUrl}/api/auth/login`, userData)

        console.log('logTTT ', res);

        if (res?.status == 200) {

            setIsLoggedIn(true);
            setLoginSucess(true)
            // localStorage.setItem("codjoe-user", res.data.token)
            setUser(res.data.token)
            console.log('storage data: ', localStorage.getItem('codjoe-user'));
            navigate('/');
        }
    }

    const signUpRes = async (userData) => {

        const res = await axios.post(`${backUrl}/api/auth/signup`, userData)

        if (res.status === 200) {
            setIsSignup(true);
        }

        console.log('signup response', res.data);

    }

    useEffect(() => {
        console.log('userLoginData', userLoginData);

        for (let key in userLoginData) {
            if (userLoginData[key] === '') {
                console.log('empty field');
                return;
            }
        }

        loginRes(userLoginData)

    }, [userLoginData]);

    useEffect(() => {
        console.log('userSignupData', userSignupData);

        for (let key in userSignupData) {
            if (userSignupData[key] === '') {
                console.log('empty field');
                return;
            }
        }
        signUpRes(userSignupData)
    }, [userSignupData]);

    // useEffect(() => {
    //     if (isLoggedIn) {
    //         // axios.get('http://localhost:8085/api/:userID/cart', userSignupData).then((res) => {

    //         //     if (res.status === 200) {
    //         //         setIsSignup(true);
    //         //     }

    //     console.log('signup response', res.data);
    //         // });
    //     }
    // }, [isLoggedIn, isSignup])

    const sizesData = ['S', 'M', 'L', 'XL', 'XXL'];

    let testData = testProducts.map((item) => {
        return {
            id: item.id,
            name: item.title,
            price: item.price,
            image: item.image,
            soldOut: false
        }
    });

    const convertImg = (data, contentType) => {
        const imgToBase64 = Buffer.from(data, 'binary').toString('base64')
        return `data:${contentType};base64,${imgToBase64}`

    }

    const getProducts = async () => {

        const res = await axios.get(`${backUrl}/api/products`)

        const products = []

        res.data?.forEach(product => {

            const mainImg = product.mainImg
            product.mainImg = convertImg(mainImg.data.data, mainImg.contentType)

            const imgs = product.imgs
            product.imgs = imgs.map(img => convertImg(img.data.data, img.contentType))

            products.push(product)
        });

        setProducts(products)

    }

    const getOneProduct = async (id) => {

        const res = await axios.get(`${backUrl}/api/products/${id}`)
        const product = res.data

        if (product) {
            product.mainImg = convertImg(product.mainImg.data.data, product.mainImg.contentType)
            product.imgs = product.imgs.map(img => convertImg(img.data.data, img.contentType))

            setOneProduct(product)
        }
    }

    const getUserCart = async (id) => {
        const res = await axios.get(`${backUrl}/api/users/${id}/cart`)
        const cartProducts = res.data.data
        const convertedProducts = []


        if (res.status === 200) {
            cartProducts.forEach(async (elem) => {
                const res = await axios.get(`${backUrl}/api/products/${elem.productId}`)
                const productData = res.data

                if (productData) {
                    convertedProducts.push({
                        id: elem.productId,
                        name: productData.name,
                        price: productData.price,
                        mainImg: convertImg(productData.mainImg.data.data, productData.mainImg.contentType),
                        imgs: productData.imgs.map(img => convertImg(img.data.data, img.contentType)),
                        size: elem.size.toUpperCase(),
                        quantity: elem.quantity
                    })
                }

            })
            setUserCart(convertedProducts)
        }

    }

    const addCartNewProduct = async (newProduct) => {
        console.log('product added to cart contexttttt kkk', { newItems: [newProduct] });
        console.log('product added to cart contexttttt kkk2222', userID);

        if (newProduct) {
            const res = await axios.post(`${backUrl}/api/users/${userID}/cart/add`, { newItems: [newProduct] })

            if (res.status === 200) {
                navigate(0)
            }

        }

    }

    const sendAddNewProduct = async (newProductData) => {

        if (newProductData) {

            const res = await axios.post(`${backUrl}/api/products/add`,

                newProductData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            )

            if (res.status === 200) {
                console.log('new Product Added', res);

            } else {
                console.log('error product not added');

            }

        }

    }

    const sendDeleteProduct = async (id) => {

        const res = await axios.delete(`${backUrl}/api/products/delete/${id}`)

        if (res.status === 200) {
            console.log('product deleted:', res);

        } else {
            console.log('not deleted');

        }
        console.log('send delete id ', id);

    }

    useEffect(() => {

        if (deleteProduct.length > 1) sendDeleteProduct(deleteProduct)

    }, [deleteProduct]);

    useEffect(() => {

        if (addNewProduct != null) {
            sendAddNewProduct(addNewProduct)
        }

    }, [addNewProduct]);

    // const getStripePublicKey = async () => {

    //     const res = await axios.get('http://localhost:8085/api/config')

    //     setSPublicKey(res.data)

    // }

    const createPaymentIntent = async () => {
        const res = await axios.post(`${backUrl}/api/pay`)

        console.log("context create pay");


        setClientSecret(res.data)
    }

    useEffect(() => {
        let subtotal = 0
        if (userCart.length >= 1) {

            userCart.forEach((elem) => (
                subtotal = (parseInt(elem.price) * elem.quantity) + subtotal
            ))
            setCartSubtotal(subtotal.toString())
        }

    });

    useEffect(() => {
        // getUserCart(userID)
        if (user != null) {
            const decodedToken = jwtDecode(user)
            setUserID(decodedToken.user.id)
            setUserRole(decodedToken.user.role)
            getUserCart(decodedToken.user.id)
            console.log('user logged in new user state', decodedToken);
        }


    }, [user]);


    const getManyProducts = async (productsArr) => {

        let productArrRes = []

        if (productsArr.length >= 1) {
            productsArr.forEach(async (elemId) => {
                const res = await axios.get(`${backUrl}/api/products/${elemId}`)
                const productData = res.data

                if (productData) {
                    productData.mainImg = convertImg(productData.mainImg.data.data, productData.mainImg.contentType)
                    productData.imgs = productData.imgs.map(img => convertImg(img.data.data, img.contentType))
                    productArrRes.push(productData)
                    console.log('getManyProducts contextt: Testtt22 ', productData);
                    console.log('getManyProducts contextt: ', productArrRes);
                }

            })

            setManyProducts(productArrRes)
        }


        console.log('getManyProducts contextt Test: ', productsArr.length);

    }

    useEffect(() => {
        if (oneProductId.length > 1) getOneProduct(oneProductId)
    }, [oneProductId]);


    useEffect(() => {

        // axios.get('https://fakestoreapi.com/products').then((res) => {
        // console.log('response', res.data);
        //     setTestProducts(res.data);

        // });

        getProducts()

        homeHeadLgData()

        const token = localStorage.getItem('codjoe-user')
        console.log('token decodeddd', token);
        // if (token != null) {

        //     const decodedToken = jwtDecode(token)
        //     const currentDate = new Date()

        //     if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("Token expired.");
        //         setIsLoggedIn(false)
        //         setUserID('')
        //     } else {
        console.log("Valid token");
        //         setIsLoggedIn(true)
        //         setUserID(decodedToken.user.id)
        //     }

        // console.log('token decodeddd', decodedToken);
        console.log('token user', userID);
        // }


    }, []);

    const homeHeadLgData = () => {
        const homeHeadProducts = [
            '65f8da98b5ba701fca305d4d',
            '6644ba223f1fd26bf1a66776',
            '6644b60b3f1fd26bf1a66772',
        ]

        getManyProducts(homeHeadProducts)

    }

    // const bestSellersData = () => {

    // }



    console.log('testData', testData);

    return (
        <CodjoeContext.Provider value={{
            ...initialValue,
            products, setProducts,
            setOneProductId,
            oneProduct,
            testData, sizesData,

            isLoggedIn, setIsLoggedIn,
            loginSuccess,
            userID,
            userRole,
            setUserSignupData,
            setUserLoginData,
            isSignup,
            user,
            userCart,
            cartSubtotal,
            // setCartNewProduct,
            addCartNewProduct,
            // getManyProducts,
            manyProducts,
            setAddNewProduct,
            setDeleteProduct,

            // getStripePublicKey,
            // sPublicKey,

            createPaymentIntent,
            clientSecret
        }}>
            {children}
        </CodjoeContext.Provider>
    );
}

export const useCodjoeData = () => {
    return useContext(CodjoeContext);
}