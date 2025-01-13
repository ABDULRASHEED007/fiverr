import React, { useState } from 'react'
import "./Reviews.scss";
import Review from '../review/Review';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
// import axios from 'axios';


// eslint-disable-next-line react/prop-types
const Reviews = ({gigId}) => {
  const [submitBtn, setSubmitBtn] = useState(false);

    const queryClient = useQueryClient();

    const { isLoading, error, data} = useQuery({
        queryKey: [`reviews`],
        queryFn: () =>
         newRequest(`/reviews/${gigId}`).then((res) => {
        //  newRequest(`/gigs${search}`).then((res) => {
          return res.data;
         }),
      });


      const mutation = useMutation({
        mutationFn:(review) => {
            return newRequest.post("/reviews", review);
        },
        onSuccess:() => {
            queryClient.invalidateQueries(["reviews"]);
        }
      })


      const handleSubmit = (e) => {
        e.preventDefault();
        const desc = e.target[0].value;
        const star = e.target[1].value;
        mutation.mutate({gigId, desc, star})
        setSubmitBtn(true);
      }



  return (
    <div className="reviews">
        <h2>Reviews</h2>
        {
            isLoading ? "Loading" : error ? "Some thing wrong" : 
            data.map((review) =>  <Review key={review._id} review={review} />)

      
        }

        <div className="add">
        <h3>Add a review</h3>

        <form className='addForm' action="" onSubmit={handleSubmit}>
            <input type="text" placeholder='write your opinion' />
            <select name="" id="">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
            <button disabled={submitBtn}>Send</button>
        </form>


        </div>


      </div>
  )
}

export default Reviews
