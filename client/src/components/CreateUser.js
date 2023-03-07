import {Col, Form, Row, Button} from 'react-bootstrap'
import {React,useState} from 'react';
import './createUser.css'
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert'
import kfintech from '../img/kfintech.png'
import UserPool from '../Tenant-userPool';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import axios from 'axios'
import userData from '../utils/getMetaData';
import Error from './Error'
import { CognitoIdentityProviderClient, AdminCreateUserCommand } from "@aws-sdk/client-cognito-identity-provider";


window.Buffer = window.Buffer || require("buffer").Buffer;
// const config = {
//   bucketName: 'awspract101',
//   region: 'us-east-1',
//   accessKeyId: 'xxxxxx',
//   secretAccessKey: 'xxxxxxx',
// } 
const CreateUser=()=>{
 
  const navigate=useNavigate();
  const [name,setName]=useState();
  const [number,setNumber]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();

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
    Value : 'ap-south-1_uAyKrPGVw'
};
var dataTenant ={
  Name: 'custom:tenantId',
  Value: localStorage.getItem('tenant')
}
var dataProfile ={
  Name: 'profile',
  Value: "User"
}
var dataemail={
  Name: 'email',
  Value: email
}
var attributeName = new CognitoUserAttribute(dataName);
var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);
var attributeUserPool = new CognitoUserAttribute(dataUserPool);
var attributeTanent = new CognitoUserAttribute(dataTenant);
var attributeProfile=new CognitoUserAttribute(dataProfile)
var attributeEmail=new CognitoUserAttribute(dataemail)
attributeList.push(attributeName);
attributeList.push(attributePhoneNumber);
attributeList.push(attributeTanent);
attributeList.push(attributeUserPool);
attributeList.push(attributeProfile)
attributeList.push(attributeEmail)

const onSubmit= (e)=>{
  e.preventDefault();
  const cognitoParams = {
    UserPoolId: 'ap-south-1_6NACRTmIM',
    DesiredDeliveryMediums: ['EMAIL'],
    ForceAliasCreation: true,
    MessageAction: 'SUPPRESS',
    TemporaryPassword: password,
    UserAttributes: attributeList,
    Username: email
  };
  console.log(cognitoParams)
  const client = new CognitoIdentityProviderClient({region:"ap-south-1", credentials:{accessKeyId:"AKIA3S5XP67EYKCKIQNJ",secretAccessKey:"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"}});
  const command = new AdminCreateUserCommand(cognitoParams);
  const response= client.send(command)
  console.log(response)
};

const createUser = async() => {
  const user = {
    name: name,
    mobile: number,
    email: email,
    password: password,
    userPool_id: dataUserPool.Value,
    tenant_id: dataTenant.Value,
    userType: "user"
  }

  await axios.post('http://localhost:8000/api/user', user)
       .then((res) => {
              swal("User Created in dynamo table","", "success")
       })
       .catch((err) => {
            console.log("error", err);
       })
}
  const handleLogout=()=>{
      console.clear();
      swal("", "Logout successfully", "success");
      localStorage.clear();
      userData.isLoggedIn=false
      userData.userType=""
      navigate('/login')
  }
  if(userData.isLoggedIn){
    return (
      <div>
    <ul style={{backgroundColor:"white",borderStyle: "outset"}}>
              <li ><img src={kfintech} style={{width:"200px",height:'50px'}}/></li>
              <li style={{float:"right", margin: "7px"}} onClick={handleLogout}><Link>Logout</Link></li>
              <li style={{float:"right", margin: "7px"}}><Link to="/getUsers">Users</Link></li>

      </ul>
      <div className="profile">
        <center><h1 style={{fontFamily:"fantasy"}}>Create User</h1></center>
        <br/><br/>
      <Form onSubmit={onSubmit}>
        <Form.Label>Full Name:</Form.Label> 
            <Form.Control placeholder="Full name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
          <br/>
          <Form.Label>Phone Number:</Form.Label>
            <Form.Control placeholder="phone_number" value={number} onChange={(e)=>{setNumber(e.target.value)}} />
          <br/>
          <Form.Label>Email:</Form.Label>
            <Form.Control placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
          <br/>
          <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
          <br/>
        {/* <form>
        <input type="file" id="myFile" name="filename" onChange={(e)=>setFile(e.target.files[0])}/>
        <button type="submit"  onClick={uploadFiles}>Upload</button>
        </form> */}
        <br/>
        <center><Button variant="primary" type="submit"  >
          Submit
        </Button></center>
        
      </Form>
      </div>
      <div className='details'>
      
      </div>
      </div>
    );
      }
      return(
        <>
        <Error/>
        </>
      )
  }

export default CreateUser;