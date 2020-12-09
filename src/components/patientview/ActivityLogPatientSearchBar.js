import React from 'react';
import { InputBase} from '@material-ui/core';

//Searchbar for the activity log on the admin page
const ActivityLogPatientSearchBar = ({searchValue, setSearchValue}) => {

    //Handle search - for now it leads to nothing
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
            <div style={{ height: '70%', marginLeft: '10px', width: '90%' }}>
                <div style={{ float: 'left', height: '45px', width: '100%', backgroundColor: '#FFF', borderRadius: '25px 25px' }}>
                    <InputBase
                        inputComponent='input'
                        className='text-gray-800'
                        style={{
                            marginLeft: '10px',
                            height: '45px',
                            width: '100%'
                        }}
                        placeholder='Sök:'
                        id='patientViewAdminActivityField'
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={handleSearchChange}
                        value={searchValue}
                    />
                </div>
            </div>
    );
};
export default ActivityLogPatientSearchBar;
