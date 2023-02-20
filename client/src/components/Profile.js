import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {React,useState} from 'react';
import './profile.css'
import S3FileUpload from 'react-s3';
import { Link, useNavigate } from 'react-router-dom';
window.Buffer = window.Buffer || require("buffer").Buffer;
const config = {
    bucketName: 'awspract101',
    region: 'us-east-1',
    accessKeyId: 'AKIARG6P3RWPJR2LXGMP',
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
     alert("Your image has been uploaded to s3")
    })
    .catch((err) => console.error(err))
  }
  const handleLogout=()=>{
      console.clear();
      localStorage.clear();
      navigate('/')

  }
  return (
    <>
    <div style={{marginTop:"-2%"}}>
    <Button onClick={handleLogout} style={{float:"right",textDecoration:"none"}}>SignOut</Button>
    </div>
    <div className="profile">
      <center><h1 style={{fontFamily:"fantasy"}}>Profile Details</h1></center>
      <br/><br/>
    <Form>
      <Form.Label>Full Name:</Form.Label>
      <Row>
        <Col>
          <Form.Control placeholder="First name" />
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
    </>
  );
}

export default Profile;