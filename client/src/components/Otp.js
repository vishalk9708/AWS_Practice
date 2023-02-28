import React, { useState } from "react";
import { Form,Button } from "react-bootstrap";
import TenantUserPool from "../Tenant-userPool";
import SaasUserPool from "../saasAdmin-userPool";
import { AuthenticationDetails, CognitoUser,Cog } from 'amazon-cognito-identity-js';
import './Login.css'
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
const Otp=()=>{
   const navigate=useNavigate();
   const [num,setNum]=useState();
   var userData = {
	Username: localStorage.getItem("email"),
	Pool: localStorage.getItem("email")=="v-parag.poddar@kfintech.com"?SaasUserPool:TenantUserPool,
};
const handleotp=(e)=>{
  e.preventDefault();
  var cognitoUser = new CognitoUser(userData);
  cognitoUser.resendConfirmationCode(function(err, result) {
	if (err) {
		alert(err.message || JSON.stringify(err));
		return;
	}
	console.log('call result: ' + result);
});
}
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
    swal("Successfully verified!","","success")
    navigate('/login')
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
            </Button>
            <br/><br/>
            <Button onClick={handleotp}>Send Otp again?</Button></center>
            <br/>
            </Form>
    </div>
   )
}
export default Otp