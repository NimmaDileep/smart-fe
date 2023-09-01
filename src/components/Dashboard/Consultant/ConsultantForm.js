import React, { useState, useEffect} from 'react';
import axios from "axios";
import './ConsultantForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConsultantForm = () => {
    const [consultants, setConsultants] = useState([]);
    const [consultantNames, setConsultantNames] = useState([]);
    const initialToken = localStorage.getItem('accessToken');
    const [token, setToken] = useState(initialToken);
    const [isLoading, setIsLoading] = useState(true);
    const [hasLoadedFromLocalStorage, setHasLoadedFromLocalStorage] = useState(false);

    const initialFormData = localStorage.getItem('formData')
        ? JSON.parse(localStorage.getItem('formData'))
        : {
            name: "",
            date: "",
            role: "",
            client: "",
            vendor: "",
            vendorName: "",
            status: ""
        };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (token) {
            const fetchData = async () => {
                setIsLoading(true);
                try {
                    const result = await axios.get('https://localhost:44316/api/Employee', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setConsultantNames(result.data.map(item => item.Name));
                    setConsultants(result.data);
                } catch (error) {
                    console.error('Error during fetchData:', error);
                }
                setIsLoading(false);
            }
            fetchData();
        }
    }, [token]);

    useEffect(() => {
        if (hasLoadedFromLocalStorage) {
            localStorage.setItem('formData', JSON.stringify(formData));
        }
    }, [formData]);

    useEffect(() => {
        setHasLoadedFromLocalStorage(true);
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            const selectedConsultant = consultants.find(c => c.Name === value);
            if (selectedConsultant) {
                setFormData({
                    ...formData,
                    employeeId: selectedConsultant.Id,
                    name: selectedConsultant.Name,
                    role: selectedConsultant.Role || "",
                    client: selectedConsultant.Client || "",
                    vendor: selectedConsultant.Vendor || ""
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const clearForm = () => {
        setFormData({
            name: "",
            date: "",
            role: "",
            client: "",
            vendor: "",
            vendorName: "",
            status: ""
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const submissionData = {
            EmployeeId: formData.employeeId,
            Date: formData.date,
            Role: formData.role,
            Client: formData.client,
            VendorCompany: formData.vendor,
            VendorName: formData.vendorName,
            Status: formData.status
        };

        try {
            await axios.post(`https://localhost:44316/api/submission`, submissionData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('Submission successfully added');
            setHasLoadedFromLocalStorage(false);
            clearForm();
            localStorage.removeItem('formData');
        } catch (error) {
            console.error('Error during submission:', error);
        }
    }

        return (
        <div className="consultant-form-container">
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <h2>New Submission</h2>
            <form onSubmit={handleSubmit} >
                <div className="row-container">
                    <div className="input-group">
                        <label htmlFor="name">Name:</label>
                        <select
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select consultant name</option>
                            {consultantNames.map(name => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="row-container">
                    <div className="input-group">
                        <label htmlFor="role">Role:</label>
                        <input
                            type="text"
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            placeholder="Enter role"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="client">Client:</label>
                        <input
                            type="text"
                            id="client"
                            name="client"
                            value={formData.client}
                            onChange={handleChange}
                            placeholder="Enter client"
                            required
                        />
                    </div>
                </div>

                <div className="row-container">
                    <div className="input-group">
                        <label htmlFor="vendor">Vendor Company:</label>
                        <input
                            type="text"
                            id="vendor"
                            name="vendor"
                            value={formData.vendor}
                            onChange={handleChange}
                            placeholder="Enter vendor company"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="vendorName">Vendor Name:</label>
                        <input
                            type="text"
                            id="vendorName"
                            name="vendorName"
                            value={formData.vendorName}
                            onChange={handleChange}
                            placeholder="Enter vendor name"
                            required
                        />
                    </div>
                </div>

                <div className="input-group full-width">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select status</option>
                        <option value="Submitted">Submitted</option>
                        <option value="Interviewed">Interviewed</option>
                        <option value="Pending">Pending</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Accepted">Accepted</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ConsultantForm;
