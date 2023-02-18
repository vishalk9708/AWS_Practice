import React from "react";
import { Link } from "react-router-dom";

const Home=()=>{
    return(
        <>
        <Link to='/login'><h2>Login</h2></Link>
        <Link to='/signup'><h2>Signup</h2></Link>
        </>
    )
}
export default Home