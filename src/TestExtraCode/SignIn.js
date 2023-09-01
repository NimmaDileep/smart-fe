import React, { useState } from 'react';
import './SignIn.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../AuthContext";
import {FidgetSpinner} from 'react-loader-spinner';

function SignIn() {
    const [userName, setUsername] = useState(''); // Added this line
    const [email, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');
    const [userData, setUserData] = useState();
    const navigate = useNavigate();
    const { setAuthToken, setAuthRole } = React.useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    // const handleEmailChange = (e) => {
    //     setEmail(e.target.value);
    // };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const validateEmail = (email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleSignIn = async () => {
        // if (!validateEmail(email)) {
        //     alert("Invalid email address.");
        //     return;
        // }

        if (!validatePassword(userPassword)) {
            alert("Password should be at least 6 characters long.");
            return;
        }

        const params = new URLSearchParams();
        params.append('username', userName);
        params.append('password', userPassword);
        params.append('grant_type', 'password');

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        try {
            setIsLoading(true);
            const response = await axios.post('https://localhost:44316/token', params, config);
            const userRes = await axios.get(`https://localhost:44316/api/user/${userName}`);
            localStorage.setItem('accessToken', response.data.access_token);
            localStorage.setItem('userRole', userRes.data.Roles);
            localStorage.setItem('userData', JSON.stringify(userRes.data));

            setUserData(userRes.data);
            console.log('Access Token',response.data);
            console.log('User Data',userRes.data);
            setAuthToken(response.data.access_token);
            setAuthRole(userRes.data.Roles)
            setIsLoading(false);
            navigate('/dashboard');
        } catch (error) {
            setIsLoading(false);
            console.log("Error")
        }

    };

    return (
        <>
            {isLoading ? (
                <div className="loader-container">
                    <FidgetSpinner
                        height="100"
                        width="100"
                        color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="Loading..."
                        outerCircleColor=""
                        innerCircleColor=""
                        middleCircleColor=""
                    />
                </div>
            ) : (
                <div className="login-card">
                    <img src="https://i.pinimg.com/originals/0a/5f/ea/0a5feae400fc816c4ca2aca8bd67a168.jpg" alt="Profile" />
                    <h2>Sign In</h2>
                    <form className="login-form">
                        <div className="username-section">
                            <input
                                autoComplete="off"
                                spellCheck="false"
                                className="control"
                                type="text"
                                placeholder="Username"
                                value={userName}
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <input
                            spellCheck="false"
                            className="control"
                            type="password"
                            placeholder="Password"
                            value={userPassword}
                            onChange={handlePasswordChange}
                        />
                        <button className="control" type="button" onClick={handleSignIn}>
                            SIGN IN
                        </button>
                    </form>
                </div>
            )}
        </>
    );

}

export default SignIn;
