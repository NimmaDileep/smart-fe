import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import GenericForm from '../Forms/GenericForm';
import { FidgetSpinner } from 'react-loader-spinner';
import './SignIn.css';

const SignIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setAuthToken, setAuthRole } = useContext(AuthContext);

    const fields = [
        {
            type: 'text',
            name: 'username',
            label: 'Username',
            required: true,
            placeholder: 'Enter your username'
        },
        {
            type: 'password',
            name: 'password',
            label: 'Password',
            required: true,
            placeholder: 'Enter your password'
        }
    ];

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleSignIn = async (event) => {
        event.preventDefault();
        const { username, password } = event.target.elements;

        if (!validatePassword(password.value)) {
            alert('Password should be at least 6 characters long.');
            return;
        }

        const params = new URLSearchParams();
        params.append('username', username.value);
        params.append('password', password.value);
        params.append('grant_type', 'password');

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        try {
            setIsLoading(true);
            const response = await axios.post('https://localhost:44316/token', params, config);
            const userRes = await axios.get(`https://localhost:44316/api/user/${username.value}`);
            localStorage.setItem('accessToken', response.data.access_token);
            localStorage.setItem('userRole', userRes.data.Roles);
            localStorage.setItem('userData', JSON.stringify(userRes.data));
            setAuthToken(response.data.access_token);
            setAuthRole(userRes.data.Roles);
            if(userRes.data.Roles == 'Admin'){
                navigate('/employees');
            }
            else{
                navigate('/consultant');
            }
        } catch (error) {
            alert('Failed to sign in. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`signin-container ${isLoading ? 'disabled-form' : ''}`}>
        {isLoading && (
                <div className="loader-container-signin">
                    <FidgetSpinner
                        height="100"
                        width="100"
                        color="#4fa94d"
                        visible={true}
                        ariaLabel="Loading..."
                    />
                </div>
            )}
            <GenericForm
                title="SIGN IN"
                fields={fields}
                onSubmit={handleSignIn}
            />
        </div>
    );
};

export default SignIn;
