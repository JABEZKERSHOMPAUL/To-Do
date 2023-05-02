import React, { useEffect } from 'react'
import "./Home.css"
import Form from '../form/Form'
import { useNavigate } from 'react-router-dom'


function Home() {
    let token = localStorage.getItem('token')
    const navigate = useNavigate()
    const checkToken = () => {
        if (token === "") {
            navigate('/')
        }
    }
    useEffect(() => {
        checkToken()
    }, [token])

    const handleLogout = async () => {
        localStorage.removeItem('token')
        navigate('/')
    }
    return (
        <div className='container1'>
            <div className=' position-relative app-wrapper'>
                <div className='position-absolute top-0 ' style={{left:"410px"}}>
                    <button className='  button-logout ' onClick={() => handleLogout()}>
                        <i class="fa fa-power-off" aria-hidden="true"></i>
                    </button>
                </div>
                <div className='header'>
                    <h1>To-do List</h1>
                    <div><Form /></div>

                </div>

            </div>
        </div>
    )
}

export default Home