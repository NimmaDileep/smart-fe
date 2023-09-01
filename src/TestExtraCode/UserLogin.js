import React, { useState } from 'react';
import axios from 'axios';
import './UserLogin.css';

const UserLogin = ({ onLogin, onUserData }) => {
    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
        role: "User"
    });

    const [fieldErrors, setFieldErrors] = useState({}); // New state for field-specific errors
    const [success, setSuccess] = useState('');
    const [form, setForm] = useState('initial');
    const [userData, setUserData] = useState();

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({...user, [name]: value});
    };

    const handleLoginValidations = () => {
        let errors = {};

        if (user.username.trim().length < 8) {
            errors.username = "Username must be at least 8 characters long.";
        }

        if (user.password.trim().length < 8) {
            errors.password = "Password must be at least 8 characters long.";
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleRegisterValidations = () => {
        let errors = {};

        if (user.username.trim().length < 8) {
            errors.username = "Username must be at least 8 characters long.";
        }

        if (user.password.trim().length < 8) {
            errors.password = "Password must be at least 8 characters long.";
        }

        if (user.email.trim() === "" || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email.trim()))) {
            errors.email = "A valid email is required.";
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };


    const login = async () => {
        if (!handleLoginValidations()) return;
        const params = new URLSearchParams();
        params.append('username', user.username);
        params.append('password', user.password);
        params.append('grant_type', 'password');

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        try {
            const response = await axios.post('https://localhost:44316/token', params, config);
            const userRes = await axios.get(`https://localhost:44316/api/user/${user.username}`);
            setUserData(userRes.data);
            onLogin(response.data.access_token);
            onUserData(userRes.data);
        } catch (error) {
            console.log("Error")
        }
    };


    const register = async () => {
        if (!handleRegisterValidations()) return;

        const url = "https://localhost:44316/api/user";
        const data = {
            username: user.username,
            password: user.password,
            email: user.email,
            Roles: user.role
        };

        try {
            await axios.post(url, data);
            setSuccess("Registration successful. Proceed to login with your credentials.");
            setForm('initial');
            setUser({ username: "", password: "", email: "", role: "User"});
        } catch (error) {
            console.log("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="form-wrapper">
            <text><h1>Welcome!</h1></text>
            {form === 'initial' && success && <div className="success-message">{success}</div>}
            {form === 'initial' ? (
                <div className="button-container">
                    <button type="button" onClick={() => { setSuccess(''); setForm('login'); }}>Login</button>
                    <button type="button" onClick={() => { setSuccess(''); setForm('register'); }}>Register</button>
                </div>
            ) : (
                <>
                    <h2>{form.charAt(0).toUpperCase() + form.slice(1)}</h2>
                    {success && <div className="success-message">{success}</div>}
                    <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username"/>
                    {fieldErrors.username && <div className="error-message">{fieldErrors.username}</div>}
                    <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password"/>
                    {fieldErrors.password && <div className="error-message">{fieldErrors.password}</div>}
                    {form === 'register' && <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email"/>}
                    {fieldErrors.email && <div className="error-message">{fieldErrors.email}</div>}
                    <div className="button-container">
                        <button type="button" onClick={form === 'login' ? login : register}>{form.charAt(0).toUpperCase() + form.slice(1)}</button>
                        <button type="button" onClick={() => setForm('initial')}>Cancel</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserLogin;
