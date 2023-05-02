import React, { useState } from 'react'
import bg from "../../image/tree-3358468__340.jpg"
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'

function SignIn() {
    const navigate = useNavigate()
    const [signup, setsignup] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: ""
    })

    const handleChange = (e) => {
        setsignup((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async () => {
        if (signup.email === "") {
            toast.error("Email Required")
            return;
        }
        if (signup.password === "") {
            toast.error("Password Required")
            return;
        }
        if (signup.username === "") {
            toast.error("Username Required")
            return;
        }
        if (signup.confirmpassword === "") {
            if (signup.password == signup.confirmpassword) {
                toast.error('Password did not match')
                return;
            }
        }

        const res = await axios.post('http://localhost:8081/signup/user', signup)
       
        if (res.data.status === 1) {
            toast.success(res.data.message)
            setTimeout(() => {

                navigate('/')
            }, 3000)
        } else {
            toast.error(res.data.message)
        }

    }
    return (
        <div className='position-relative'>
            <img src={bg} width={'100%'} height={'710px'} />
            <div className='container m-auto w-25  p-3 align-content-center border border-4 border-warning position-absolute text-light ' style={{ top: "150px", left: "40%" }}>
                <h2 className='text-center '>Sign Up</h2>
                
                    
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">User Name</label>
                            <input type="text"  class="form-control bg-dark text-light" id="exampleInputEmail1" aria-describedby="emailHelp" name='username' onChange={(e) => handleChange(e)} />

                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input type="email" class="form-control bg-dark text-light" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={(e) => handleChange(e)} />
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <div className='position-relative'>
                                <input type="password" class="form-control bg-dark text-light" id="exampleInputPassword1" name='password' onChange={(e) => handleChange(e)} />
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                            <div className='position-relative'>
                                <input type="password" class="form-control bg-dark text-light" id="exampleInputPassword1" name='confirmpassword' />
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Sign Up</button>

                        <Link to={'/'} style={{ textDecoration: "none" }}>
                            <div className='mt-3'>
                                Already Have An Account
                            </div>
                        </Link>
                
                
            </div>
            <Toaster />
        </div>
    )

}
export default SignIn