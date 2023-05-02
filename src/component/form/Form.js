import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';


function Form() {

    const [addlist, setAddList] = useState("")
    const [getall, setgetall] = useState([])
    const [getbackid, setgetbackid] = useState("")




    const getallList = async () => {
        const res = await axios.get("http://localhost:8081/get/all/list", {
            headers: {
                Authorization:localStorage.getItem('token')
            }
        })
        setgetall(res.data)

    }

    useEffect(() => {
        getallList()
    }, [])

    const handlechange = (e) => {
        setAddList(e.target.value);


    }
    const handlechangeGet = (e) => {
        setgetbackid((data) => ({ ...data, [e.target.name]: e.target.value }))
    }


    const handleSubmit = async () => {
        if (addlist === "") {
            toast.error("add to-do")
            return;
        }
        const res = await axios.post('http://localhost:8081/create/todo', { todo: addlist },{
            headers: {
                Authorization:localStorage.getItem('token')
            }
        })
        if (res.status === 200) {
            toast.success("Added")
            setAddList("")
            getallList()

        }

    }

    const edit = async (id) => {
        
        if(id!==undefined){
            const res = await axios.get(`http://localhost:8081/get/one/list/${id}`,{
                headers: {
                    Authorization:localStorage.getItem('token')
                }
            })
            setgetbackid(res.data)
        }
    }

    useEffect(() => {
        
            edit()
      
        
    }, [])

    const handlechangeEdit = async (id) => {
       
            const res = await axios.put(`http://localhost:8081/update/list/${id}`, getbackid,{
                headers: {
                    Authorization:localStorage.getItem('token')
                }
            })
            if (res.status == 200) {
                toast.success('updated')
                setgetbackid("")
                getallList()
            }
       


    }
   
    const handledelete = async (id) => {
        const res = await axios.delete(`http://localhost:8081/delete/student/${id}`,{
            headers: {
                Authorization:localStorage.getItem('token')
            }
        })
        getallList()



    }
   


    const handleMission = async (id) => {
        const res = await axios.put(`http://localhost:8081/update/mission/${id}`, { isCompleted: true },{
            headers: {
                Authorization:localStorage.getItem('token')
            }
        })
        if (res.status == 200) {
            toast.success('updated')
            setgetbackid("")
            getallList()
           
        }


        
    }
    return (

        <div >

            <input type='text' placeholder='Enter a Todo...' name='todo' value={getbackid === "" ? addlist : getbackid.todo} className='task-input' onChange={getbackid === "" ? (e) => handlechange(e) : (e) => handlechangeGet(e)} />

            {


                getbackid === "" ? <button className='button-add' type='submit' onClick={() => handleSubmit()}>Add</button> : <button className='button-add' type='submit' onClick={() => handlechangeEdit(getbackid._id)}>OK</button>
            }

            <div className='mt-4' style={{ height: '425px', overflowY: 'auto' }}>
                {
                    getall.map((item) => {
                        return (

                            <div>
                                <li className='list-item '>
                                    <input type='text' value={item.todo} className={item.isCompleted ? 'text-muted fw-light text-decoration-line-through list' : " fw-bold list"} />
                                    <div>

                                        <button className={item.isCompleted ? 'button-complete1' : 'button-complete'} onClick={() => handleMission(item._id)}>
                                            <i className='fa fa-check-circle'></i>
                                        </button>

                                        <button className='button-edit task-button' onClick={() => item.isCompleted ? "" : edit(item._id)}>
                                            <i className='fa fa-edit'></i>
                                        </button>
                                        <button className='button-delete task-button' onClick={() => handledelete(item._id)}>
                                            <i className='fa fa-trash'></i>
                                        </button>
                                    </div>
                                </li>
                            </div>
                        )

                    })
                }
            </div>


            <Toaster />
        </div>


    )
}

export default Form