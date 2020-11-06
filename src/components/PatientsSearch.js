import React, { useState } from 'react';

import { InputBase, Button } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';

import { FilterModal } from '../components'

// Component rendering a dropdown menu
const DropdownContent = ({ sortByList, setSortState, setDropdownOpen, dropdownOpen }) => {

    // If any of the alternatives are pressed, we keep track of this and close the dropdown menu.
    const handleClick = (id) => {
        setSortState({columnId: id});
        setDropdownOpen(!dropdownOpen);
    }

    return (
        <div 
            style={{width: '175px'}} 
            className='bg-white z-10 text-center grey-400 w-inherit absolute right-0 p-2 shadow-lg rounded-lg mt-2'
        >
        
        {sortByList.map((item, i) => {
            return (
            <div className='mt-1' key={i}>
               <Button onClick={() => handleClick(item.id)}>
                   {item.sortBy}
               </Button>
            </div>
            );
        })}
        </div>
    );
};

// Component rendering blue div, with a searchfield and filtering + sorting buttons.
const PatientsSearch = ({setSortState,
                        searchValue,
                        setSearchValue,
                        setOwnFilters,
                        }) => {

    // State keeping track of wheter the sort menu has been toggled or not
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Specifying what we can sort by
    const sortByList = [
        {
        sortBy: 'Prioritering',
        id: 'priority',
        },
        {
        sortBy: 'Namn',
        id: 'name',
        },
        {
        sortBy: 'Personnummer',
        id: 'sweID',
        },
        {
        sortBy: 'Diagnos',
        id: 'diagnoses',
        },
        {
        sortBy: 'Senast uppdaterad',
        id: 'updatedAt',
        },
        {
        sortBy: 'Uppdaterad av',
        id: 'updatedBy',
        },
    ];

    // Handling dynamic search based on what is entered into the search field 
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
    <>
        <div style={{ height: 'auto', marginLeft: 'auto', marginRight: 'auto', width: '95%' }}>
            <div style={{ height: '45px', width: 'inherit', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#FFF', borderRadius: '25px 25px' }}>
                <InputBase
                    inputComponent='input'               
                    className='text-gray-800'
                    style={{ 
                        marginLeft: '10px',
                        height: '45px',
                        width: '100%'
                    }}
                    placeholder='Sök:'
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleSearchChange}
                    value={searchValue} 
                />
            </div>

            <div style={{ height: 'auto', paddingTop: '12px', paddingBottom: '2px', marginLeft: 'auto', textAlign: 'end' }}>
                <FilterModal setDropdownOpen={setDropdownOpen} setOwnFilters={setOwnFilters}/> 
                <Button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className='shadow' 
                    style={{ borderRadius: '0', backgroundColor: '#FFF' }}
                >
                    Sortera efter
                    <ArrowDropDown style={{ marginLeft: '20px', fontSize: '16px' }} />
                </Button>
                {dropdownOpen && (
                    <div className='relative'>
                        <DropdownContent sortByList={sortByList} setSortState={setSortState} setDropdownOpen={setDropdownOpen} dropdownOpen={dropdownOpen} />
                    </div>
                )}
            </div>
        </div>
        
    </>
    );
};

export default PatientsSearch;

