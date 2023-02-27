import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import CreateUser from './components/CreateUser'
import CreateTenantAdmin from './components/CreateTenantAdmin';
import Home from './components/Home'
import GetUsers from './components/GetUsers';
import GetTenants from './components/GetTenants';
import Otp from './components/Otp';
import dotenv from 'dotenv'
dotenv.config();

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/createTenantAdmin' element={<CreateTenantAdmin/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/createUser" element={<CreateUser />} />
            <Route path='/getUsers' element={<GetUsers/>}/>
            <Route path='/GetTenants' element={<GetTenants/>}/>
            <Route path='/otpverification' element={<Otp/>}/>
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;