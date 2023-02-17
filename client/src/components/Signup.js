import {Button, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Signup.css'
import React,{useState} from 'react';
import UserPool from '../UserPool';
import Login from './Login';
import { Route } from 'react-router-dom';

function Signup() {
    const [email,setEmail]=useState();
    // const [name,setName]=useState();
    // const [phone_number,setPhone]=useState();
    const [password,setPassword]=useState();
    const onSubmit=(e)=>{
      e.preventDefault();

      UserPool.signUp(email,password,[],null,(err,data)=>{
        if(err){
        console.log(err);
        return;
        }
        console.log(data);
      })
    };

   return (
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
   )
}

export default Signup;