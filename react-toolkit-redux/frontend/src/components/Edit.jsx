import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"

const Edit = ()=>{


    const users = {
        fname: "",
        lname: "",
        email: ""
     }
    
     const {id} = useParams();
     const navigate = useNavigate();
     const [user, setUser] = useState(users);
    
     const inputChangeHandler = (e) =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value});
        // console.log(user);
     }
    
     useEffect(()=>{
        axios.get(`http://localhost:3000/api/getone/${id}`)
        .then((response)=>{
            setUser(response.data)
        })
        .catch((error)=>{
            console.log(error);
        })
     },[id])
    
    
     const submitForm = async(e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:3000/api/update/${id}`, user)
        .then((response)=>{
           navigate("/")
        })
        .catch(error => console.log(error))
     }

    return (
        <div className="usertable">
            <Link to={"/"} className="btn btn-dark"> Back </Link>
            <h1>Update User</h1>
            <form action="" onSubmit={submitForm}>
                <div className="form d-flex">
                <input className="form-control" value={user.fname} onChange={inputChangeHandler} type="text" placeholder="First Name" name='fname'/>
                <input className="form-control" value={user.lname} onChange={inputChangeHandler} type="text" placeholder="Last Name" name='lname'/>
                <input className="form-control" value={user.email} onChange={inputChangeHandler} type="email" placeholder="Email" name='email'/>
                <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    )
}

export default Edit
