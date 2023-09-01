import React, { useState } from 'react';
import axios from 'axios';
import './Profile.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const initialToken = localStorage.getItem('accessToken');
    const initialUserData = JSON.parse(localStorage.getItem('userData')) || {};
    const [userData, setUserData] = useState(initialUserData);
    const [isEditing, setIsEditing] = useState(false);

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`https://localhost:44316/api/user/${initialUserData.UserName}`, userData, {
                headers: {
                    'Authorization': `Bearer ${initialToken}`
                }
            });
            localStorage.setItem('userData', JSON.stringify(userData));
            toast.success('Profile details successfully edited');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    console.log('------->', initialUserData);

    return (
        <div className="profile-container">
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <h2>Profile Details</h2>
            <form onSubmit={handleUpdate}>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={userData.UserName}
                        disabled={!isEditing}
                        onChange={e => setUserData(prev => ({ ...prev, UserName: e.target.value }))}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.Email}
                        disabled={!isEditing}
                        onChange={e => setUserData(prev => ({ ...prev, Email: e.target.value }))}
                    />
                </div>

                <div className="flex justify-content-center">
                    {!isEditing ? (
                        <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
                    ) : (
                        <div className="flex" style={{ justifyContent: 'space-between', width: '100%' }}>
                            <div>
                                <button type="submit">Update</button>
                            </div>
                            <div>
                                <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Profile;
