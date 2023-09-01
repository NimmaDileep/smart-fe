import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EditUserModal = ({
                           show,
                           handleClose,
                           editName, setEditName,
                           editAge, setEditAge,
                           editCountry, setEditCountry,
                           editPosition, setEditPosition,
                           editWage, setEditWage,
                           handleUpdate,
                           role
                       }) => {
    const [errors, setErrors] = useState({
        name: "",
        age: "",
        country: "",
        position: "",
        wage: ""
    });

    const validateFields = () => {
        let newErrors = {
            name: "",
            age: "",
            country: "",
            position: "",
            wage: ""
        };
        let isValid = true;

        if (!editName.trim()) {
            newErrors.name = "Name is required!";
            isValid = false;
        }

        if (!editAge || editAge <= 0) {
            newErrors.age = "Valid age is required!";
            isValid = false;
        }

        if (!editCountry.trim()) {
            newErrors.country = "Country is required!";
            isValid = false;
        }

        if (!editPosition.trim()) {
            newErrors.position = "Position is required!";
            isValid = false;
        }

        if (!editWage || editWage <= 0) {
            newErrors.wage = "Valid wage is required!";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSaveChanges = () => {
        if (validateFields()) {
            handleUpdate();
        }
    };

    return (
        <Modal show={show && (role === 'Admin' || role === 'SuperUser')} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label>Name<span className="text-danger">*</span></label>
                <input type="text" className='form-control mb-3' placeholder="Enter Name" value={editName}
                       onChange={(e) => { setEditName(e.target.value); setErrors(prev => ({...prev, name: ''})); }} />
                {errors.name && <small className="text-danger">{errors.name}</small>}

                <label>Age<span className="text-danger">*</span></label>
                <input type="number" className='form-control mb-3' placeholder="Enter Age" value={editAge}
                       onChange={(e) => { setEditAge(e.target.value); setErrors(prev => ({...prev, age: ''})); }} />
                {errors.age && <small className="text-danger">{errors.age}</small>}

                <label>Country<span className="text-danger">*</span></label>
                <input type="text" className='form-control mb-3' placeholder="Enter Country" value={editCountry}
                       onChange={(e) => { setEditCountry(e.target.value); setErrors(prev => ({...prev, country: ''})); }} />
                {errors.country && <small className="text-danger">{errors.country}</small>}

                <label>Position<span className="text-danger">*</span></label>
                <input type="text" className='form-control mb-3' placeholder="Enter Position" value={editPosition}
                       onChange={(e) => { setEditPosition(e.target.value); setErrors(prev => ({...prev, position: ''})); }} />
                {errors.position && <small className="text-danger">{errors.position}</small>}

                <label>Wage<span className="text-danger">*</span></label>
                <input type="number" className='form-control mb-3' placeholder="Enter Wage" value={editWage}
                       onChange={(e) => { setEditWage(e.target.value); setErrors(prev => ({...prev, wage: ''})); }} />
                {errors.wage && <small className="text-danger">{errors.wage}</small>}
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <Button variant="secondary" onClick={handleClose} style={{ marginRight: '10px' }}>Close</Button>
                </div>
                {role === 'Admin' || role === 'SuperUser' ? (
                    <div>
                        <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
                    </div>
                ) : null}
            </Modal.Footer>
        </Modal>
    );
}

export default EditUserModal;
