import React, { useEffect, useState } from 'react'
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from '../../utils/newRequest';
import { useParams } from 'react-router-dom';
import CheckoutForm from '../../components/checkoutForm/CheckoutForm';


const stripePromise = loadStripe("pk_test_51PZXlJ2N4nDtKZGNoztr8xVfvEbX0p7TQ6PvvTAEmoH7PICDjkUVS4ndmo436MQ9hyHQZLesPb9nu8yBmpglW8go00cAWm148V")

const Pay = () => {
    const [clientSecret, setClientSecret] = useState("");
    const {id} = useParams();

    useEffect(()=> {
        const makeRequest = async () => {
            try {
                const res =  await newRequest.post(`/orders/create-payment-intent/${id}`);
                // console.log(res)
                setClientSecret(res.data.clientSecret);
                console.log(clientSecret)
            } catch (error) {
                console.log(error)
            }
        }
        makeRequest()
    },[]);



    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };



  return (
    <div className='pay'>
         {clientSecret ? (
           <Elements options={options} stripe={stripePromise}>
          <h1>Please Enter the Card Details</h1>
          <CheckoutForm />
        </Elements>
      ) : <h3>Something went wrong! or check if you are login with your account!</h3>}
    </div>
  )
}

export default Pay