import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import "./Success.css"

const Success = () => {

  const {search} = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);

  const payment_intent = params.get("payment_intent");

  useEffect(()=> {

    const makeRequest = async () => {
      try {
        await newRequest.put("/orders", {payment_intent})
        setTimeout(()=> {
          navigate("/orders")
        }, 3000)
        
      } catch (error) {
        console.log(error)
      }
    }

      makeRequest();

  }, [])


  return (
    <div className='success'>
    <div className="left">
        <div className="info">
            <div className="PS">
                Payment Successful
            </div>
            <div className="purchase">
                <h1 className='purchase_heading'>Thanks for the your purchase!</h1>
                <p>In a moment you are being redirect to the orders page. Please do not close the page.</p>
            </div>
        </div>
    </div>
    <div className="right">
        <div className="anyImg">
            SVG
        </div>
    </div>
    
</div>
  )
}

export default Success





// ******************************

















