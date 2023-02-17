import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/profileDetails" element={<Profile />} />
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;