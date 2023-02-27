import {Button, Form} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import './createTenantAdmin.css'
import React,{useState} from 'react';
import UserPool from '../saasAdmin-userPool';
import kfintech from '../img/kfintech.png'
import swal from 'sweetalert';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import axios from 'axios';

function CreateSaaSAdmin() {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const navigate=useNavigate();

    const onSubmit=(e)=>{
      e.preventDefault();
      UserPool.signUp(email,password,[],null,(err,data)=>{
        if(err){
          swal("", `${err.message}`, "warning")
          console.log(err);
          return;
        }
        else{
          console.log(data);
          swal("SaaS Admin Created","","success")
        }
      })
    //Hit cloudFormation for each tenant onboarding
    // const cloudFormation = async() => {

    // }
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
            <Link to="/onboard"><li ><img src={kfintech} style={{width:"200px",height:'50px',marginTop:"-2%"}}/></li></Link>
            <li style={{float:"right"}} onClick={handleLogout}><Link>Logout</Link></li>
            <li style={{float:"right"}}><Link to="/getTenants">Tenants</Link></li>
      </ul>
    <div className="signup">
      <center><h1>Create SaaS Admin</h1></center>
      <br/><br/>
        <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>SaaS Admin Email</Form.Label>
                <Form.Control type="text" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <center><Button variant="primary" type="submit" >
                Create Admin
            </Button></center>
            <br/>
        </Form>
       
    </div>
    </div>
   )
}

export default CreateSaaSAdmin;