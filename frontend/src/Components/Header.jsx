import React, { useState } from 'react'
import { AppBar,Button,Tab,Tabs,Toolbar,Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import { authActions } from "../Store/index";

const Header = () => {
    const [value,setValue]=useState();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state)=>state.isLoggedIn);
  return (

    <AppBar position='sticky'>
        <Toolbar>
            <Typography variant='h4'> TaskApp</Typography>
            {isLoggedIn && <Box display={'flex'} marginLeft={'auto'} marginRight="auto">
                <Tabs textColor='inherit' value={value} onChange={(e,val)=>setValue(val)}>696
                    {/* <Tab  LinkComponent={Link} to='/tasks' sx={{color:"white"}} label="ALL TASK"/> */}
                    <Tab LinkComponent={Link} to='/mytasks' sx={{color:"white"}}  label="ALL TASK"/>
                    <Tab LinkComponent={Link} to='/tasks/add' sx={{color:"white"}}  label="ADD TASK"/>
                </Tabs>
            </Box>}
            <Box display={'flex'} marginLeft={'auto'}>
                {!isLoggedIn && 
                <><Button LinkComponent={Link} to='/auth' variant='contained' sx={{margin:1,borderRadius:10}} color='warning'>
                    Login/Signup
                </Button>
                </>
                }
                {isLoggedIn && <Button  onClick={()=>dispatch(authActions.logout())}
                variant='contained' sx={{margin:1,borderRadius:10}} color='warning'>
                    Logout
                </Button>}
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header
