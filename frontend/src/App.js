import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Addtask from './Components/AddTask';
import Auth from './Components/Auth';
import taskDetail from './Components/TaskDetail';
import tasks from './Components/Tasks';
import Header from './Components/Header';
import Usertasks from './Components/UserTasks';
import { authActions } from './Store';
import Tasks from './Components/Tasks';
import TaskDetail from './Components/TaskDetail';

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.isLoggedIn);
  console.log(state);
  useEffect(()=>{

    if(localStorage.getItem("userId")){
      dispatch(authActions.login());
    }
  },[dispatch])
  return (
    <>
    <header>
     <Header/>
    </header>
    <main>
      <Routes>
      {!state ?<Route path='/auth' element={<Auth/>}/>:
        <>
          <Route path='/tasks' element={<Tasks/>}/>
          <Route path='/mytasks' element={<Usertasks/>}/>
          <Route path='/mytasks/:id' element={<TaskDetail/>}/>
          <Route path='/tasks/add' element={<Addtask/>}/> 
        </>
      }
     
      </Routes>
    </main>
    </>
  );
}

export default App;
