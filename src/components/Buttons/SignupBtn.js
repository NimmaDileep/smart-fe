import { Button } from 'react-bootstrap';
import React from "react";
import './button.css';

function SignUpBtn() {
    return (
        <Button className="btn btn-primary signup-btn" size="lg" type="submit" active> Sign Up </Button>
    );
}


export default SignUpBtn;
