import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import {toast} from "react-toastify";

const AddUserModal = ({ token, afterSubmit }) => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [country, setCountry] = useState('');
    const [position, setPosition] = useState('');
    const [wage, setWage] = useState('');

    const [nameError, setNameError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [countryError, setCountryError] = useState('');
    const [positionError, setPositionError] = useState('');
    const [wageError, setWageError] = useState('');

    const handleSubmit = () => {
        let valid = true;

        if (!name) {
            valid = false;
            setNameError('Required');
        } else {
            setNameError('');
        }

        if (!age) {
            valid = false;
            setAgeError('Required');
        } else {
            setAgeError('');
        }

        if (!country) {
            valid = false;
            setCountryError('Required');
        } else {
            setCountryError('');
        }

        if (!position) {
            valid = false;
            setPositionError('Required');
        } else {
            setPositionError('');
        }

        if (!wage) {
            valid = false;
            setWageError('Required');
        } else {
            setWageError('');
        }

        if (valid) {
            const url = "https://localhost:44316/api/Employee"
            const data = {
                "name": name,
                "age": age,
                "country": country,
                "position": position,
                "wage": wage
            }

            axios.post(url, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((result) => {
                    afterSubmit();
                    toast.success('Employee added successfully :)');
                    setName('');
                    setAge('');
                    setCountry('');
                    setPosition('');
                    setWage('');

                    setShow(false);
                })
        }
    };

    return (
        <>
            <Button variant="primary" onClick={() => setShow(true)}>Add New User</Button>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Name<span className="text-danger">*</span></label>
                    <input type="text" className='form-control mb-1' placeholder="Enter Name" value={name}
                           onChange={(e) => setName(e.target.value)}/>
                    {nameError && <div className="text-danger mb-2">{nameError}</div>}

                    <label>Age<span className="text-danger">*</span></label>
                    <input type="number" className='form-control mb-1' placeholder="Enter Age" value={age}
                           onChange={(e) => setAge(e.target.value)}/>
                    {ageError && <div className="text-danger mb-2">{ageError}</div>}

                    <label>Country<span className="text-danger">*</span></label>
                    <input type="text" className='form-control mb-1' placeholder="Enter Country" value={country}
                           onChange={(e) => setCountry(e.target.value)}/>
                    {countryError && <div className="text-danger mb-2">{countryError}</div>}

                    <label>Position<span className="text-danger">*</span></label>
                    <input type="text" className='form-control mb-1' placeholder="Enter Position" value={position}
                           onChange={(e) => setPosition(e.target.value)}/>
                    {positionError && <div className="text-danger mb-2">{positionError}</div>}

                    <label>Wage<span className="text-danger">*</span></label>
                    <input type="number" className='form-control mb-1' placeholder="Enter Wage" value={wage}
                           onChange={(e) => setWage(e.target.value)}/>
                    {wageError && <div className="text-danger mb-2">{wageError}</div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddUserModal;
