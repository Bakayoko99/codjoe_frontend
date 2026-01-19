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
        console.log('getUserCart called with id:', id);
        try {
            const res = await axios.get(`${backUrl}/api/users/${id}/cart`)
            const cartProducts = res.data.data

            if (res.status === 200) {
                // Vérifier si le panier est vide
                if (!cartProducts || cartProducts.length === 0) {
                    console.log('getUserCart - cart is empty')
                    setUserCart([])
                    return
                }

                // Utiliser Promise.all pour attendre toutes les requêtes
                const promises = cartProducts.map(async (elem) => {
                    const res = await axios.get(`${backUrl}/api/products/${elem.productId}`)
                    const productData = res.data

                    if (productData) {
                        return {
                            id: elem.productId,
                            name: productData.name,
                            price: productData.price,
                            mainImg: convertImg(productData.mainImg.data.data, productData.mainImg.contentType),
                            imgs: productData.imgs.map(img => convertImg(img.data.data, img.contentType)),
                            size: elem.size.toUpperCase(),
                            quantity: elem.quantity
                        }
                    }
                    return null
                })

                const results = await Promise.all(promises)
                // Filtrer les résultats null et créer une nouvelle array pour forcer React à détecter le changement
                const validProducts = results.filter(product => product !== null)
                
                console.log('getUserCart - products loaded:', validProducts.length, 'items')
                // Utiliser une nouvelle référence pour forcer le re-render
                setUserCart([...validProducts])
            }
        } catch (error) {
            console.error('Error in getUserCart:', error);
            setUserCart([])
        }

    }

    const addCartNewProduct = async (newProduct) => {
        console.log('addCartNewProduct called with:', { newItems: [newProduct], userID });

        if (!userID) {
            console.error('Cannot add to cart: user not logged in');
            return;
        }

        if (newProduct) {
            try {
                const res = await axios.post(`${backUrl}/api/users/${userID}/cart/add`, { newItems: [newProduct] });
                if (res.status === 200) {
                    console.log('Product added/updated in cart successfully, response:', res.data)
                    // Petit délai pour s'assurer que le backend a bien enregistré
                    await new Promise(resolve => setTimeout(resolve, 100))
                    // Recharger le panier et attendre que ce soit terminé
                    await getUserCart(userID)
                    console.log('Cart reloaded successfully after adding product')
                    // Naviguer vers le panier
                    navigate('/cart')
                }
            } catch (error) {
                console.error('Error adding product to cart:', error);
                // En cas d'erreur, essayer quand même de recharger le panier
                await getUserCart(userID)
            }
        }

    }

    const removeCartProduct = async (productId, size) => {
        console.log('removeCartProduct called:', { productId, size, userID });

        if (!userID) {
            console.error('Cannot remove from cart: user not logged in');
            return;
        }

        if (productId) {
            try {
                const res = await axios.post(`${backUrl}/api/users/${userID}/cart/remove`, { 
                    productId, 
                    size 
                })

                if (res.status === 200) {
                    console.log('Product removed successfully, reloading cart...')
                    await getUserCart(userID)
                    console.log('Cart reloaded after removal')
                }
            } catch (error) {
                console.error('Error removing product:', error)
                throw error
            }
        }
    }

    const updateCartQuantity = async (productId, size, quantity) => {
        console.log('updateCartQuantity called:', { productId, size, quantity, userID });

        if (!userID) {
            console.error('Cannot update quantity: user not logged in');
            return;
        }

        if (productId && size && quantity) {
            try {
                const res = await axios.post(`${backUrl}/api/users/${userID}/cart/update-quantity`, { 
                    productId, 
                    size, 
                    quantity 
                })

                if (res.status === 200) {
                    console.log('Quantity updated successfully, reloading cart...')
                    await getUserCart(userID)
                    console.log('Cart reloaded after quantity update')
                }
            } catch (error) {
                console.error('Error updating quantity:', error)
                throw error
            }
        }
    }

    const updateCartSize = async (productId, oldSize, newSize) => {
        console.log('updateCartSize called:', { productId, oldSize, newSize, userID });

        if (!userID) {
            console.error('Cannot update size: user not logged in');
            return;
        }

        if (productId && oldSize && newSize) {
            try {
                const res = await axios.post(`${backUrl}/api/users/${userID}/cart/update-size`, { 
                    productId, 
                    oldSize, 
                    newSize 
                })

                if (res.status === 200) {
                    console.log('Size updated successfully, reloading cart...')
                    await getUserCart(userID)
                    console.log('Cart reloaded after size update')
                }
                return res
            } catch (error) {
                console.error('Error updating size:', error)
                throw error
            }
        }
    }

    // Créer une commande après paiement réussi
    const createOrder = async (paymentIntentId) => {
        console.log('Creating order after payment:', paymentIntentId);

        if (!userCart || userCart.length === 0) {
            throw new Error('Cart is empty');
        }

        try {
            // Préparer les items de la commande
            const items = userCart.map(item => ({
                productId: item.id,
                productName: item.name,
                productPrice: parseFloat(item.price),
                size: item.size,
                quantity: item.quantity,
                subtotal: parseFloat(item.price) * item.quantity
            }));

            const subtotal = parseFloat(cartSubtotal);
            const shippingFee = 5.99;
            const total = subtotal + shippingFee;

            const orderData = {
                items,
                subtotal,
                shippingFee,
                total,
                paymentIntentId
            };

            const res = await axios.post(
                `${backUrl}/api/users/${userID}/orders/create`,
                orderData,
                {
                    headers: {
                        'Authorization': `Bearer ${user}`
                    }
                }
            );

            if (res.status === 201) {
                console.log('Order created successfully:', res.data);
                // Recharger le panier (qui devrait maintenant être vide)
                await getUserCart(userID);
                return res.data;
            }
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    };

    // Récupérer les commandes de l'utilisateur
    const getUserOrders = async () => {
        try {
            const res = await axios.get(
                `${backUrl}/api/users/${userID}/orders`,
                {
                    headers: {
                        'Authorization': `Bearer ${user}`
                    }
                }
            );

            if (res.status === 200) {
                console.log('Orders fetched:', res.data);
                return res.data;
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    };

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

        console.log("context create pay", res.data);


        setClientSecret(res.data)
    }

    useEffect(() => {
        let subtotal = 0
        if (userCart.length >= 1) {
            userCart.forEach((elem) => {
                subtotal = (parseInt(elem.price) * elem.quantity) + subtotal
            })
            console.log('Cart subtotal recalculated:', subtotal, 'for cart:', userCart)
            setCartSubtotal(subtotal.toString())
        } else {
            console.log('Cart is empty, setting subtotal to 0')
            setCartSubtotal('0')
        }

    }, [userCart]);

    useEffect(() => {
        // getUserCart(userID)
        if (user != null) {
            const decodedToken = jwtDecode(user)
            setUserID(decodedToken.user.id)
            setUserRole(decodedToken.user.role)
            setIsLoggedIn(true)
            getUserCart(decodedToken.user.id)
            console.log('user logged in new user state', decodedToken);
        } else {
            // Si pas de user, on est déconnecté
            setIsLoggedIn(false)
            setUserID('')
            setUserRole(null)
            setUserCart([])
        }


    }, [user]);    const getManyProducts = async (productsArr) => {

        if (productsArr.length >= 1) {
            // Utiliser Promise.all pour charger tous les produits en parallèle
            const promises = productsArr.map(async (elemId) => {
                try {
                    const res = await axios.get(`${backUrl}/api/products/${elemId}`)
                    const productData = res.data

                    if (productData) {
                        productData.mainImg = convertImg(productData.mainImg.data.data, productData.mainImg.contentType)
                        productData.imgs = productData.imgs.map(img => convertImg(img.data.data, img.contentType))
                        return productData
                    }
                    return null
                } catch (error) {
                    console.error('Error loading product:', elemId, error);
                    return null
                }
            })

            const results = await Promise.all(promises)
            const validProducts = results.filter(product => product !== null)
            
            console.log('getManyProducts: All products loaded', validProducts);
            setManyProducts(validProducts)
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
            setUser,
            userCart,
            getUserCart,
            cartSubtotal,
            addCartNewProduct,
            removeCartProduct,
            updateCartQuantity,
            updateCartSize,
            manyProducts,
            setAddNewProduct,
            setDeleteProduct,

            createPaymentIntent,
            clientSecret,
            createOrder,
            getUserOrders
        }}>
            {children}
        </CodjoeContext.Provider>
    );
}

export const useCodjoeData = () => {
    return useContext(CodjoeContext);
}