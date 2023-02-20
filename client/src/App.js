import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile'
import Signup from './components/Signup';
import Home from './components/Home'
import Users from './components/Users';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/profileDetails" element={<Profile />} />
            <Route path='/users' element={<Users/>}/>
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;