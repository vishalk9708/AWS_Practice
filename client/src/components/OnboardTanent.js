import {Button, Form} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import './createTenantAdmin.css'
import React,{useState} from 'react';
import kfintech from '../img/kfintech.png'
import swal from 'sweetalert';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import Select from 'react-select'
import axios from 'axios';
import './Onboard.css'
import userData from '../utils/getMetaData';
import Error from './Error'
var randomId = require('random-id');
function OnboardTanent() {
    const [userpoolid,setuserpoolid]=useState();
    const [app,setApp]=useState(null);
    const [name,setName]=useState();
    const [code,setCode]=useState();
    const [domain,setDomain]=useState();
    const [appname,setAppname]=useState();
    const [listapps,setlistApps]=useState([]);
    const navigate=useNavigate();

    const setAppData = async() => {
      await axios.get('http://localhost:8000/api/applications')
          .then(async (res) => {
              setlistApps(await res.data.data);
          })
          .catch((err)=>{
              console.log('error', err);
          })
      }
      setAppData();
      // console.log(listapps)
   
    const options=[]
    listapps.map((data)=>{
      var obj={
        value:"",
        label:""
      }
      obj.value=data.appName;
      obj.label=obj.value;
      options.push(obj)
    })
    // console.log(options)
    // const [apps]= useState(options)
    const onSubmit=(e)=>{
      e.preventDefault();
      var tenantid=randomId(8, 'aA0');
      localStorage.setItem("tenant",tenantid)
      var apps=[]
      for(let i=0;i<app.length;i++){
        apps.push(app[i].value);
      }
      console.log(apps)
    const createTenant = async() => {
      const tenant = {
        name: name,
        domain: domain,
        tenant_id:tenantid,
        code: code,
        app: apps,
        userpoolid: "ap-south-1_uAyKrPGVw"
      }
      await axios.post('http://localhost:8000/api/tenant', tenant)
           .then((res) => {
                  swal("Tenant account created successfully","", "success")
                  navigate('/createTenantAdmin')
           })
           .catch((err) => {
                console.log("error", err);
           })
    }
    createTenant();  
  }
  const AddApp=(e)=>{
    e.preventDefault();
      const App = {
        appName: appname
      }
     axios.post('http://localhost:8000/api/application', App)
           .then((res) => {
                  swal("Application added successfully","", "success")
                  navigate('/onboard')
           })
           .catch((err) => {
                console.log("error", err);
           })
  }
    const handleLogout = async() => {
      swal("", "successfully logged out", "success")
      console.clear();
      localStorage.clear();
      userData.isLoggedIn=false
      userData.userType=""
      navigate('/login')
  }
  if(userData.isLoggedIn){
   return (
    <div>
      <ul style={{backgroundColor:"white",borderStyle: "outset"}}>
            <Link to="/onboard"><li ><img src={kfintech} style={{width:"200px",height:'50px',marginTop:"-2%"}}/></li></Link>
            <li style={{float:"right"}} onClick={handleLogout}><Link>Logout</Link></li>
            <li style={{float:"right"}}><Link to='/createadmin'>Create Admin</Link></li>
            <li style={{float:"right"}}><Link to="/getTenants">Tenants</Link></li>
            <li style={{float:"right"}}><Link to="/getapplications">Applications</Link></li>
      </ul>
    <div className="signup">
      <center><h1>Onboard Tenant </h1></center>
      <br/><br/>
        <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Tenant Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Domain Name</Form.Label>
                <Form.Control type="text" placeholder="Enter domain" value={domain} onChange={(e)=>setDomain(e.target.value)}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>App Name</Form.Label> 
            <Select defaultValue={app} onChange={setApp} options={options} isMulti={true}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Code</Form.Label>
                <Form.Control type="text" placeholder="Enter Code" value={code} onChange={(e)=>setCode(e.target.value)}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <center><Button variant="primary" type="submit" >
                Create Tenant
            </Button></center>
            <br/>
        </Form>
       
    </div>
    <div className='signup'>
    <center><h1>Onboard Application </h1></center>
    <br/><br/>
    <Form onSubmit={AddApp}>
        <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Application Name</Form.Label>
                <Form.Control type="text" placeholder="Enter App Name" value={appname} onChange={(e)=>setAppname(e.target.value)}/>
                <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <center><Button variant="primary" type="submit" >
                Add Application
            </Button></center>
            <br/>
        </Form>
    </div>
    </div>
   )
  }
  return(
    <>
    <Error/>
    </>
  )
}

export default OnboardTanent;