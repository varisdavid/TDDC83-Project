import React, { useState } from "react";

import { InputBase, Button } from '@material-ui/core';
import { Search } from '@material-ui/icons';

const PatientsSearch = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
      };

    return (
    <>
        <div className="flex justify-center">
            <div className="flex-row w-10/12 mt-2 p-2 shadow">
                <Search className="ml-4 mr-3 text-gray-800"/>
                <InputBase
                    className="text-gray-800 w-4/5"
                    placeholder="Sök patient"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleSearchChange}
                    value={searchTerm}
                />
                <Button className="ml-4" variant="contained" color="white" href="#contained-buttons">
                    Sök
                </Button>
            </div>
                  
        </div>

    </>
    );
};

export default PatientsSearch;

