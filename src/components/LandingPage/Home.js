import React from 'react';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <div className="intro-section">
                <h1>Welcome to SMART Application</h1>
                <p>Our leading platform helps you manage, track, and streamline consultant submissions to your top vendors.</p>
            </div>
            <div className="card-section">
                <div className="info-card">
                    <h2>Efficient Tracking</h2>
                    <p>With our built-in tracking system, oversee your consultant's progress and submissions seamlessly.</p>
                </div>
                <div className="info-card">
                    <h2>Vendor Management</h2>
                    <p>Manage all your vendor details, contacts, and preferences in one unified platform.</p>
                </div>
                <div className="info-card">
                    <h2>Analytics & Reporting</h2>
                    <p>Use our advanced analytics tools to gain insights, improve decision-making, and accelerate growth.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
