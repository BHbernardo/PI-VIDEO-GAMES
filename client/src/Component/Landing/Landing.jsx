import { Link } from "react-router-dom";
import  "./Landing.css";

const Landing = () => {
    return (
        <div className="landingContainer">
            <Link to={"/login"}> 
            <p>START</p>
            </Link>
        </div>
    )
}

export default Landing