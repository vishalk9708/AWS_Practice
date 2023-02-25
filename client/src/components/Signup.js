import {Button, Form} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import './Signup.css'
import React,{useState} from 'react';
import UserPool from '../UserPool';
import kfintech from '../img/kfintech.png'
import swal from 'sweetalert';
import userData from '../utils/getMetaData';
import Profile from './Profile'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

function Signup() {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [name,setName]=useState();
    const [number,setNumber]=useState();
    const navigate=useNavigate();
    var attributeList = [];

    const randomId = function(length) {
      return Math.random().toString(36).substring(2, length+2);
    };

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
  Value: randomId(10)
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
        swal("Account Created!", "Please login to continue", "success")
        // navigate('/login')
        }
      })
    };
   return (
    <div>
    <ul style={{backgroundColor:"white",borderStyle: "outset"}}>
            <li ><img src={kfintech} style={{width:"200px",height:'50px'}}/></li>
            <li style={{float:"right"}}><Link to="/login">Logout</Link></li>
    </ul>
    <div className="signup">
      <center><h1>Create Tenant Admin</h1></center>
      <br/><br/>
        <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Tenant Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
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

export default Signup;