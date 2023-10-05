import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { UserProvider } from './userContext';


import Landing from './Component/Landing/Landing';
import Form from './Component/Form/Form';
import Home from './Component/HomeComponent/Home';
import Favorites from './Component/Favorites/Favorites';



function App() {

  const location= useLocation();

  return (
    <div >
      {
        location.pathname !== "/" && location.pathname !== "/login"
      }
      
    <UserProvider>
      <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/login' element={<Form/>} />
      <Route path='/home' element = {<Home/>} />
      <Route path="/favorites" element={<Favorites />} /> 
      </Routes>
    </UserProvider>  
    </div>
  );
}

export default App;
