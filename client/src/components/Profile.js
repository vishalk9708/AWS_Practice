import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {React,useState} from 'react';
import './profile.css'
import S3FileUpload from 'react-s3';
window.Buffer = window.Buffer || require("buffer").Buffer;
const config = {
    bucketName: 'awspract101',
    region: 'us-east-1',
    accessKeyId: 'AKIARG6P3RWPCEDEYFPO',
    secretAccessKey: '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',
} 
const Profile=({ handleImages })=>{
  const [file,setFile]=useState();
  const uploadFiles=(e)=>{
    e.preventDefault();
    S3FileUpload.uploadFile(file, config)
    .then((data) => 
    {console.log(data);
     alert("Your image has been uploaded to s3")
    })
    .catch((err) => console.error(err))
  }
  return (
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
  );
}

export default Profile;