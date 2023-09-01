import React, { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Chart } from 'chart.js';
import './ConsultantDashboard.css';
import { GlobalContext } from "../../States/GlobalState";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "../../AuthContext";
import EditSubmissionModal from "./EditSubmissionModal";
import 'font-awesome/css/font-awesome.min.css';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ConsultantDashboard = () => {
    const { submissions, updateSubmission, deleteSubmission } = useContext(GlobalContext);
    const { authToken } = React.useContext(AuthContext);
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSubmission, setCurrentSubmission] = useState(null);

    useEffect(() => {
        if (submissions.length === 0) {
            navigate('/employees');
        }
        const currentDate = new Date();
        const currentMonthIndex = currentDate.getMonth();
        const lastSixMonths = Array.from({ length: 6 }, (_, index) => {
            const month = new Date(currentDate.setMonth(currentMonthIndex - 5 + index));
            return month.toLocaleString('default', { month: 'long' });
        });

        const countStatusesForMonth = (month, index) => {
            const startDate = new Date();
            startDate.setMonth(currentMonthIndex - 5 + index, 1);
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date(startDate);
            endDate.setMonth(endDate.getMonth() + 1, 0);
            endDate.setHours(23, 59, 59, 999);

            return submissions.reduce((acc, submission) => {
                const submissionDate = new Date(submission.Date);
                if (submissionDate >= startDate && submissionDate <= endDate) {
                    acc[submission.Status.toLowerCase()] = (acc[submission.Status.toLowerCase()] || 0) + 1;
                }
                return acc;
            }, {});
        };

        const statusCounts = lastSixMonths.map((month, index) => countStatusesForMonth(month, index));

        const chartData = {
            labels: lastSixMonths,
            datasets: [
                {
                    label: 'Submitted',
                    data: statusCounts.map(count => count.submitted || 0),
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1
                },
                {
                    label: 'Vendor Calls',
                    data: statusCounts.map(count => count["vendor calls"] || 0),
                    backgroundColor: 'rgba(255,99,132,0.4)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1
                },
                {
                    label: 'Interviewed',
                    data: statusCounts.map(count => count.interviewed || 0),
                    backgroundColor: 'rgba(255,206,86,0.4)',
                    borderColor: 'rgba(255,206,86,1)',
                    borderWidth: 1
                },
                {
                    label: 'Rejected',
                    data: statusCounts.map(count => count.rejected || 0),
                    backgroundColor: 'rgba(255,159,64,0.4)',
                    borderColor: 'rgba(255,159,64,1)',
                    borderWidth: 1
                },
                {
                    label: 'Pending',
                    data: statusCounts.map(count => count.pending || 0),
                    backgroundColor: 'rgba(153,102,255,0.4)',
                    borderColor: 'rgba(153,102,255,1)',
                    borderWidth: 1
                }
            ]
        };

        setData(chartData);
    }, [submissions]);

    const filteredSubmissions = submissions.filter(submission => {
        return Object.keys(submission).some(key =>
            String(submission[key]).toLowerCase().includes(search.toLowerCase())
        );
    });

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = filteredSubmissions.slice(firstItemIndex, lastItemIndex);

    const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);

    const handlePageChange = (event) => {
        const { name } = event.target;
        if (name === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else if (name === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleEdit = (submission) => {
        const date = new Date(submission.Date);
        const formattedDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
        setCurrentSubmission({...submission, Date: formattedDate});
        setIsModalOpen(true);
    };


    const handleUpdate = async () => {
        try {
            const response = await axios.put(`https://localhost:44316/api/submission/${currentSubmission.Id}`, currentSubmission, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            toast.success('Submission successfully updated');
            updateSubmission(response.data);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error during submission update:', error);
            toast.error('Error during submission update');
        }
    };


    const handleDelete = async (submissionId) => {
        try {
            await axios.delete(`https://localhost:44316/api/submission/${submissionId}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            toast.success('Submission successfully deleted');
            deleteSubmission(submissionId);
        } catch (error) {
            console.error('Error during submission deletion:', error);
            toast.error('Error during submission deletion');
        }
    };


    const options = {
        scales: {
            x: {
                ticks: {
                    color: 'red'
                }
            },
            y: {
                ticks: {
                    color: 'blue'
                }
            }
        }
    };

    return (
        <div className="consultant-dashboard">
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="chart-container">
                <h2>Submissions for Past 6 Months</h2><br/><br/>
                {data ? <Bar data={data} options={options} /> : <p>Loading...</p>}
            </div>
            <div className="table-container">
                <h3>Submission details</h3>
                <div className="consultant-dashboard-search">
                    <input className="form-control" type="text" placeholder="Search submissions" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Role</th>
                        <th>Client</th>
                        <th>Vendor Company</th>
                        <th>Vendor Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.map((submission, index) => (
                        <tr key={index}>
                            <td>{new Date(submission.Date).toLocaleDateString()}</td>
                            <td>{submission.Role}</td>
                            <td>{submission.Client}</td>
                            <td>{submission.VendorCompany}</td>
                            <td>{submission.VendorName}</td>
                            <td>{submission.Status}</td>
                            <td>
                                <div className="flex">
                                    <div>
                                        <button title="Edit" onClick={() =>  handleEdit(submission)} style={{backgroundColor: "orange"}}><i className="fa fa-edit"></i></button>
                                    </div>
                                    <br/>
                                    <div className="m-lg-2">
                                        <button title="Delete" onClick={() => handleDelete(submission.Id)} style={{backgroundColor: "red"}}><i className="fa fa-trash"></i></button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table><br/>
                <div className="pagination flex align-content-center">
                    <button name="prev" onClick={handlePageChange} disabled={currentPage === 1}>Prev</button>
                    <span>{currentPage} / {totalPages}</span>
                    <button name="next" onClick={handlePageChange} disabled={currentPage === totalPages}>Next</button>
                </div>
                <EditSubmissionModal
                    show={isModalOpen}
                    handleClose={handleClose}
                    editDate={currentSubmission?.Date}
                    setEditDate={(date) => setCurrentSubmission(prev => ({...prev, Date: date}))}
                    editRole={currentSubmission?.Role}
                    setEditRole={(role) => setCurrentSubmission(prev => ({...prev, Role: role}))}
                    editClient={currentSubmission?.Client}
                    setEditClient={(client) => setCurrentSubmission(prev => ({...prev, Client: client}))}
                    editVendor={currentSubmission?.VendorCompany}
                    setEditVendor={(vendor) => setCurrentSubmission(prev => ({...prev, VendorCompany: vendor}))}
                    editVendorName={currentSubmission?.VendorName}
                    setEditVendorName={(vendorName) => setCurrentSubmission(prev => ({...prev, VendorName: vendorName}))}
                    editStatus={currentSubmission?.Status}
                    setEditStatus={(status) => setCurrentSubmission(prev => ({...prev, Status: status}))}
                    handleUpdate={handleUpdate}
                />
            </div>
        </div>
    );
}

export default ConsultantDashboard;

