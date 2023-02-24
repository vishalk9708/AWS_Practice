import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Adminlogin from './components/Adminlogin';
import Profile from './components/Profile'
import Signup from './components/Signup';
import Home from './components/Home'
import Users from './components/Users';
import Otp from './components/Otp';
import UserLogin from './components/Userlogin';
import SaaSLogin from './components/Saaslogin';
import Otpv from './components/Otpv';
import Userhome from './components/Userhome';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path="/Adminlogin" element={<Adminlogin />}/>
            <Route path="/createuser" element={<Profile />} />
            <Route path='/users' element={<Users/>}/>
            <Route path='/otpverification' element={<Otp/>}/>
            <Route path='/userlogin' element={<UserLogin/>}/>
            <Route path='/saaslogin' element={<SaaSLogin/>}/>
            <Route path='/adminotpverification' element={<Otpv/>}/>
            <Route path='/userhome' element={<Userhome/>}/>
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;