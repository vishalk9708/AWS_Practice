import {Button, Form} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import './Signup.css'
import React,{useState} from 'react';
import UserPool from '../UserPool';
import kfintech from '../img/kfintech.png'
import swal from 'sweetalert';
import userData from '../utils/getMetaData';
import Profile from './Profile'

function Signup() {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const navigate=useNavigate();
    const onSubmit=(e)=>{
      e.preventDefault();

      UserPool.signUp(email,password,[],null,(err,data)=>{
        if(err){
          swal("", `${err.message}`, "warning")
        console.log(err);
        return;
        }
        else{
        console.log(data);
        swal("Account Created!", "Please login to continue", "success")
        navigate('/login')
        }
      })
    };
  if(userData.isLoggedIn === false){
   return (
    <div>
    <ul style={{backgroundColor:"white",borderStyle: "outset"}}>
            <li ><img src={kfintech} style={{width:"200px",height:'50px'}}/></li>
            <li style={{float:"right"}}><Link to="/login">Login</Link></li>
            <li style={{float:"right"}}><Link to="/signup">Signup</Link></li>
    </ul>
    <div className="signup">
      <center><h1>AWS Practice Signup</h1></center>
      <br/><br/>
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <center><Button variant="primary" type="submit" >
                Signup
            </Button></center>
            <br/>
            <center> <Link to='/login'><p>Already have an account? Login</p></Link></center>
        </Form>
       
    </div>
    </div>
   )}
   else {
    return (
      <>
        <Profile/>
        skgvjjdkv
      </>
    )
   }
}

export default Signup;