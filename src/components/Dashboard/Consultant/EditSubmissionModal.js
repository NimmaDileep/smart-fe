import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EditSubmissionModal = ({
                                 show,
                                 handleClose,
                                 editDate, setEditDate,
                                 editRole, setEditRole,
                                 editClient, setEditClient,
                                 editVendor, setEditVendor,
                                 editVendorName, setEditVendorName,
                                 editStatus, setEditStatus,
                                 handleUpdate
                             }) => {
    const [errors, setErrors] = useState({
        date: "",
        role: "",
        client: "",
        vendor: "",
        vendorName: "",
        status: ""
    });

    const validateFields = () => {
        let newErrors = {
            date: "",
            role: "",
            client: "",
            vendor: "",
            vendorName: "",
            status: ""
        };
        let isValid = true;


        if (!editDate) {
            newErrors.date = "Date is required!";
            isValid = false;
        }

        if (!editRole.trim()) {
            newErrors.role = "Role is required!";
            isValid = false;
        }

        if (!editClient.trim()) {
            newErrors.client = "Client is required!";
            isValid = false;
        }

        if (!editVendor.trim()) {
            newErrors.vendor = "Vendor Company is required!";
            isValid = false;
        }

        if (!editVendorName.trim()) {
            newErrors.vendorName = "Vendor Name is required!";
            isValid = false;
        }

        if (!editStatus.trim()) {
            newErrors.status = "Status is required!";
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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Submission</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label>Date<span className="text-danger">*</span></label>
                <input type="date" className='form-control mb-3' value={editDate}
                       onChange={(e) => { setEditDate(e.target.value); setErrors(prev => ({...prev, date: ''})); }} />
                {errors.date && <small className="text-danger">{errors.date}</small>}

                <label>Role<span className="text-danger">*</span></label>
                <input type="text" className='form-control mb-3' placeholder="Enter Role" value={editRole}
                       onChange={(e) => { setEditRole(e.target.value); setErrors(prev => ({...prev, role: ''})); }} />
                {errors.role && <small className="text-danger">{errors.role}</small>}

                <label>Client<span className="text-danger">*</span></label>
                <input type="text" className='form-control mb-3' placeholder="Enter Client" value={editClient}
                       onChange={(e) => { setEditClient(e.target.value); setErrors(prev => ({...prev, client: ''})); }} />
                {errors.client && <small className="text-danger">{errors.client}</small>}

                <label>Vendor Company<span className="text-danger">*</span></label>
                <input type="text" className='form-control mb-3' placeholder="Enter Vendor Company" value={editVendor}
                       onChange={(e) => { setEditVendor(e.target.value); setErrors(prev => ({...prev, vendor: ''})); }} />
                {errors.vendor && <small className="text-danger">{errors.vendor}</small>}

                <label>Vendor Name<span className="text-danger">*</span></label>
                <input type="text" className='form-control mb-3' placeholder="Enter Vendor Name" value={editVendorName}
                       onChange={(e) => { setEditVendorName(e.target.value); setErrors(prev => ({...prev, vendorName: ''})); }} />
                {errors.vendorName && <small className="text-danger">{errors.vendorName}</small>}

                <label>Status<span className="text-danger">*</span></label>
                <select className='form-control mb-3' value={editStatus}
                        onChange={(e) => { setEditStatus(e.target.value); setErrors(prev => ({...prev, status: ''})); }}>
                    <option value="">Select status</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Interviewed">Interviewed</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Accepted">Accepted</option>
                </select>
                {errors.status && <small className="text-danger">{errors.status}</small>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} style={{ marginRight: '10px' }}>Close</Button>
                <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditSubmissionModal;
