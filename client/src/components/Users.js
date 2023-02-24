import React from "react";
import { useNavigate,Link } from "react-router-dom";
import swal from "sweetalert";
import kfintech from '../img/kfintech.png'
import userData from "../utils/getMetaData";
import Login from "./Adminlogin";
// import { CognitoIdentityProviderClient,ListUsersCommand } from "amazon-cognito-identity-js";
const Users=()=>{
const navigate=useNavigate();
// const client = new CognitoIdentityProviderClient({
//     region: "eu-west-2",
//     credentials: {
//         accessKeyId: "",
//         secretAccessKey: "",
//     },
// })
// const command = new ListUsersCommand({ UserPoolId: "" });

// try {
//     const data = client.send(command);
//     return this.setState({ users: data });
// } catch (error) {
//     console.error(error);
//     return this.setState({ error: error });
// } finally {
//     this.setState({ loading: false });
// }
const handleLogout=()=>{
    swal("", "successfully logged out", "success")
    console.clear();
    localStorage.clear();
     navigate('/Adminlogin')
}
 return(
     <>
        <ul style={{backgroundColor:"white",borderStyle: "outset"}}>
            <Link to="/createuser"><li ><img src={kfintech} style={{width:"200px",height:'50px',marginTop:"-2%"}}/></li></Link>
            <li style={{float:"right"}} onClick={handleLogout}><Link>Signout</Link></li>
            <li style={{float:"right"}}><Link to="/users">Users</Link></li>
        </ul>

    </>
 )
}
 
 export default Users;