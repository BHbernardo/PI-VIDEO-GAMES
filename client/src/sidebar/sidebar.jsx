import "./sidebar.css";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const Sidebar = ({ showSidebar, toggleSidebar }) => {
  return (
    <div className={`sidebar ${showSidebar ? "active" : ""}`}>
      <div className="sidebar-content">
        <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes/>
        </button>
        
        <Link to = {'/home'} className="sidebar-link" >
            <p>HOME</p>
        </Link>

        <Link to={"/new"} className="sidebar-link">
          <p>CREATE NEW GAME</p>
        </Link>
        
        <Link to={"/About"} className="sidebar-link">
          <p>ABOUT ME</p>
        </Link>
        
      </div>
      <div className="logout">
        
        <Link to={"/"} className="sidebar-link">
          <p>LOG OUT</p>
        </Link>
        
      </div>
    </div>
  );
};

export default Sidebar;