import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import {Button, Form} from 'react-bootstrap';
import tenantUserPool from '../Tenant-userPool';
import saasAdminPool from '../saasAdmin-userPool';
import React,{useState} from 'react';
import './Login.css'
import {Link,useNavigate} from 'react-router-dom';
import swal from 'sweetalert'
import kfintech from '../img/kfintech.png'

function Adminlogin() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const navigate=useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();
        // const arr = email.split("@")
        localStorage.setItem("email",email)
        const user = new CognitoUser({
            Username: email,
            Pool: ( email === "v-parag.poddar@kfintech.com") ? saasAdminPool:tenantUserPool
        })
        const AuthDetails= new AuthenticationDetails({
            email: email,
            Password: password
        })
        user.authenticateUser(AuthDetails,{
            onSuccess:(data)=>{
                console.log(data)
                console.log("success")
                swal("Login Successful", "", "success");
                if(email!=="v-parag.poddar@kfintech.com")
                {
                localStorage.setItem("tenant",data.idToken.payload['custom:tenantId'])
                if(data.idToken.payload.profile === "Admin")
                {
                navigate('/createUser')
                }
                else if(data.idToken.payload.profile === "User")
                navigate('/userhome')
                }    
               else
               {
                navigate('/createTenantAdmin')
                }
                
            },
            onFailure:(err)=>{
                if(err.message==="User is not confirmed.")
                {
                navigate('/otpverification')
                }
                else{
                console.error("onFailure",err)
                swal("", `${err.message}`, "success");
                }

            },
            newPasswordRequired:(data)=>{
                console.log("newPasswordReq",data);
            }
        })
        
      };
   return (
    <div>
    <ul style={{backgroundColor:"white",borderStyle: "outset"}}>
            <li ><img src={kfintech} style={{width:"200px",height:'50px'}}/></li>
            <li style={{float:"right"}}><Link to="/login">Login</Link></li>
    </ul>
    <div className="login">
      <center><h1>Login Page</h1></center>
      <br/><br/>
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email}  autoSave='off' onChange={(e)=>setEmail(e.target.value)}/>
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <center><Button variant="primary" type="submit" >
                Login
            </Button></center>
            <br/>
        </Form>
    </div>
    </div>
   )
}

export default Adminlogin;