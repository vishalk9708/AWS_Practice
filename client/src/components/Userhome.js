import React, { useState } from "react";
import './Login.css'
import {Link, useNavigate} from 'react-router-dom';
import kfintech from '../img/kfintech.png'
import swal from 'sweetalert';
import userData from "../utils/getMetaData";
import Error from './Error'
import axios from "axios";
import { Table } from "react-bootstrap";

const Userhome=()=>{
    const navigate=useNavigate();
    const [data, setData] = useState([])
    const token = localStorage.getItem("CognitoIdentityServiceProvider.5h0phmbjubhhpd0h79iougr77t.0adc717b-49a3-4bca-84e7-28ad6601dddd.idToken");

    const result = async() => {
        await axios.get("https://3g0mttj2u2.execute-api.ap-south-1.amazonaws.com/prod/", {headers: {"Content-Type":"application/json", "Authorization":token}})
        .then(async(res)=> {
            setData(await res.data.users)
        })
        .catch((err)=>{
            console.log(err);
        })
    };
    result();

    const handleLogout = async() => {
        swal("", "successfully logged out", "success")
        console.clear();
        localStorage.clear();
        userData.isLoggedIn=false
        userData.userType=""
        navigate('/login')
    }
    

    if(userData.isLoggedIn){
    return(
        <>
        <ul style={{backgroundColor:"white",borderStyle: "outset"}}>
            <Link to="/userhome"><li ><img src={kfintech} style={{width:"200px",height:'50px',marginTop:"-2%"}}/></li></Link>
            <li style={{float:"right"}} onClick={handleLogout}><Link>Logout</Link></li>
        </ul>

        <center><h1>Welcome!</h1></center>
        <Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>#</th>
                <th>id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map((item, index) =>{
                    return (
                        <tr>
                            <td>{index}</td>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                        </tr>
                    )
                })
            }
        </tbody>
      
        </Table>
        </>
    )
    }
return(
    <>
     <Error/>
    </>
    )
}

export default Userhome