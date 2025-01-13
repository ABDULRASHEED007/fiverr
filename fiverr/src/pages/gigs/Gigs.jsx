import React, { useEffect,  useRef,  useState} from 'react'
import './Gigs.scss';
import down from '../../static/fiver-img/down.png';
import GigCard from '../../components/gigCard/GigCard';
import { useQuery } from "@tanstack/react-query"
import newRequest from '../../utils/newRequest';
import { useLocation } from 'react-router-dom';
import Loader from '../../loader/Loader';
// import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';

const Gigs = () => {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef(null)
  const maxRef = useRef(null)



const {search} = useLocation();

// http://localhost:8800/api/

const { isLoading, error, data, refetch} = useQuery({
  queryKey: ["gigs"],

  queryFn: () => 

    // if(minRef.current.value == "" && maxRef.current.value == "") {
    //   newRequest(`/gigs${search}`).then((res) => {
    //     return res.data;
    //   })
    // } else {
    // }
      newRequest(`/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}`).then((res) => {
        //  newRequest(`/gigs${search}`).then((res) => {
          return res.data;
        }),

   
  
    
});

  console.log(data)







  
useEffect(() => {
  refetch();
}, [sort]);


const apply = () => {
  refetch();
}


const reSort = (type) => {
  setSort(type)
  setOpen(false)
}

function format(str) {
  const eq = str.indexOf("=");
  const q = str.slice(eq + 1, str.length);

  const cat = q.replace("%20", " ");
  const cat1 = cat.toUpperCase();

  // console.log(cat1)

  return cat1;
 
}


  return (
    <div className='gigs'>
      <div className="container">

    <span className="breadcrumbs">FIVERR &gt; <span className='cat'>{ format(`${search}`)} </span> </span>

    <h1>{format(`${search}`)}</h1>
   
    <p style={{color:"#62646a"}}>We are a group of artists and designers who work with the latest AI technologies to create unique visuals.</p>

    <div className="menus">


      <div className="left_gigs">
        <span style={{fontWeight:"500"}}>Budget:</span>
        <input type="text" ref={minRef} placeholder='minimum' />
        <input type="text" ref={maxRef} placeholder='maximum' />
        <button onClick={apply}>Apply</button>
      </div>



      <div className="right_gigs">
        <span className='sortby'>Sort By : </span>
        <span className='sorttype'>{sort === "sales"? "Best Selling" : "Newest"}</span>
        <img src={down} alt="down" onClick={()=>setOpen(!open)} />
        {open &&
        (<div className="rightMenu">
         {sort ==='sales' ? (
         <span onClick={()=>reSort("createdAt")}>Newest</span>
        ): ( 
        <span onClick={()=>reSort("sales")}>Best Selling</span> 
        )}
        </div>
      )}
      </div>


    </div>



    <div className="cards">
      {
      isLoading 
      ? <Loader />
      : error 
      ? "Something went wrong!" 
      : data.map((gig) => <GigCard key={gig._id} item={gig}/>
         

      )}
      
    </div>
  </div>  
</div>
  )
}

export default Gigs
