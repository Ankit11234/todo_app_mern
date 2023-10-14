import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router-dom";
import axios from 'axios';




const Task=({title,description,userName,isUser,id})=>{

 const navigate = useNavigate();

 const handleEdit=()=>{
   navigate(`/mytasks/${id}`);
 }

 const del=async()=>{
  const res = await axios.delete(`http://localhost:8000/api/task/${id}`).catch((err)=>console.log(err));
  const data = await res.data;
  return data;
 }
 const handleDelete=()=>{
   
     del()
     .then(()=>navigate('/tasks'))

 }
  return (
    <div>
      <Card sx={{ maxWidth: "40%", margin:'auto',mt:2,padding:2,
      boxShadow:"5px 5px 10px #ccc",
      ":hover":{
        boxShadow:"10px 10px 20px #ccc"
      } }}>
        {isUser && (
          <Box display='flex'>
            <IconButton onClick={handleEdit} sx={{marginLeft:"auto"}}><EditIcon/></IconButton>
            <IconButton onClick={handleDelete} ><DeleteIcon/></IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {userName} 
            </Avatar>
          }       
          title={title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
           <b>{userName}</b>{":"} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Task;
