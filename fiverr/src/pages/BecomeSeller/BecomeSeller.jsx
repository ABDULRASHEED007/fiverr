// import React from 'react';
// import "./BecomeSeller.scss";
// import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// import newRequest from '../../utils/newRequest';

// const BecomeSeller = () => {

//   const navigate = useNavigate();
//     // const [seller, setSeller] = useState({
//     //     isSeller: false,
//     //     desc: "",
//     // })


//     const handleSubmit = async (e) => {
//       e.preventDefault();

//     try {
//       const res = await newRequest.put("/auth/becomeSeller");
//       localStorage.setItem("currentUser", JSON.stringify(res.data));
//       navigate("/");

//       // const config = {
//       //   headers: {
//       //     Authorization: `Bearer ${localStorage.getItem('currentUser')}`,
//       //   },
//       // };

//       // await axios.put('http://localhost:8800/api/auth/becomeSeller', {withCredentials: true}, config);

//       // navigate('/');

//     } catch(error) {
//       console.log(error)
//     }
//     }




    


//   return (
//     <div className="right">
//         <h1>I want to become a seller</h1>

//           <form action="" onSubmit={handleSubmit}>
       

//           <button type='submit'>Submit</button>
          
//       </form>

//        </div>
//   )
// }

// export default BecomeSeller