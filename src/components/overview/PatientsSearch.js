import React, { useState, useEffect } from 'react';

import { InputBase, Button, Link, ListItem } from '@material-ui/core';
import { SwapVert } from '@material-ui/icons';

import { FilterModal, PatientGroups } from '..'

import { ColumnFilter } from "./ColumnFilter"

// Component rendering applied filters and Rensa filter button
const AppliedFilterUI = ({ activeFiltersState, setIsFilterApplied }) => {

    // setFilter('gender', filterData.gender);
    // setFilter('priority', filterData.priority);
    // setFilter('team', filterData.team)
    // setFilter('department', filterData.department)
    // setFilter('age', [filterData.minAge, filterData.maxAge])
    // setFilter('diagnoses', filterData.diagnoses)

    var gender;
    if (activeFiltersState.gender) {
        if (activeFiltersState.gender === "male") {
            gender = "Man";
        } else if (activeFiltersState.gender === "female") {
            gender = "Kvinna";
        }
    }

    var priority = [];
    if (activeFiltersState.priority) {
        if (activeFiltersState.priority.low) {
            priority.push('Låg')
        }
        if (activeFiltersState.priority.average) {
            priority.push('Medel')
        }
        if (activeFiltersState.priority.high) {
            priority.push('Hög')
        }
    }

    var ageSpan;
    if (activeFiltersState.minAge != null && activeFiltersState.maxAge != null) {
        if (activeFiltersState.minAge !== 0 && activeFiltersState.maxAge !== 200) {
            ageSpan = activeFiltersState.minAge + '-' + activeFiltersState.maxAge;
        } else if (activeFiltersState.minAge !== 0) {
            ageSpan = '>' + activeFiltersState.minAge;
        } else if (activeFiltersState.maxAge !== 200) {
            ageSpan = '<' + activeFiltersState.maxAge;
        }
    }

    useEffect(() => {
        if (gender || priority.length > 0 || (activeFiltersState.team && activeFiltersState.team !== 'all')
            || (activeFiltersState.department && activeFiltersState.department !== 'all') || ageSpan || (activeFiltersState.diagnoses && activeFiltersState.diagnoses.length > 0)) {
            setIsFilterApplied(true);
        } else {
            setIsFilterApplied(false);
        }
    })

    return (
        <>
            <ul style={{ maxHeight: "150px", display: "flex", flexDirection: "column", flexWrap: "wrap", color: "#275E8E", fontWeight: "700" }}>
                {gender ?
                    <ListItem style={{ maxWidth: "30%", marginTop: "0px", marginBottom: "0px" }}>
                        Kön: {gender}
                    </ListItem>
                    : ''}
                {priority.length > 0 ?
                    <ListItem style={{ maxWidth: "30%", marginTop: "0px", marginBottom: "0px" }}>
                        Prioritet: {priority.join(', ')}
                    </ListItem>
                    : ''}
                {(activeFiltersState.team && activeFiltersState.team !== 'all') ?
                    <ListItem style={{ maxWidth: "30%", marginTop: "0px", marginBottom: "0px" }}>
                        Team: {activeFiltersState.team}
                    </ListItem>
                    : ''}
                {(activeFiltersState.department && activeFiltersState.department !== 'all') ?
                    <ListItem style={{ maxWidth: "30%", marginTop: "0px", marginBottom: "0px" }}>
                        Department: {activeFiltersState.department}
                    </ListItem>
                    : ''}
                {ageSpan ?
                    <ListItem style={{ maxWidth: "30%", marginTop: "0px", marginBottom: "0px" }}>
                        Åldersspann: {ageSpan}
                    </ListItem>
                    : ''}
                {(activeFiltersState.diagnoses && activeFiltersState.diagnoses.length > 0) ?
                    <ListItem style={{ maxWidth: "30%", marginTop: "0px", marginBottom: "0px" }}>
                        Diagnos: {activeFiltersState.diagnoses.join(', ')}
                    </ListItem>
                    : ''}
            </ul>
        </>
    )

};

// Component rendering a dropdown menu
const DropdownContent = ({ sortByList, setSortState, toggleSortBy, setDropdownOpen, dropdownOpen }) => {

    // If any of the alternatives are pressed, we keep track of this and close the dropdown menu.
    const handleClick = (id) => {
        setSortState({ columnId: id });
        toggleSortBy(id); // This will trigger the table
        setDropdownOpen(!dropdownOpen);
    }

    return (
        <div
            style={{ width: '175px' }}
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
const PatientsSearch = ({ setSortState,
    toggleSortBy,
    searchValue,
    setSearchValue,
    setOwnFilters,
    activeFiltersState,
    setActiveFiltersState,
    setAllFilters,
    customFilterData,
    setCustomFilterData,
    dropdownOpen,
    setDropdownOpen,
}) => {


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

    const handleResetFilters = () => {
        setAllFilters([]); // This will clear filters from the table instance
        setActiveFiltersState({}); // This will clear our interpretation of the filters
        setIsFilterApplied(false); // This means that no "Rensa filter" button should be present
        setCustomFilterData({ // This will clear the form inside the modal.
            minAge: 0,
            maxAge: 200,
            gender: 'all',
            team: 'all',
            department: 'all',
            priority: { low: false, average: false, high: false }, // Either low, medium, high, undefined (translated to 3, 2, 1, 0)
            diagnoses: [],
        })
    }
    const [isFilterApplied, setIsFilterApplied] = useState(false);

    return (
        <>
            <div style={{ height: 'auto', marginLeft: '10px', width: '100%' }}>
                <div style={{ float: 'left', height: '45px', marginTop: '10px', width: '25%', backgroundColor: '#FFF', borderRadius: '25px 25px' }}>
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
                <div style={{ width: '100%', textAlign: 'end' }}>
                    <ColumnFilter />
                    <PatientGroups
                        setOwnFilters={setOwnFilters}
                        customFilterData={customFilterData}
                        setCustomFilterData={setCustomFilterData}
                        dropdownOpen={dropdownOpen}
                        setDropdownOpen={setDropdownOpen}
                    />
                </div>
                <div style={{ width: '100%', height: 'auto', paddingTop: '12px', paddingBottom: '2px', marginLeft: 'auto', textAlign: 'end' }}>
                    <AppliedFilterUI
                        activeFiltersState={activeFiltersState}
                        setIsFilterApplied={setIsFilterApplied}
                        setCustomFilterData={setCustomFilterData} />
                    {isFilterApplied &&
                        <Link
                            underline="always"
                            component="button"
                            variant="body2"
                            style={{ color: "#000", marginRight: "1rem", marginTop: '10px' }}
                            onClick={handleResetFilters}>
                            Rensa Filter
                    </Link>}
                    <FilterModal
                        setDropdownOpen={setDropdownOpen}
                        setOwnFilters={setOwnFilters}
                        customFilterData={customFilterData}
                        setCustomFilterData={setCustomFilterData} />
                    <Button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <SwapVert style={{ fontSize: '25px' }} />
                    </Button>
                    {dropdownOpen && (
                        <div className='relative'>
                            <DropdownContent
                                sortByList={sortByList}
                                setSortState={setSortState}
                                toggleSortBy={toggleSortBy}
                                setDropdownOpen={setDropdownOpen}
                                dropdownOpen={dropdownOpen} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default PatientsSearch;

