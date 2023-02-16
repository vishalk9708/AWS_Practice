import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './profile.css'
function Profile() {
  return (
    <div className="profile">
      <center><h1>Profile Details</h1></center>
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
        <Form.Control type="file" />
      </Form.Group>
      <br/>
      <center><Button variant="primary" type="submit">
        Submit
      </Button></center>
      
    </Form>
    </div>
  );
}

export default Profile;