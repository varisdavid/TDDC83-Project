import React, { useState } from "react";

import { InputBase } from '@material-ui/core';

const PatientsSearch = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
      };

    return (
    <>
        <InputBase
            className="text-gray-800 w-4/5"
            placeholder="Sök patient"
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleSearchChange}
            value={searchTerm}
        />
        
    </>
    );
};

export default PatientsSearch;

