import React, { useState } from "react";
import { Form,Button } from "react-bootstrap";
import UserPool from "../UserPool";
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import './Login.css'
import { useNavigate } from "react-router-dom";
const Otpv=()=>{
   const navigate=useNavigate();
   const [num,setNum]=useState();
   var userData = {
	Username: localStorage.getItem("email"),
	Pool: UserPool,
};

const onSubmit=(e)=>{
    e.preventDefault();
var cognitoUser = new CognitoUser(userData);
cognitoUser.confirmRegistration(num, true, function(err, result) {
	if (err) {
		alert(err.message || JSON.stringify(err));
		return;
	}
    else{
	console.log("Otp verified");
    navigate('/Adminlogin')
    }
});
}


   return(
    <div className="login">
            <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formotp">
                <Form.Label>OTP:</Form.Label>
                <Form.Control type="text" placeholder="Enter otp" value={num}  onChange={(e)=>setNum(e.target.value)}/>
                <Form.Text className="text-muted">
                We'll never share your OTP with anyone else.
                </Form.Text>
            </Form.Group>
            <center><Button variant="primary" type="submit" >
                Submit
            </Button></center>
            </Form>
    </div>
   )
}
export default Otpv