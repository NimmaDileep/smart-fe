import { Button } from 'react-bootstrap';
import React from "react";
import './button.css';

function LogoutBtn() {
    return (
        <Button className="btn btn-primary logout-btn" size="lg" active> Log Out </Button>
    );
}


export default LogoutBtn;
