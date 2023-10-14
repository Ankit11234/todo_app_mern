import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import axios from 'axios';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import { authActions } from "../Store/index";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSingUp,setisSignUp]=useState(false);
  const [inputs,setInputs]=useState({
    name:"",
    email:"",
    password:"",
  });


  
  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value,
    }));
  }
  
  const sendRequest = async(type="login")=>{

   
    // console.log("res is ",res);
    const res = await axios.post(`http://localhost:8000/api/user/${type}`,{
      name: type==="login" ?"":inputs.name,
      email: inputs.email,
      password: inputs.password
    }).catch(err=>console.log("error is ",err));

    // console.log(inputs);
    const data = await res.data;
    console.log("data is",data);
    console.log("message is",data.message);
    return data;
  
    
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log(inputs);
    if(isSingUp){
      sendRequest("signup").then((data)=>localStorage.setItem("userId",data.message._id))
      .then(()=>navigate("/auth"))
      setisSignUp(false);
      // .then(()=>dispatch(authActions.login()))
      // .then(data=>console.log(data));
    }else{
      sendRequest()
      .then((data)=>localStorage.setItem("userId",data.message._id))
      .then(()=>dispatch(authActions.login())).then(()=>navigate("/tasks"));
      // .then((data)=>console.log("data is",data))
    }
   
  }

  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box display={'flex'}
        maxWidth={400}
        margin="auto"
        marginTop={5}
        borderRadius={5}
        boxShadow="10px 10px 20px #ccc"
        flexDirection="column" 
        alignItems={'center'} justifyContent='center'
         padding={3}>
          <Typography variant='h2' textAlign="center">
            {isSingUp ? "SignUp" :"Login"} 
          </Typography>
            {isSingUp && <TextField margin='normal' name="name" value={inputs.name} onChange={handleChange} placeholder='name'/>}
            <TextField margin='normal' name="email"  type={"email"} id="email"
              label="Email Address"
             value={inputs.email}  onChange={handleChange} placeholder='email'/>
            <TextField margin='normal'  name="password" id="password" value={inputs.password} type={"password"}  onChange={handleChange}  placeholder='password'/>
            <Button variant='contained' type='submit' color='warning'
             sx={{borderRadius:3, marginTop:3}}>Submit</Button>
            <Button onClick={()=>setisSignUp(!isSingUp)} sx={{borderRadius:3,marginTop:3}}>
              Change to {isSingUp ? "Login" :"SignUp"}
              </Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth