import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Task from './Task';

const Usertasks = () => {
  const id = localStorage.getItem("userId");

  const [user,setUser]=useState();

  const sendRequest = async()=>{
    const res = await axios.get(`http://localhost:8000/api/task/user/${id}`).catch((err)=>console.log(err));
    const data = await res.data;
    // console.log("data is",data);
    return data;
  }
  useEffect(() => {
    
    sendRequest().then((data)=>
    setUser(data)
    );
    
  }, [])
 
  let arr=user;
  console.log("user is " ,arr?.tasks?.tasks.sort(function(a,b){
    return a.createdAt < b.createdAt ? 1 : -1;}

  ));

  return (
    <div>

      {user  && user.tasks.tasks.map((task,index)=>(          
        <Task 
        isUser={true}
        id={task._id}
        key={index} 
        title={task.title} 
        description={task.description}
          userName={user.tasks.name}/>
      ))}
    </div>
  )
}

export default Usertasks