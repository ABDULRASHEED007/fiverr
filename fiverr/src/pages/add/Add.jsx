import React, { useReducer, useState } from 'react'
import './Add.scss';
import { INITIAL_STATE, gigReducer } from '../../reducers/gigReducer';
import upload from '../../utils/upload';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

const Add = () => {

  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadBtn, setUploadBtn] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE)


  const handleChange = (e) => {
    dispatch({type: "CHANGE_INPUT", payload: {name: e.target.name, value: e.target.value}})

  }


  const handleFeature = (e) => {
    e.preventDefault();

    dispatch({type: "ADD_FEATURE", payload: e.target[0].value, });
    e.target[0].value = "";

  }


  const handleUpload = async () => {
    setUploading(true)

    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => { 
          const url = await upload(file);
          return url;
    })
      );
      setUploading(false)
      dispatch({type: "ADD_IMAGES", payload: {
        cover, images
      }})

      setUploadBtn(true);
    } catch (error) {
      console.log(error)
    }
   
  }


  const navigate = useNavigate();

  const queryClient = useQueryClient();

  


  const mutation = useMutation({
    mutationFn:(gig) => {
        return newRequest.post(`/gigs`, gig);
    },
    onSuccess:() => {
        queryClient.invalidateQueries(["myGigs"]);
    }
  })




  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/mygigs");
  }






  return (
    <div className='add'>
      <div className="container">
        <h1>Add New Gig</h1>
      <div className="sections">
        <div className="left">

      <label  htmlFor="">Title</label>
      <input type="text" maxLength={50} onChange={handleChange} name='title' placeholder="e.g. I will do something I'm really good at" />


      <label htmlFor=""> Select Category</label>

      <select  name="cat" id="cat" onChange={handleChange}>
        <option hidden selected>Select</option>
        <option value="ui design">UI Design</option>
        <option value="web development">Web Development</option>
        <option value="animation">Animation</option>
        <option value="music">Music</option>
        <option value="SEO">SEO</option>
        <option value="illustration">illustration</option>
      </select>


        <div className="images">
        <div className="imagesInputs">

      <label htmlFor="">Cover Image</label>
      <input type="file" className='coverUpload' onChange={e => setSingleFile(e.target.files[0])}/>
      <label htmlFor="">Upload Image</label>
      <input type="file" className='coverUpload' multiple onChange={e => setFiles(e.target.files)}/>

        </div>
        <button disabled={uploadBtn} onClick={handleUpload}>{uploading ? "Uploading..." : "Upload"}</button>
        </div>



      <label htmlFor="">Description</label>
      <textarea onChange={handleChange} name="desc" id="" cols="30" rows="16"  placeholder='Briefly describe your service to the customers'></textarea>
      <button onClick={handleSubmit}>Create</button>



        </div>




        <div className="right">
          <label htmlFor="title">Service Title</label>
          <input type="text" id="title" name='shortTitle' onChange={handleChange}  placeholder="e.g. One-page web design"/>
          <label htmlFor="desc">Short Description</label>
          <textarea name="shortDesc" id="desc" cols="30" rows="10" onChange={handleChange} placeholder='Short description of your service'></textarea>
          <label htmlFor="Dtime">Delivery Time(e.g. 3days)</label>
          <input type="number" id="Dtime" name='deliveryTime'  min={1} onChange={handleChange} />
          <label htmlFor="Rtime">Revision Time</label>
          <input type="number" id="Rtime" name='revisionNumber'  min={1} onChange={handleChange}/>
          <label htmlFor="fe">Add Feature</label>




          <form className='add' onSubmit={handleFeature}>
          <input type="text" id="fe"  placeholder="e.g: SEO"/>
          <button>Add</button>
          </form>

          <div className="addedFeatures">
           { state?.features?.map((f) => (
             <div key={f} className="item">
             <button onClick={() =>dispatch({type: "REMOVE_FEATURE", payload: f})}>{f} <span>x</span></button>
           </div>
           ))
           
            }
          </div>


          <label htmlFor="price">Price</label>
          <input type="number" id="price" onChange={handleChange}  name='price' min={1} />

        </div>
      </div>

      </div>
    </div>
  )
}

export default Add
