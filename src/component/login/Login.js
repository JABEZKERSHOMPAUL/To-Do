import React, { useState } from 'react'
import bg from '../../image/tree_bg.jpg'
import open from "../../image/open.png"
import close from "../../image/icons8-invisible-48.png"
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'

function Login() {
    const [showpassword, setshowpassword] = useState(false)
    const password = () => {
        setshowpassword(!showpassword)
    }
    const navigate = useNavigate()

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        setUserLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const [isAgree, setIsAgree] = useState(false)

    const handleSubmit = async () => {


        if (userLogin.email === "") {
            toast.error("Email Required")
            return;
        }
        if (userLogin.password === "") {
            toast.error("Password Required")
            return;
        }
        if (isAgree === false) {
            toast.error("Check Required")
            return;
        }


        const res = await axios.post("http://localhost:8081/signin/user", userLogin)
        console.log(res);
        if (res.data.status !== 0) {
            toast.success(res.data.message)
            localStorage.setItem('token', res.data.token)
            setTimeout(() => {

                navigate('/home')
            }, 3000);
            console.log(res.data.token)

        } else {
            toast.error(res.data.message)
        }

    }
    return (
        <div className='position-relative'>
            <img src={bg} width={'100%'} height={'710px'} />
            <div className='container m-auto w-25  p-3 align-content-center border border-1 border-dark position-absolute text-light ' style={{ top: "150px", left: "40%" }}>
                <h2 className='text-center'>SignIn</h2>


                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control bg-dark text-light" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={(e) => handleChange(e)} />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <div className='position-relative'>
                        <input type={showpassword ? "text" : "password"} class="form-control bg-dark text-light" id="exampleInputPassword1" name='password' onChange={(e) => handleChange(e)} />
                        {
                            showpassword ? <img src={open} className="position-absolute top-0 end-0 mt-2 me-2 colour-white"
                                style={{ cursor: 'pointer' }}
                                width={'20px'}
                                height={'20px'}
                                onClick={password} /> : <img src={close} className="position-absolute top-0 end-0 mt-2 me-2 colour-white"
                                    style={{ cursor: 'pointer' }}
                                    width={'20px'}
                                    height={'20px'}
                                    onClick={password} />
                        }

                    </div>
                </div>
                <div class="mb-3 form-check">
                    <input
                        type="checkbox"
                        checked={isAgree}
                        class="form-check-input"
                        id="exampleCheck1"
                        onClick={() => setIsAgree(!isAgree)}
                    />


                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>

                <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>


                <Link to={'/signin'} style={{ textDecoration: "none" }}>
                    <div className='mt-3'>
                        Create New Account
                    </div>
                </Link>


                <div className=' text-center me-4 mt-4 ms-4'>
                    <span className='ms-5 mx--5'>Sign In with Social Network</span>  <br />
                    <button type="button" class="btn btn-link btn-floating  ms-5 ">
                        <i class="fa fa-facebook"></i>
                    </button>


                    <button type="button" class="btn btn-link btn-floating mx-1">
                        <i class="fa fa-google"></i>
                    </button>

                    <button type="button" class="btn btn-link btn-floating mx-1">
                        <i class="fa fa-twitter"></i>
                    </button>

                    <button type="button" class="btn btn-link btn-floating mx-1">
                        <i class="fa fa-github"></i>
                    </button>
                </div>



            </div >
            <Toaster />

        </div >
    )

}
export default Login