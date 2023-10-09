import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa"
import "./Nav.css";


export default function NavBar ({showSidebar, toggleSidebar}) {
    const navigate = useNavigate();
    const [name, setName] = useState("");

// Manejador que se va a ejecutar cuando se efectue una busqueda;
    const handleChange = (event) => {
      navigate(`/search?name=${name}`);
      setName(event.target.value);
    };

// Se va a ejecutar cuando se haga "click" en el boton de "busqueda";    
    const handleSearch = () => {
        navigate(`/search?name=${name}`);
    };

    return (
        <nav className="navbar">
            <div className="navbar-icon" onClick={toggleSidebar}>
                {showSidebar ? <FaTimes/> : <FaBars/>}
            </div>
            <div className="search">
                <input type="search" onChange={handleChange} value={name}/>
                <button onClick={handleSearch}>SEARCH</button>
            </div>
        </nav>
    )
}