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


window.Buffer = window.Buffer || require("buffer").Buffer;
// const config = {
//   bucketName: 'awspract101',
//   region: 'us-east-1',
//   accessKeyId: 'xxxxxx',
//   secretAccessKey: 'xxxxxxx',
// } 
const CreateUser=({ handleImages })=>{
  const navigate=useNavigate();
  const [name,setName]=useState();
  const [number,setNumber]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  // const randomId = function(length) {
  //   return Math.random().toString(36).substring(2, length+2);
  // };

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

const onSubmit= (e)=>{
  e.preventDefault();
  UserPool.signUp(email,password,attributeList,null,(err,data)=>{
    if(err){
      swal("", `${err.message}`, "warning")
      console.log(err);
      return;
    }
    else{
        swal("", "user created in userPool", "success")
        createUser();
    }
  })
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
  // const uploadFiles=(e)=>{
  //   e.preventDefault();
  //   S3FileUpload.uploadFile(file, config)
  //   .then((data) => 
  //   {
  //    console.log(data);
  //    setimgUrl(data.location)
  //    setEmail(localStorage.getItem(data.email))
  //    swal("", "Image uploaded Successfully", "success");

  //   })
  //   .catch((err) => {
  //     console.error(err)
  //     swal("", `${err.message}`, "warning");
  //   })

  // }
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