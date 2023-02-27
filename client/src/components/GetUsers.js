import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import swal from "sweetalert";
import kfintech from '../img/kfintech.png'
import Table from 'react-bootstrap/Table';
import axios from 'axios'

const GetUsers = () => {
    const [listUsers, setlistUsers] = useState([]);
    const navigate=useNavigate();
    const tenantId = localStorage.getItem("tenant");
    var count = 0;

    const getUsers = async() => {
        await axios.get('http://localhost:8000/api/users')
            .then(async (res) => {
                setlistUsers(await res.data.data);
            })
            .catch((err)=>{
                console.log('error', err);
            })
        }
    getUsers();
   
    const handleLogout = async() => {
        swal("", "successfully logged out", "success")
        console.clear();
        localStorage.clear();
        navigate('/login')
    }
 return(
     <>
        <ul style={{backgroundColor:"white",borderStyle: "outset"}}>
            <Link to="/createUser"><li ><img src={kfintech} style={{width:"200px",height:'50px',marginTop:"-2%"}}/></li></Link>
            <li style={{float:"right"}} onClick={handleLogout}><Link>Signout</Link></li>
            <li style={{float:"right"}}><Link to="/getUsers">Users</Link></li>
        </ul>
        <br/>
        <center><h2>All Users of tenant id: {tenantId}</h2></center>
        <br/>
        <Table striped bordered hover size="sm">
        <thead>
            <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Password</th>
            <th>UserPoolId</th>
            </tr>
        </thead>
        <tbody>
            {
                listUsers.map((user, index) => {
                    return (
                    <tr>
                        <td>{index+1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.mobile}</td>
                        <td>{user.password}</td>
                        <td>{user.userPool_id}</td>
                    </tr>
                    )
                })
            }
        </tbody>
      
    </Table>
    </>
 )
}
 
 export default GetUsers;