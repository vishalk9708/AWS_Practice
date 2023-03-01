import React from "react";
import './Login.css'
import {Link, useNavigate} from 'react-router-dom';
import kfintech from '../img/kfintech.png'
import swal from 'sweetalert';
const Userhome=()=>{
    const navigate=useNavigate();
    const handleLogout = async() => {
        swal("", "successfully logged out", "success")
        console.clear();
        localStorage.clear();
        navigate('/login')
    }
    return(
        <>
        <ul style={{backgroundColor:"white",borderStyle: "outset"}}>
            <Link to="/userhome"><li ><img src={kfintech} style={{width:"200px",height:'50px',marginTop:"-2%"}}/></li></Link>
            <li style={{float:"right"}} onClick={handleLogout}><Link>Logout</Link></li>
        </ul>

        <center><h1>Welcome!</h1></center>
        </>
    )
}

export default Userhome