import React, { useState, useEffect } from 'react';
import './SignUp.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';


function SignUp() {
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [strengthText, setStrengthText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [role, setRole] = useState('');
    const [showRecruiterDropdown, setShowRecruiterDropdown] = useState(false);
    const [recruiters, setRecruiters] = useState([]);
    const [selectedRecruiter, setSelectedRecruiter] = useState('');

    useEffect(() => {
        // Fetch your recruiters here or hard-code it for now
        const fetchedRecruiters = ["John Doe", "Jane Smith", "Robert Brown"];
        setRecruiters(fetchedRecruiters);
    }, []);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const validateEmail = (email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    const validateUsername = (username) => {
        return username && username.trim().length > 0;
    };

    const validatePassword = (password) => {
        return password && password.trim().length >= 6;
    };

    const validateReEnterPassword = (reEnterPassword) => {
        return reEnterPassword && reEnterPassword.trim().length >= 6;
    };


    const handlePasswordChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        if (name === "password") {
            setPassword(value);
            const currentStrength = getStrength(value);
            setStrengthText(currentStrength);
        } else if (name === "reEnterPassword") {
            setReEnterPassword(value);
        }

        if (name === "reEnterPassword" && password === value) {
            setErrorMessage('');
        }
    };

    const handleFullNameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
        if (e.target.value === "Consultant") {
            setShowRecruiterDropdown(true);
        } else {
            setShowRecruiterDropdown(false);
            setSelectedRecruiter(''); // Reset selected recruiter if role is not consultant
        }
    };

    const handleSignUp = async() => {
        let assignedRole;

        if (role === "Consultant") {
            assignedRole = "User";
        } else if (role === "Recruiter") {
            assignedRole = "Admin";
        }

        setErrorMessage(''); // Reset the error message before validating

        if (!validateUsername(username)) {
            setErrorMessage("Username is required!");
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage("Invalid email address!");
            return;
        }

        if (!validatePassword(password)) {
            setErrorMessage("Password should be at least 6 characters long!");
            return;
        }

        if (!validateReEnterPassword(reEnterPassword)) {
            setErrorMessage("Please re-enter your password!");
            return;
        }

        if (password !== reEnterPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        const url = "https://localhost:44316/api/user";
        const data = {
            username: username,
            password: password,
            email: email,
            Roles: assignedRole
        };

        try {
            await axios.post(url, data);
            setUsername("")
            setEmail("")
            setPassword("")
            setReEnterPassword("")
            setShowSuccessModal(true);
            // navigate('/signin')
            // setSuccess("Registration successful. Proceed to login with your credentials.");
            // setForm('initial');
            // setUser({ username: "", password: "", email: "", role: "User"});
        } catch (error) {
            console.log("Something went wrong. Please try again.");
        }
    };

    const getStrength = (password) => {
        let strengthValue = {
            upper: false,
            numbers: false,
            lower: false,
        };

        return getIndicator(password, strengthValue);
    };

    const getIndicator = (password, strengthValue) => {
        for (let index = 0; index < password.length; index++) {
            let char = password.charCodeAt(index);
            if (!strengthValue.upper && char >= 65 && char <= 90) {
                strengthValue.upper = true;
            } else if (!strengthValue.numbers && char >= 48 && char <= 57) {
                strengthValue.numbers = true;
            } else if (!strengthValue.lower && char >= 97 && char <= 122) {
                strengthValue.lower = true;
            }
        }

        let strengthIndicator = 0;

        for (let metric in strengthValue) {
            if (strengthValue[metric] === true) {
                strengthIndicator++;
            }
        }

        const strength = {
            1: "weak",
            2: "medium",
            3: "strong",
        };

        return strength[strengthIndicator] ?? "";
    };

    return (
        <div className="login-card">
            <img src="https://i.pinimg.com/originals/0a/5f/ea/0a5feae400fc816c4ca2aca8bd67a168.jpg" alt="Profile" />
            <h2>Sign Up</h2>
            <h3>Enter your credentials</h3>
            <form className="login-form">
                <div className="username">
                    <input
                        autoComplete="off"
                        spellCheck="false"
                        className="control"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={handleFullNameChange}
                    />
                    <div id="spinner" className="spinner"></div>
                </div>
                <input
                    autoComplete="off"
                    spellCheck="false"
                    className="control"
                    type="email"
                    placeholder="Email"
                    defaultValue=""
                    value={email}
                    onChange={handleEmailChange}
                />
                <select
                    value={role}
                    onChange={handleRoleChange}
                    className="control"
                >
                    <option value="" disabled>Select Role</option>
                    <option value="Consultant">Consultant</option>
                    <option value="Recruiter">Recruiter</option>
                </select>

                {showRecruiterDropdown && (
                    <select
                        value={selectedRecruiter}
                        onChange={(e) => setSelectedRecruiter(e.target.value)}
                        className="control"
                    >
                        <option value="" disabled>Select your recruiter</option>
                        {recruiters.map(recruiter => (
                            <option key={recruiter} value={recruiter}>
                                {recruiter}
                            </option>
                        ))}
                    </select>
                )}

                <input
                    spellCheck="false"
                    className="control"
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <input
                    spellCheck="false"
                    className="control"
                    name="reEnterPassword"
                    id="reEnterPassword"
                    type="password"
                    placeholder="Re-enter Password"
                    value={reEnterPassword}
                    onChange={handlePasswordChange}
                />
                <div id="bars" className={strengthText}>
                    <div></div>
                </div>
                <div className="strength" id="strength">
                    {strengthText ? `${strengthText} Password` : ''}
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <button className="control" type="button" onClick={handleSignUp}>JOIN NOW</button>
            </form>
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body><p>Signup successful!</p></Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        setShowSuccessModal(false);
                        navigate('/signin');
                    }}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default SignUp;
