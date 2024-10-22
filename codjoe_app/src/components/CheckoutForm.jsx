import React, { useEffect, useState } from 'react';
import { useStripe, useElements, PaymentElement, CardElement } from '@stripe/react-stripe-js';
import { useCodjoeData } from '../context/CodjoeContext';

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const { createPaymentIntent, clientSecret } = useCodjoeData()


    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // useEffect(() => {
    //     createPaymentIntent()
    //     console.log('createIntent');

    // }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setIsProcessing(true)

        // const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret.clientSecret, {
        //     payment_method: {
        //         card: elements.getElement(CardElement),
        //         billing_details: {
        //             name: 'John Doe',
        //         },
        //     },
        // });

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/succesfulPay`
            },
            redirect: "if_required"
            // payment_method: {
            //     card: elements.getElement(CardElement),
            //     billing_details: {
            //         name: 'John Doe',
            //     },
            // },
        });

        if (error) {
            setMessage(error.message)
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setMessage("Payment status:" + paymentIntent.status)
        } else {
            setMessage("Unexpected status")
        }

        setIsProcessing(false)

        // if (paymentIntent) {
        //     console.log('payment successful', paymentIntent);
        // } else if (error) {
        //     console.log('payment failed', error.message);

        // }
    }


    return (
        <form id='payment-form' className=' w-2/3 h-1/2 p-5 m-5' onSubmit={handleSubmit}>

            <PaymentElement id="payment-element" />
            {/* <CardElement /> */}

            <button className='bg-green-300' disabled={!stripe || isProcessing} id='submit'>
                <span id="button-text">
                    {isProcessing ? 'Processing ...' : 'Pay now'}
                </span>
            </button>

            {message && <div id="payment-message">{message}</div>}

        </form>
    );
}

export default CheckoutForm;
