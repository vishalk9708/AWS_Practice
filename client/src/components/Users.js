import React from "react";
import { useNavigate,Link } from "react-router-dom";
import swal from "sweetalert";
import kfintech from '../img/kfintech.png'
import userData from "../utils/getMetaData";
import Login from "./Login";

const Users=()=>{
     const navigate=useNavigate();

const handleLogout=()=>{
    swal("", "successfully logged out", "success")
    console.clear();
    userData.isLoggedIn = false;
    userData.email = null
    localStorage.clear();
     navigate('/')
}
if(userData.isLoggedIn === true){
 return(
     <>
        <ul style={{backgroundColor:"white",borderStyle: "outset"}}>
            <Link to="/profileDetails"><li ><img src={kfintech} style={{width:"200px",height:'50px',marginTop:"-2%"}}/></li></Link>
            <li style={{float:"right"}} onClick={handleLogout}><Link>Signout</Link></li>
            <li style={{float:"right"}}><Link to="/users">Users</Link></li>
        </ul>

    </>
 )}
 else {
    swal("Access Denied", "Go and Login first", "warning")
    return (<>
      <Login/>
    </>
    )
  }
}
 
 export default Users;