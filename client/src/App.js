import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile'
import Signup from './components/Signup';
import Home from './components/Home'
import Users from './components/Users';
import Otp from './components/Otp';
import UserLogin from './components/Userlogin';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/createuser" element={<Profile />} />
            <Route path='/users' element={<Users/>}/>
            <Route path='/otpverification' element={<Otp/>}/>
            <Route path='/userlogin' element={<UserLogin/>}/>
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;