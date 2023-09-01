// import React, { useState } from 'react';
// import { Form, Button, Row, Col } from 'react-bootstrap';
// import './SignInModal.css';
//
// function SignInModal() {
//     const [showForm, setShowForm] = useState(false);
//
//     return (
//         <div className="signin-container">
//             {showForm ? (
//                 <div className="signin-page">
//                     <h2>Sign In</h2>
//                     <Form>
//                         <div className="input-username-row">
//                             <Form.Group controlId="username" as={Row}>
//                                 <Form.Label column sm="4">Username</Form.Label>
//                                 <Col sm="5">
//                                     <Form.Control type="text" placeholder="Enter username" />
//                                 </Col>
//                             </Form.Group>
//                         </div>
//                         <div className="input-password-row">
//                             <Form.Group controlId="password" as={Row}>
//                                 <Form.Label column sm="4">Password</Form.Label>
//                                 <Col sm="5">
//                                     <Form.Control type="password" placeholder="Password" />
//                                 </Col>
//                             </Form.Group>
//                         </div>
//                         <Button className="btn btn-primary" type="submit">
//                             Sign In
//                         </Button>
//                     </Form>
//                 </div>
//             ) : (
//                 <Button onClick={() => setShowForm(true)}>Sign In</Button>
//             )}
//         </div>
//     );
// }
//
// export default SignInModal;

// import React, { useState } from 'react';
// import { Form, Button, Row, Col, Container } from 'react-bootstrap';
// import './SignInModal.css';
//
// function SignInModal() {
//     const [showForm, setShowForm] = useState(false);
//
//     return (
//         <div className="signin-container">
//             {showForm ? (
//                 <Container className="signin-page">
//                     <h2>Sign In</h2>
//                     <Form>
//                         <Row className="input-username-row">
//                             <Form.Label column xs="12" sm="4">Username</Form.Label>
//                             <Col xs="12" sm="8">
//                                 <Form.Control type="text" placeholder="Enter username" />
//                             </Col>
//                         </Row>
//                         <Row className="input-password-row">
//                             <Form.Label column xs="12" sm="4">Password</Form.Label>
//                             <Col xs="12" sm="8">
//                                 <Form.Control type="password" placeholder="Password" />
//                             </Col>
//                         </Row>
//                         <Row className="justify-content-center">
//                             <Button className="btn btn-primary" type="submit">
//                                 Sign In
//                             </Button>
//                         </Row>
//                     </Form>
//                 </Container>
//             ) : (
//                 <Button onClick={() => setShowForm(true)}>Sign In</Button>
//             )}
//         </div>
//     );
// }
//
// export default SignInModal;


