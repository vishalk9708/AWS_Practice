import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import {Button, Form} from 'react-bootstrap';
import UserPool from '../UserPool';
import React,{useState} from 'react';
import './Login.css'
import {Link,useNavigate} from 'react-router-dom';
import swal from 'sweetalert'
import kfintech from '../img/kfintech.png'
import userData from '../utils/getMetaData'
import setSessionData from '../utils/setSessionData';

function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const navigate=useNavigate();
    const onSubmit=(e)=>{
        e.preventDefault();
        
        const user=new CognitoUser({
            Username: email,
            Pool: UserPool
        })
        const AuthDetails= new AuthenticationDetails({
            email: email,
            Password: password
        })

       
        user.authenticateUser(AuthDetails,{
            onSuccess:(data)=>{
                userData.email = email
                userData.isLoggedIn = true
                userData.name = email.split("@")[0];
                // userData.token = AuthDetails
                
                setSessionData(userData);
                console.log(userData);

                swal("Login Successful", "", "success");
                navigate('/profileDetails')
            },
            onFailure:(err)=>{
                console.error("onFailure",err)
                swal("", `${err.message}`, "success");

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
            <li style={{float:"right"}}><Link to="/signup">Signup</Link></li>
        </ul>
    <div className="login">
      <center><h1>AWS Practice Login</h1></center>
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
            <center><Link to='/signup'><p>Don't have an account? SignUp</p></Link></center>
        </Form>
    </div>
    </div>
   )
}

export default Login;