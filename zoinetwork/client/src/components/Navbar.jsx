import "../assets/stylesheets/navbar.css";
import { NavLink } from "react-router-dom"
import { useAuth } from "../store/auth";

const Navbar = () => {

    const { isLoggedIn } = useAuth();

    return (
        <>
         {isLoggedIn && (
        <header>
            <nav>
                <ul>
                    <li><NavLink className="nav-link" to="/"><i className="fa fa-house"></i></NavLink></li>
                    <li><NavLink className="nav-link" to="/wallet"><i className="fa-solid fa-wallet"></i></NavLink></li>
                    <li className="coins"><NavLink className="nav-link" to="/mining"><i className="fa-solid fa-coins"></i></NavLink></li>
                    <li><NavLink className="nav-link" to="/contact"><i className="fa-solid fa-headset"></i></NavLink></li>
                    <li><NavLink className="nav-link" to="/more"><i className="fa-solid fa-user"></i></NavLink></li>
                </ul>
            </nav>
            </header>
 )}
        </>
    )
}

export default Navbar
