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
   var email=localStorage.getItem("email");
   var arr=email.split('@')
   var userData = {
	Username: localStorage.getItem("email"),
	Pool: arr[1]=="kfintech.com"?SaasUserPool:TenantUserPool,
};
const sendCode=(e)=>{
    var cognitoUser = new CognitoUser(userData);
   cognitoUser.forgotPassword({
        onSuccess(data){
            console.log('OnSuccess:',data);
        },
        onFailure(err){
            console.log('onFailure',err)
        },
        inputVerificationCode(data){
            console.log('Input code',data)
            navigate('/passwordreset');
        }
    });
}
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
    // navigate('/login')
    sendCode();
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