import {Col, Form, Row, Button} from 'react-bootstrap'
import {React,useState} from 'react';
import './profile.css'
import S3FileUpload from 'react-s3';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert'
import kfintech from '../img/kfintech.png'
import Login from './Login';
import UserPool2 from '../UserPool2';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

window.Buffer = window.Buffer || require("buffer").Buffer;
const config = {
  bucketName: 'awspract101',
  region: 'us-east-1',
  accessKeyId: 'xxxxxx',
  secretAccessKey: 'xxxxxxx',
} 
const Profile=({ handleImages })=>{
  const navigate=useNavigate();
  const [file,setFile]=useState();
  const [name,setName]=useState();
  const [logincount,setLogincount]=useState(0);
  // const [lastName,setlastName]=useState();
  const [number,setNumber]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const randomId = function(length) {
    return Math.random().toString(36).substring(2, length+2);
  };
  var attributeList = [];
  var dataName = {
      Name : 'name',
      Value : name
  };

  var dataPhoneNumber = {
      Name : 'phone_number',
      Value : number
  };
  var dataTanent ={
    Name: 'custom:tanentId',
    Value: randomId(7)
  }
  var datacount={
    Name: 'custom:logincount',
    Value: logincount
  }
  var attributeName = new CognitoUserAttribute(dataName);
  var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);
  var attributeTanent = new CognitoUserAttribute(dataTanent);
  attributeList.push(attributeName);
  attributeList.push(attributePhoneNumber);
  attributeList.push(attributeTanent);

const onSubmit=(e)=>{
  e.preventDefault();
  UserPool2.signUp(email,password,attributeList,null,(err,data)=>{
    if(err){
      swal("", `${err.message}`, "warning")
    console.log(err);
    return;
    }
    else{
    console.log(data);
    swal("User Created","", "success")
    }
  })
};
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
      navigate('/login')
  }
    return (
      <div>
    <ul style={{backgroundColor:"white",borderStyle: "outset"}}>
              <li ><img src={kfintech} style={{width:"200px",height:'50px'}}/></li>
              <li style={{float:"right", margin: "7px"}} onClick={handleLogout}><Link>Logout</Link></li>
              <li style={{float:"right", margin: "7px"}}><Link to="/users">Users</Link></li>

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

export default Profile;