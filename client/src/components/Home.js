import React from "react";
import { Link } from "react-router-dom";
import './home.css'
import kfintech from '../img/kfintech.png'
import image from '../img/img1.png'
const Home=()=>{
    return(
        <div>
        <ul style={{backgroundColor:"white",borderStyle: "outset"}}>
            <li ><img src={kfintech} style={{width:"200px",height:'50px'}}/></li>
            <li style={{float:"right"}}><Link to="/login">Login</Link></li>
            <li style={{float:"right"}}><Link to="/signup">Signup</Link></li>
        </ul>
        <img src={image} style={{width:"100%",height:"100%", marginTop: "1px"}}/>
        </div>
    )
}
export default Home