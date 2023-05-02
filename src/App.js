import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component/login/Login';
import SignIn from './component/signin/SignIn';
import Home from './component/home/Home';
import { useEffect, useState } from 'react';
import axios from 'axios';



function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false)
  
  let token = localStorage.getItem('token')
  
  const verifyUser = async () => {
    const res = await axios.post('http://localhost:8081/verify/user', { token: token })

    
    if (res.data.status === 1) {
      setisAuthenticated(true)
    }
  }

  useEffect(() => {
    if (token !== null) {
      verifyUser()
    }
  }, [token])
  return (
    <>
      <BrowserRouter>
       
          <Routes>
             <Route path='/' element={<Login />} />
            <Route path='/signin' element={<SignIn />} />
            {isAuthenticated?<Route path='/home' element={<Home />} />:""}
            
          </Routes>
      </BrowserRouter >

    </>
  )
}

export default App;
