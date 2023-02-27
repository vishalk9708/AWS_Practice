import {Button, Form} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import './createTenantAdmin.css'
import React,{useState} from 'react';
import UserPool from '../Tenant-userPool';
import kfintech from '../img/kfintech.png'
import swal from 'sweetalert';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import axios from 'axios';

function CreateTenantAdmin() {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [name,setName]=useState();
    const [number,setNumber]=useState();
    const navigate=useNavigate();
    var attributeList = [];

    var dataName = {
        Name : 'name',
        Value : name
    };

    var dataPhoneNumber = {
        Name : 'phone_number',
        Value : number
    };
    var dataUserPool = {
        Name : 'custom:userPoolId',
        Value : 'bcab72e'
    };
    var dataTenant ={
      Name: 'custom:tenantId',
      Value: ""
    }
    var dataProfile ={
      Name: 'profile',
      Value: "Admin"
    }
    var attributeName = new CognitoUserAttribute(dataName);
    var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);
    var attributeUserPool = new CognitoUserAttribute(dataUserPool);
    var attributeTanent = new CognitoUserAttribute(dataTenant);
    var attributeProfile=new CognitoUserAttribute(dataProfile)
    attributeList.push(attributeName);
    attributeList.push(attributePhoneNumber);
    attributeList.push(attributeTanent);
    attributeList.push(attributeUserPool);
    attributeList.push(attributeProfile)

    const onSubmit=(e)=>{
      e.preventDefault();
      UserPool.signUp(email,password,attributeList,null,(err,data)=>{
        if(err){
          swal("", `${err.message}`, "warning")
          console.log(err);
          return;
        }
        else{
          console.log(data);
          // cloudFormation();
          createTenant();
        }
      })
    //Hit cloudFormation for each tenant onboarding
    // const cloudFormation = async() => {

    // }
    const createTenant = async() => {
      const user = {
        name: name,
        email: email,
        mobile: number,
        userPool_id: dataUserPool.Value,
        tenant_id: dataTenant.Value,
        userType: "admin"
      }
    
      await axios.post('http://localhost:8000/api/user', user)
           .then((res) => {
                  swal("Tenant account created successfully","", "success")
           })
           .catch((err) => {
                console.log("error", err);
           })
    }

    
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
      <center><h1>Create Tenant Admin</h1></center>
      <br/><br/>
        <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Tenant Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Tenant Mobile Number</Form.Label>
                <Form.Control type="text" placeholder="Enter Phone Number" value={number} onChange={(e)=>setNumber(e.target.value)}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
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

export default CreateTenantAdmin;