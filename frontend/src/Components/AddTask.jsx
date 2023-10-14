import { Button, InputLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const labelstyle = {mb:1,mt:2,fontSize:'24px',fontWeight:'bold'};
const AddTask = () => {

  const navigate = useNavigate();
  const [inputs,setInputs]=useState({
    title:"",
    description:"",
  })


  const handleChange=(e)=>{
    setInputs((prev)=>({
      ...prev,
      [e.target.name]:e.target.value,
    }))
  }

  const sendRequest=async()=>{
    const res = await axios.post('http://localhost:8000/api/task/add',{
      title: inputs.title,
      description: inputs.description,
      user: localStorage.getItem("userId")
    }).catch((err)=>console.log(err));
    console.log("res is",res);
    const data = await res.data;
    return data;
  }

  const handlesubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(()=>navigate('/tasks'))

  }
  return (

    <div>
      <form onSubmit={handlesubmit}>
        <Box border={3} borderColor="green" borderRadius={10} boxShadow="10px 10px 20px #ccc"
        padding={3}  display="flex"  margin={"auto"} marginTop={3}
        flexDirection={'column'} width={"80%"}>
          <Typography fontWeight={'bold'} padding={3} color="grey" variant='h2' textAlign={'center'}>
            Add Your Task
          </Typography>
          <InputLabel sx={labelstyle}>Title
          </InputLabel>
          <TextField name="title" value={inputs.title} onChange={handleChange}   margin='auto' variant='outlined'/>
          <InputLabel sx={labelstyle}>Description
          </InputLabel>
           <TextField  name="description" value={inputs.description} onChange={handleChange} margin='auto' variant='outlined'/>
          <Button sx={{mt:2,borderRadius:4}}  variant='contained' color='warning' type='submit'>Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddTask