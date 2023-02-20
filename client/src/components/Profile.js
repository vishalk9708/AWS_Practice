import {Col, Form, Row, Button} from 'react-bootstrap'
import {React,useState} from 'react';
import './profile.css'
import S3FileUpload from 'react-s3';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert'
import kfintech from '../img/kfintech.png'
import userData from '../utils/getMetaData';
import Login from './Login';

window.Buffer = window.Buffer || require("buffer").Buffer;
const config = {
  bucketName: 'myawsbucket9708',
  region: 'us-east-1',
  accessKeyId: 'AKIASS455I4ZTFT24HNY',
  secretAccessKey: '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',
} 
const Profile=({ handleImages })=>{
  const navigate=useNavigate();
  const [file,setFile]=useState();
  const uploadFiles=(e)=>{
    e.preventDefault();
    S3FileUpload.uploadFile(file, config)
    .then((data) => 
    {
     console.log(data);
     swal("", "User created Successfully", "success");
    })
    .catch((err) => {
      console.error(err)
      swal("", `${err.message}`, "warning");
    })

  }
  const handleLogout=()=>{
      console.clear();
      swal("", "Logout successfully", "success");
      userData.isLoggedIn = false;
      userData.email = null
      userData.name = null
      localStorage.clear();
      console.log(userData);
      navigate('/login')

  }
  if(userData.isLoggedIn === true) {
    return (
      <div>
    <ul style={{backgroundColor:"white",borderStyle: "outset"}}>
              <li ><img src={kfintech} style={{width:"200px",height:'50px'}}/></li>
              <li style={{float:"right", margin: "7px"}} onClick={handleLogout}><Link>Logout</Link></li>
              <li style={{float:"right", margin: "7px"}}><Link to="/users">Users</Link></li>

      </ul>
      <div className="profile">
        <center><h1 style={{fontFamily:"fantasy"}}>Profile Details</h1></center>
        <br/><br/>
      <Form>
        <Form.Label>Full Name:</Form.Label> 
        <Row>
          <Col>
            <Form.Control placeholder="First name"/>
          </Col>
          <Col>
            <Form.Control placeholder="Last name" />
          </Col>
          </Row>
          <br/>
          <Form.Label>Company:</Form.Label>
            <Form.Control placeholder="Company Name" />
          <br/>
          <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Please upload your profile image</Form.Label>
          <Form.Control type="file" name="images" onChange={(e)=>setFile(e.target.files[0])}  />
        </Form.Group>
        <br/>
        <center><Button variant="primary" type="submit" onClick={uploadFiles}>
          Submit
        </Button></center>
        
      </Form>
      </div>
      <div className='details'>
      
      </div>
      </div>
    );
  }
  else {
    swal("Access Denied", "Go and Login first", "warning")
    return (<>
      <Login/>
    </>
    )
  }
}

export default Profile;