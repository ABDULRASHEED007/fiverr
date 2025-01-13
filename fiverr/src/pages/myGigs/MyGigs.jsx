import React from 'react'
import './MyGigs.scss';
import { Link } from 'react-router-dom';
import { MdOutlineDelete } from "react-icons/md";
import getCurrentUser from '../../utils/getCurrentUser';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import Loader from '../../loader/Loader';


const MyGigs = () => {

  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();

  const { isLoading, error, data} = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
     newRequest(`/gigs?userId=${currentUser._id}`).then((res) => {
    //  newRequest(`/gigs${search}`).then((res) => {
      return res.data;
     }),
  });

  console.log(data);

  const mutation = useMutation({
    mutationFn:(id) => {
        return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess:() => {
        queryClient.invalidateQueries(["myGigs"]);
    }
  })


  const handleDelete = (id) => {
    mutation.mutate(id);

  }



  return (
    <div className='myGigs'>
      { isLoading ? <Loader /> : error ? "Error" : 

        <div className="container__myGigs">
        <div className="title__myGigs">
          <h1>My Gigs</h1>
          <Link to="/add">
            <button>
            Add New Gig
            </button>
            </Link>
        </div>
        <table>
          <thead>

          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>

          </tr>
          </thead>

          <tbody>

         
         { data.map((gig) => (

        
          <tr key={gig._id}>
            <td>
              <img className='img' src={gig.cover} alt='img' />

            </td>
            <td>{gig.title}</td>
            <td>{gig.price}</td>
            <td>{gig.sales}</td>
            <td>
          
            <MdOutlineDelete className='delete'  onClick={() => handleDelete(gig._id)}/>
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

export default MyGigs