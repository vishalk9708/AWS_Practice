import React, { useState } from "react";
// import { Form,Button } from "react-bootstrap";
import TenantUserPool from "../Tenant-userPool";
import SaasUserPool from "../saasAdmin-userPool";
import { AuthenticationDetails, CognitoUser} from 'amazon-cognito-identity-js';
import './Login.css'
import { Link,useNavigate} from "react-router-dom";
import swal from "sweetalert";

const Passwordreset=()=>{
    const [code,setCode]=useState();
    const [password,setPassword]=useState();
    const [cpassword,setCPassword]=useState();
    const navigate=useNavigate();
    var email=localStorage.getItem("email");
   var arr=email.split('@')
    var userData = {
        Username: localStorage.getItem("email"),
        Pool: arr[1]==="kfintech.com"?SaasUserPool:TenantUserPool,
    };
    const resetPassword=(e)=>{
        e.preventDefault();
        if(password!==cpassword){
            alert("Passwords are not same")
            return;
        }
        var cognitoUser = new CognitoUser(userData);
        cognitoUser.confirmPassword(code,password,{
            onSuccess(data){
                console.log("OnSuccess",data)
                navigate('/login')
                swal("Password Reset Successfully","","success");
            },
            onFailure(err){
                console.log("Onfailure",err)
            },
        })
    }
 return(
    <div className="login">
        <form onSubmit={resetPassword}>
            <center><h3>Password Reset</h3>
            <label>Code:</label><br/>
           <input value={code} onChange={e=>setCode(e.target.value)}/><br/>
           <label>New Password:</label><br/>
           <input value={password} onChange={e=>setPassword(e.target.value)}/><br/>
           <label>Confirm Password:</label><br/>
           <input value={cpassword} onChange={e=>setCPassword(e.target.value)}/><br/><br/>
           <button type="submit">Reset Password</button></center>
        </form>
    </div>
 )

}
export default Passwordreset;