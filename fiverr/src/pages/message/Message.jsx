import React from 'react'
import './Message.scss';
import { Link, useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import Loader from '../../loader/Loader';
// import { LuSendHorizonal } from "react-icons/lu";


const Message = () => {

  const queryClient = useQueryClient();
  const {id} = useParams();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));


  const { isLoading, error, data} = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
     newRequest(`/messages/${id}`).then((res) => {
    //  newRequest(`/gigs${search}`).then((res) => {
      return res.data;
     }),
  });


  const mutation = useMutation({
    mutationFn:(message) => {
        return newRequest.post(`/messages`, message);
    },
    onSuccess:() => {
        queryClient.invalidateQueries(["messages"]);
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id, 
      desc:e.target[0].value,
    })
    e.target[0].value = "";
  }



  return (
    <div className='message'>
      <div className="container">
        <span className='breadcrumbs'>
          <Link to="/messages">Messages</Link> &gt; Customer &gt;
        </span>
       {  isLoading ? <Loader /> : error ? "Something went wrong" : 
        <div className="messages">

         { data.map((item) => (
          <div key={item._id} className={item.userId === currentUser._id ? "owner item" : "item"}>

          {/* <img src={item.img} alt="img" /> */}
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiiCe9_L2FcIZ78LR_Z0RAWiSti7a_om3VzA&usqp=CAU" alt="img" />
          <p>
            {item.desc}
          </p>
        </div>
         ))
          }
         
          </div>
          }
          <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea name="" placeholder='Write a message' id="" cols="30" rows="10"></textarea>

            <button type='submit'>
              <div className="svg-wrapper-1">
                <div className="svg-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    ></path>
                  </svg>
                </div>
              </div>
              <span>Send</span>
            </button>



        </form>
      </div>
    </div>
  )
}

export default Message