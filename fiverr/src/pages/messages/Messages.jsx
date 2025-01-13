import React from 'react'
import './Messages.scss';
import { Link } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import moment from "moment";
import Loader from '../../loader/Loader';

// import { MdOutlineMailOutline } from "react-icons/md";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

 

  const handleRead = (id) => {
    mutation.mutate(id);

  }


 
  const { isLoading, error, data} = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
     newRequest(`/conversations`).then((res) => {
    //  newRequest(`/gigs${search}`).then((res) => {
      return res.data;
     }),
  });

  console.log(data)


  const mutation = useMutation({
    mutationFn:(id) => {
        return newRequest.put(`/conversations/${id}`);
    },
    onSuccess:() => {
        queryClient.invalidateQueries(["conversations"]);
    }
  })


  return (
    <div className='messages'>
     { isLoading ? <Loader /> : error ? "Something went wrong" : 
      <div className="container__myGigs">
        <div className="title__myGigs">
          <h1>Messages</h1>
         
        </div>
        <table>

          <thead>

          <tr>
            <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
            <th>Last Message</th>
            <th>Date</th>
            <th>Action</th>

          </tr>
          </thead>


      <tbody>

       {
        data.map((c) => (
        <tr key={c.id} className={ ((currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer)) &&  'active'}>
        <td>
        {currentUser.isSeller ? c.buyerId : c.sellerId}
        </td>
        <td><Link to={`/message/${c.id}`} className='link'> {c?.lastMessage?.substring(0,100)}...</Link></td>
        <td>{moment(c.updatedAt).fromNow()}</td>
        <td>
         { ((currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer)) &&
         ( <button onClick={()=> handleRead(c.id)}>
          Mark as Read
          </button>)
          }
          </td>
       

      </tr>
       ))
         
          }
      </tbody>


         




        </table>

      </div>
      }

    </div>
  )
}

export default Messages