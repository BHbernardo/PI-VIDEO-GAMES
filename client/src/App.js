import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { UserProvider } from './userContext';
import { useState } from 'react';


import Landing from './Component/Landing/Landing';
import Form from './Component/Form/Form';
import Home from './Component/HomeComponent/Home';
import SearchBar from './Component/SearchBarComponent/SearchBar';
import NavBar from './Component/NavComponent/Nav';
import Sidebar from './sidebar/sidebar';
import Detail from './Component/DetailComponent/Detail';
import NewVideoGames from './Component/NewVideoGame/newVideoGame';
import About from './Component/AboutComponent/About';
import Fotter from './Component/Footer/fotter'


function App() {

  const { pathname }= useLocation();

  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
  };

  const location = pathname !== "/" && pathname !== "/login"; 

  return (
    <div className='App'>
      { location && ( 
        <div className='app-container'> 
        <NavBar showSidebar={showSidebar} toggleSidebar={toggleSidebar}/>
        <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
        </div>
      )}
      
    <UserProvider>
      <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/login' element={<Form/>} />
      <Route path='/home' element = {<Home/>} />
      <Route path='/search' element={<SearchBar/>}/>
      <Route path='/detail/:id' element={<Detail/>}/>
      <Route path='/new' element={<NewVideoGames/>}/>
      <Route path='/about' element={<About/>} />
      </Routes>
    </UserProvider>  
    {location && (
      <div className='app-container'>
         <Fotter/>
      </div>  
    )}
    </div>
  );
}

export default App;
