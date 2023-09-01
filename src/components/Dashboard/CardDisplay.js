import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import AuthContext from "../AuthContext";
import {FidgetSpinner} from 'react-loader-spinner';
import "./CardDisplay.css";

const CardDisplay = () => {
    const { authToken } = React.useContext(AuthContext);
    const [data, setData] = useState([]);
    const initialToken = localStorage.getItem('accessToken');
    const [token, setToken] = useState(initialToken);
    const [isLoading, setIsLoading] = useState(true);

    const imageUrls = [
        "https://api.dicebear.com/6.x/adventurer/svg?seed=Midnight",
        "https://api.dicebear.com/6.x/adventurer/svg?seed=Bandit",
        "https://api.dicebear.com/6.x/adventurer/svg?seed=Milo",
        "https://api.dicebear.com/6.x/adventurer/svg?seed=Garfield",
        "https://api.dicebear.com/6.x/adventurer/svg?seed=Sam",
        "https://api.dicebear.com/6.x/adventurer/svg?seed=Willow",
        "https://api.dicebear.com/6.x/avataaars/svg?seed=Garfield",
        "https://api.dicebear.com/6.x/avataaars/svg?seed=Bella",
    ];

    useEffect(() => {
        if (token) {
            const fetchData = async () => {
                try {
                    setIsLoading(true);
                    const result = await axios.get('https://localhost:44316/api/Employee', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setData(result.data);
                } catch (error) {
                    console.error('Error during fetchData:', error);
                }
                setIsLoading(false);
            }
            fetchData();
        }
    }, [token]);

    return (
        <div className={`${isLoading ? 'disabledContainer' : ''}`}>
            {isLoading ? (
                    <FidgetSpinner height="100" width="100" color="#4fa94d" />
            ) : (
                <div className="card-container">
                    <Container>
                        <Row>
                            {
                                data.map((item, index) => (
                                    <Col key={index} md={3}>
                                        <Card className="mb-4">
                                            <Card.Img variant="top" src={imageUrls[Math.floor(Math.random() * imageUrls.length)]} />
                                            <Card.Body>
                                                <Card.Title>{item.Name}</Card.Title>
                                                <Card.Text>Age: {item.Age}</Card.Text>
                                                <Card.Text>Country: {item.Country}</Card.Text>
                                                <Card.Text>Position: {item.Position}</Card.Text>
                                                <Card.Text>Wage: {item.Wage}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Container>
                </div>
            )}
        </div>
    )
}

export default CardDisplay;

