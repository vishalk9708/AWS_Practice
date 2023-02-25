import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import './home.css'
import kfintech from '../img/kfintech.png'
import image from '../img/img1.png'
import swal from 'sweetalert'
const Userhome=(e)=>{
    const navigate=useNavigate();
    const handleLogout=()=>{
      console.clear();
      swal("", "Logout successfully", "success");
      localStorage.clear();
      navigate('/login')
    }
    return(
        <div>
        <ul style={{backgroundColor:"white",borderStyle: "outset"}}>
            <li ><img src={kfintech} style={{width:"200px",height:'50px'}}/></li>
            <li style={{float:"right"}} onClick={handleLogout}><Link>Logout</Link></li>
            <li style={{float:"right", margin: "7px"}}><Link>Applications</Link></li>
        </ul>
        <img src={image} style={{width:"100%",height:"100%", marginTop: "1px"}}/>
        </div>
    )
}
export default Userhome