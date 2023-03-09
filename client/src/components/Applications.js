import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import swal from "sweetalert";
import kfintech from '../img/kfintech.png'
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import userData from "../utils/getMetaData";
import Error from './Error'
import { Button } from "react-bootstrap";
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';

const Applications = () => {
    const [listApps, setlistApps] = useState([]);
    const navigate=useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/application')
            .then((res) => {
                setlistApps(res.data.data);
            })
            .catch((err)=>{
                console.log('error', err);
            })
    }, [])
    
    const EditApp=(app, e)=>{
        e.preventDefault();
        localStorage.setItem("app", app.appName);
        localStorage.setItem("appClientId", app.appClientId);
        navigate('/changeappname')
    }
      
    const DeleteApp=(appClientId)=>{
        axios.delete(`http://localhost:8000/api/application/${appClientId}`)
            .then((res) => {
                swal('Deleted Successfully',"","success")
            })
            .catch((err)=>{
                console.log('error', err);
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
 return(
     <>
        <ul style={{backgroundColor:"white",borderStyle: "outset"}}>
            <Link to="/onboard"><li ><img src={kfintech} style={{width:"200px",height:'50px',marginTop:"-2%"}}/></li></Link>
            <li style={{float:"right"}} onClick={handleLogout}><Link>Signout</Link></li>
            <li style={{float:"right"}}><Link to="/getTenants">Tenants</Link></li>
        </ul>
        <br/>
        <center><h2>All Kfintech Applications</h2></center>
        <br/>
        
        <Table striped bordered hover size="sm">
        <thead>
            <tr>
            <th>#</th>
            <th>Applications</th>
            <th>AppClientId</th>
            <th></th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            {
                listApps.map((app, index) => {
                    return (
                    <tr>
                        <td>{index+1}</td>
                        <td>{app.appName}</td>
                        <td>{app.appClientId}</td>
                        <td><center><Button onClick={(e)=>EditApp(app, e)}>Edit</Button></center></td>
                        <td><center><Button onClick={(e)=>DeleteApp(app.appClientId, e)}>Delete</Button></center></td>
                    </tr>
                    )
                })
            }
        </tbody>
      
    </Table>
    </>
 )
        }
return(
    <>
    <Error/>
    </>
    )
}
 
 export default Applications;