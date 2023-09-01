import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from "axios";

const SearchBar = ({ token, afterSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        const url = "https://localhost:44316/api/EmployeeSearch";
        const data = {
            "name": searchTerm
        }

        axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((result) => {
                afterSearch(result.data);
                setSearchTerm('');
            })
    };

    return (
        <div className="search-bar flex justify-content-center align-items-center">
            <div className="flex input-wrapper align-items-center">
                <input
                    type="text"
                    className='form-control mb-3'
                    placeholder="Search by Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="primary" onClick={handleSearch}>
                    🔍
                </Button>
            </div>
        </div>
    );
};

export default SearchBar;
