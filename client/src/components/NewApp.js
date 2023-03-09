import React, { useState } from "react";
import { Form,Button } from "react-bootstrap";
import './Login.css'
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

const NewAppName=(props)=>{
   const navigate=useNavigate();
   const [appname,setAppname]=useState();

   const onSubmit=(e)=>{
        e.preventDefault();
        const data = {
            appClientId: localStorage.getItem("appClientId"),
            appName: appname
        }

        axios.post(`http://localhost:8000/api/application`, data)
                .then((res) => {
                    swal(appname +' changed successfully',"","success")
                })
                .catch((err)=>{
                    console.log('error', err);
                })
        navigate('/getapplications')
   }
   
   return(
    <div className="login">
            <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formotp">
                <Form.Label>Old App Name:</Form.Label>
                <Form.Control type="text" placeholder={localStorage.getItem("app")} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formotp">
                <Form.Label>New App Name:</Form.Label>
                <Form.Control type="text" placeholder="New app name" value={appname} onChange={(e)=>setAppname(e.target.value)}/>
            </Form.Group>
            <center><Button variant="primary" type="submit" >
                Submit
            </Button></center>
            </Form>
    </div>
   )
}
export default NewAppName