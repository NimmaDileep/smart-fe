import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EditUserModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className="btn btn-primary" onClick={handleShow}> Edit User </Button>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} dialogClassName="modal-dialog-scrollable">
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Name<span className="text-danger">*</span></label>
                    <input type="text" className='form-control mb-3' placeholder="Enter Name"/>

                    <label>Age<span className="text-danger">*</span></label>
                    <input type="number" className='form-control mb-3' placeholder="Enter Age"/>

                    <label>Gender<span className="text-danger">*</span></label>
                    <div className="mb-3 row">
                        <div className="col-md-3"></div>
                        <div className="form-check col md-2">
                            <input type="radio" className='form-check-input' name="gender" id="male" value="male"/>
                            <label className="form-check-label" htmlFor="male"> Male </label>
                        </div>
                        <div className="form-check col md-2">
                            <input type="radio" className='form-check-input' name="gender" id="female" value="female"/>
                            <label className="form-check-label" htmlFor="female"> Female </label>
                        </div>
                        <div className="col-md-3"></div>
                    </div>

                    <label>Email<span className="text-danger">*</span></label>
                    <input type="text" className='form-control mb-3' placeholder="Enter Email"/>

                    <label>Phone<span className="text-danger">*</span></label>
                    <input type="tel" className='form-control mb-3' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"  placeholder="Enter Phone"/>

                    <label>Position<span className="text-danger">*</span></label>
                    <input type="text" className='form-control mb-3' placeholder="Enter Position"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-secondary" onClick={handleClose}> Close </Button>
                    {/*<Button variant="primary" onClick = {handleUpdate}>Confirm</Button>*/}
                    <Button className="btn btn-primary">Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditUserModal;