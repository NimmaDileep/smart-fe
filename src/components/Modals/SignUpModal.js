import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './SignUpModal.css'; // Assuming you've created a corresponding CSS file

function SignUpModal() {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="signup-container">
            {showForm ? (
                <div className="signup-page">
                    <h2>Sign Up</h2>
                    <Form>
                        <div className="input-username-row">
                            <Form.Group controlId="username" as={Row}>
                                <Form.Label column sm="4">Username</Form.Label>
                                <Col sm="5">
                                    <Form.Control type="text" placeholder="Enter username" />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="input-email-row">
                            <Form.Group controlId="email" as={Row}>
                                <Form.Label column sm="4">Email</Form.Label>
                                <Col sm="5">
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="input-password-row">
                            <Form.Group controlId="password" as={Row}>
                                <Form.Label column sm="4">Password</Form.Label>
                                <Col sm="5">
                                    <Form.Control type="password" placeholder="Password" />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="input-confirm-password-row">
                            <Form.Group controlId="confirmPassword" as={Row}>
                                <Form.Label column sm="4">Confirm Password</Form.Label>
                                <Col sm="5">
                                    <Form.Control type="password" placeholder="Confirm Password" />
                                </Col>
                            </Form.Group>
                        </div>
                        <Button className="btn btn-primary" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </div>
            ) : (
                <Button onClick={() => setShowForm(true)}>Sign Up</Button>
            )}
        </div>
    );
}

export default SignUpModal;
