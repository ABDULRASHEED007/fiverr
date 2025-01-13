import React from 'react'
import './Orders.scss';
import { MdOutlineMailOutline } from "react-icons/md";
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';
import Loader from '../../loader/Loader';

const Orders = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate  = useNavigate();


const { isLoading, error, data} = useQuery({
  queryKey: ["orders"],
  queryFn: () =>
   newRequest.get(`/orders`).then((res) => {
  //  newRequest(`/gigs${search}`).then((res) => {
    return res.data;
   }),
});



console.log(data)

  const handleClick = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id =  sellerId + buyerId;

    try {
    const res = await newRequest.get(`/conversations/single/${id}`);
    navigate(`/message/${res.data.id}`)

      
    } catch (error) {
     if(error.response.status === 404){
    const res = await newRequest.post(`/conversations`, {to: currentUser.isSeller ? buyerId: sellerId})
    navigate(`/message/${res.data.id}`)
     } 
    
    }


  }



  return (
    <div className='orders'>
    { isLoading ? (<Loader /> ) : error ? ( "Something went wrong" ): (
     <div className="container__myGigs">
        <div className="title__myGigs">
          <h1>My Purchases</h1>
         
        </div>

        <table>
          <thead>

          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Contact</th>

          </tr>
          </thead>



          <tbody>

       { data.map((order) => (
         
        //  <tr key={order._id}>
         <tr key={order._id}>
            <td>
              <img className='img' src={order.img} alt='img' />

            </td>
            <td>{order.title}</td>
            <td>{order.price}</td>
            <td>
           
            <MdOutlineMailOutline className='delete' onClick={() =>handleClick(order)}/>
            </td>


          </tr>
       )) 
       
      }
      </tbody>

      



        </table>

      </div>
      )}

    </div>
  )
}

export default Orders