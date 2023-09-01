import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './HeaderStyles.css';
import AuthContext from "../AuthContext";
import logo from './conquer-tech.png';

const Header = ({ setWasLoggedIn, setLogoutClicked }) => {
    const { setAuthToken, authToken, setAuthRole, authRole } = React.useContext(AuthContext);
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        setAuthToken(null);
        setAuthRole(null);
        localStorage.clear();
        setWasLoggedIn(false);
        setLogoutClicked(true);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <header className="header">
            <img src={logo} alt="Company Logo" className="header-logo" />
            <button className="hamburger" onClick={toggleMenu}>☰</button>
            <nav className={`nav-container ${menuOpen ? 'open' : ''}`}>
                {authToken ? (
                    <>
                        {authRole === "Admin" && (
                            <Link className={`styled-link ${location.pathname === "/employees" ? 'active' : ''}`} to="/employees">Show Consultants</Link>
                        )}
                        {/*{authRole === "Admin" && (*/}
                        {/*    <Link className={`styled-link ${location.pathname === "/dashboard" ? 'active' : ''}`} to="/dashboard">Dashboard</Link>*/}
                        {/*)}*/}
                        {authRole === "User" && (
                            <Link className={`styled-link ${location.pathname === "/consultant" ? 'active' : ''}`} to="/consultant">Consultant Dashboard</Link>
                        )}
                        {authRole && (
                            <Link className={`styled-link ${location.pathname === "/submissionForm" ? 'active' : ''}`} to="/submissionForm">New Submission</Link>
                        )}
                        <Link className={`styled-link ${location.pathname === "/profile" ? 'active' : ''}`} to="/profile">
                            <FontAwesomeIcon icon={faUser} color="#000000" size="lg" />{' '}
                            Profile
                        </Link>
                        <Link className={`styled-link ${location.pathname === "/logout" ? 'active' : ''}`} to="/logout" onClick={handleLogout}>Logout</Link>
                    </>

                ) : (
                    <>
                        <Link className={`styled-link ${location.pathname === "/home" ? 'active' : ''}`} to="/home">Home</Link>
                        <Link className={`styled-link ${location.pathname === "/signin" ? 'active' : ''}`} to="/signin">SignIn</Link>
                        <Link className={`styled-link ${location.pathname === "/signup" ? 'active' : ''}`} to="/signup">SignUp</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;
