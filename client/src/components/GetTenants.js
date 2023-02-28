import React, { useState } from "react";
import { useNavigate,Link, json } from "react-router-dom";
import swal from "sweetalert";
import kfintech from '../img/kfintech.png'
import Table from 'react-bootstrap/Table';
import axios from 'axios'

function GetTenants(){
    const [listTenants, setlistTenants] = useState([]);
    const navigate=useNavigate();

    const getUsers = async() => {
        await axios.get('http://localhost:8000/api/tenants')
            .then(async (res) => {
                setlistTenants(await res.data.data);
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
            <Link to="/onboard"><li ><img src={kfintech} style={{width:"200px",height:'50px',marginTop:"-2%"}}/></li></Link>
            <li style={{float:"right"}} onClick={handleLogout}><Link>Logout</Link></li>
            <li style={{float:"right"}}><Link to='/createadmin'>Create Admin</Link></li>
            <li style={{float:"right"}}><Link to="/getTenants">Tenants</Link></li>
        </ul>
        <br/>
        <center><h2>All Tenants of SaaS admin: </h2></center>
        <br/>
        <Table striped bordered hover size="sm">
        <thead>
            <tr>
            <th>#</th>
            <th>Name</th>
            <th>domain</th>
            <th>Apps</th>
            <th>Code</th>
            <th>TenantId</th>
            <th>UserPoolId</th>
            </tr>
        </thead>
        <tbody>
            {
                listTenants.map((tenant, index) => {
                    return (
                    <tr>
                        <td>{index+1}</td>
                        <td>{tenant.name}</td>
                        <td>{tenant.domain}</td>
                        <td>{JSON.stringify(tenant.app)}</td>
                        <td>{tenant.code}</td>
                        <td>{tenant.tenant_id}</td>
                        <td>{tenant.userpoolid}</td>
                    </tr>
                    )
                })
            }
        </tbody>
      
    </Table>
    </>
 )
}
 
 export default GetTenants;