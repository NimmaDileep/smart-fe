import React, {useState} from 'react';
import GenericForm from '../Forms/GenericForm';
import './SignUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const SignUp = () => {
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [error, setError] = useState(false);

    const fields = [
        {
            type: 'text',
            name: 'username',
            label: 'Username',
            required: true,
            placeholder: 'Enter your username'
        },
        {
            type: 'email',
            name: 'email',
            label: 'Email',
            required: true,
            placeholder: 'Enter your email'
        },
        {
            type: 'password',
            name: 'password',
            label: 'Password',
            required: true,
            placeholder: 'Enter your password'
        },
        {
            type: 'password',
            name: 'confirmPassword',
            label: 'Confirm Password',
            required: true,
            placeholder: 'Re-enter your password'
        },
    ];

    const handleSignUp = async (event) => {
        event.preventDefault();

        const { username, email, password, confirmPassword } = event.target.elements;

        if (password.value !== confirmPassword.value) {
            console.log('Passwords do not match!');
            setError(true)
            alert("Passwords do not match!")
            return;
        }
        else{
            setError(false)
        }

        const url = "https://localhost:44316/api/user";
        const data = {
            username: username.value,
            password: password.value,
            email: email.value,
            Roles: "User"
        };

        try {
            await axios.post(url, data);
            setShowSuccessModal(true);
        } catch (error) {
            console.log("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="signup-container">
            <GenericForm
                title="SIGN UP"
                fields={fields}
                onSubmit={handleSignUp}
            />
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
};

export default SignUp;
