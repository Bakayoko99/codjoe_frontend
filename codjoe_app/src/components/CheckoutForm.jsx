import React, { useEffect, useState } from 'react';
import { useStripe, useElements, PaymentElement, CardElement } from '@stripe/react-stripe-js';
import { useCodjoeData } from '../context/CodjoeContext';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()

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
            console.log('error pay message: ', error.message);
            
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setMessage("Payment status:" + paymentIntent.status)
            navigate('/succesfulPay')
        } else {
            setMessage("Unexpected status")
            console.log('payStatus: ',paymentIntent.status);
            
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
            <div className='flex justify-center mt-7'>
                <button className='bg-[#C29F75] text-white mt-7 relative bottom-7 h-14 w-52 rounded-3xl font-medium flex justify-center items-center' disabled={!stripe || isProcessing} id='submit'>
                    <span id="button-text">
                        {isProcessing ? 'Processing ...' : 'Pay now'}
                    </span>
                </button>
            </div>

            {/* <div className={`fixed mt-2 ml-2 transition-all duration-500 ${hideAlert && 'opacity-0'}`}>
                <div className=" p-4 mb-4 text-sm text-white rounded-lg bg-green-800" role="alert">
                    <p className="font-medium text-center">
                        Sign up successful!.
                    </p>
                </div>
            </div> */}

            {/* {message && <div id="payment-message">{message}</div>} */}

        </form>
    );
}

export default CheckoutForm;
