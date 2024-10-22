import React, { useEffect, useState } from 'react';
// loadstripe error Uncaught TypeError: Cannot assign to read only property 'create' of object '#<CredentialsContainer>'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCodjoeData } from '../context/CodjoeContext';
import CheckoutForm from '../components/CheckoutForm';
import axios from 'axios';


const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_PUBLIC_KEY)

const Payment = () => {

    const { sPublicKey, createPaymentIntent, clientSecret } = useCodjoeData()
    // const [stripePubKey, setStripePubKey] = useState('');
    const [clientKey, setClientKey] = useState('');

    // useEffect(() => {
    //     if (sPublicKey != null) {

    //         // setStripePubKey(stripePromise)
    //     }
    //     console.log('stripe pubblic payment: ', sPublicKey);

    // });

    useEffect(() => {
        createPaymentIntent()

        console.log('createIntent payment', clientSecret);

    }, []);

    // useEffect(() => {
    //     if (sPublicKey != null) {
    //         const stripePromise = loadStripe(sPublicKey)
    //         setStripePubKey(stripePromise)
    //         console.log('pubblic: ', stripePromise);
    //     }

    // }, [sPublicKey]);




    useEffect(() => {
        // if (clientKey != null || undefined) {

        setClientKey(clientSecret.clientSecret)
        console.log('clicli: ', typeof clientSecret.clientSecret);
        // }

    }, [clientSecret]);

    const appearance = {
        theme: 'flat'
    }

    const stripeOptions = {
        clientSecret: clientKey,
        appearance,
    }

    return (
        <div className='min-h-[99vh] bg-white pt-20 text-black'>
            {
                stripePromise &&
                clientKey &&
                (<Elements stripe={stripePromise} options={stripeOptions}>
                    <CheckoutForm />
                </Elements>)
            }
        </div>
    );
}

export default Payment;
