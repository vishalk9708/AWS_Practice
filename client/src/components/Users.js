import React from "react";
import { useNavigate,Link } from "react-router-dom";
import kfintech from '../img/kfintech.png'

const Users=()=>{
     const navigate=useNavigate();

const handleLogout=()=>{

     console.clear();

     localStorage.clear();

     navigate('/')
}
 return(

     <>

        <ul style={{backgroundColor:"white",borderStyle: "outset"}}>

            <Link to="/profileDetails"><li ><img src={kfintech} style={{width:"200px",height:'50px',marginTop:"-2%"}}/></li></Link>

            <li style={{float:"right"}} onClick={handleLogout}><Link>Signout</Link></li>

            <li style={{float:"right"}}><Link to="/users">Users</Link></li>
        </ul>

    </>
 )}
 
 export default Users;