import {Button, Form} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import './createTenantAdmin.css'
import React,{useState} from 'react';
import kfintech from '../img/kfintech.png'
import swal from 'sweetalert';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import axios from 'axios';

function OnboardTanent() {
    const [userpoolid,setuserpoolid]=useState();
    const [app,setApp]=useState([]);
    const [name,setName]=useState();
    const [code,setCode]=useState();
    const [domain,setDomain]=useState();
    const navigate=useNavigate();

    const onSubmit=async (e)=>{
      e.preventDefault();
   
    const createTenant = async() => {
      const tenant = {
        name: name,
        domain: domain,
        tenant_id: "12345",
        code: code,
        app: ["Digix","DataUtility"],
        userpoolid: "v098h"
      }
      await axios.post('http://localhost:8000/api/tenant', tenant)
           .then((res) => {
                  swal("Tenant account created successfully","", "success")
           })
           .catch((err) => {
                console.log("error", err);
           })
    }
    createTenant();

   

    
  }

    const handleLogout = async() => {
      swal("", "successfully logged out", "success")
      console.clear();
      localStorage.clear();
      navigate('/login')
  }
   return (
    <div>
      <ul style={{backgroundColor:"white",borderStyle: "outset"}}>
            <Link to="/createuser"><li ><img src={kfintech} style={{width:"200px",height:'50px',marginTop:"-2%"}}/></li></Link>
            <li style={{float:"right"}} onClick={handleLogout}><Link>Logout</Link></li>
            <li style={{float:"right"}}><Link to='/createadmin'>Create Admin</Link></li>
            <li style={{float:"right"}}><Link to="/getTenants">Tenants</Link></li>
      </ul>
    <div className="signup">
      <center><h1>Onboard Tenant </h1></center>
      <br/><br/>
        <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Tenant Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Domain Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Phone Number" value={domain} onChange={(e)=>setDomain(e.target.value)}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <center><Button variant="primary" type="submit" >
                Create Tenant
            </Button></center>
            <br/>
        </Form>
       
    </div>
    </div>
   )
}

export default OnboardTanent;