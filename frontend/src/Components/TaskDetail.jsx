import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Button, InputLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom'



const labelstyle = {mb:1,mt:2,fontSize:'24px',fontWeight:'bold'};
const TaskDetail = () => {
  const id= useParams().id;
  console.log("id is",id)
  const navigate= useNavigate();
  const [task,setTask]=useState();
  const [inputs,setInputs]=useState({
    title:"",
    description:"",
    imageurl:"",
  })


  const handleChange=(e)=>{
    setInputs((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }


  const details = async()=>{
    const res = await axios.get(`http://localhost:8000/api/task/${id}`).catch((err)=>console.log(err));
    const data = await res.data;
    return data;
  }

  useEffect(()=>{
    details().then((data)=>{
      setTask(data.tasks.tasks);
      setInputs({
        title: data.tasks.title,
        description: data.tasks.description,
        imageurl: data.tasks.image,
      })
    });
    console.log(inputs);
  },[id])

  const sendRequest=async()=>{
    const res = await axios.put(`http://localhost:8000/api/task/update/${id}`,{
      title:inputs.title,
      description:inputs.description,
    }).catch((err)=>console.log(err));

    const data = await res.data;
    return data;
  }


  const handlesubmit=(e)=>{
    e.preventDefault();
    sendRequest().then((data)=>console.log(data)).then(()=>navigate('/mytasks'));

  }

  return (
    <div>
      {inputs && 
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
      }
    </div>
  )
}

export default TaskDetail
