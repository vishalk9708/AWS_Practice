import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile'
import Logout from './components/Logout'
import Signup from './components/Signup';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Signup/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/profileDetails" element={<Profile />} />
            <Route path="/logout" element={<Logout/>}/>
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;