import React, { useState, useEffect } from 'react';

import { InputBase, Link, ListItem } from '@material-ui/core';
//import { ArrowDropDown } from '@material-ui/icons';

import { FilterModal, NoticesGroups } from '..'

// Component rendering applied filters and Rensa filter button
const AppliedFilterUI = ({ activeFiltersState, setIsFilterApplied }) => {

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

// Component rendering blue div, with a searchfield and filtering + sorting buttons.
const NoticesSearch = ({
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
      <div style={{ float: 'left', height: 'auto', marginLeft: '10px', marginRight: '10px', width: '100%' }}>
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
        <div style={{ marginTop: '10px', width: '100%' }} >
          <NoticesGroups
            setOwnFilters={setOwnFilters}
            customFilterData={customFilterData}
            setCustomFilterData={setCustomFilterData}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
          />
        </div>
        <div style={{ height: 'auto', paddingTop: '12px', paddingBottom: '2px', marginLeft: 'auto', textAlign: 'end' }}>
          <AppliedFilterUI
            activeFiltersState={activeFiltersState}
            setIsFilterApplied={setIsFilterApplied}
            setCustomFilterData={setCustomFilterData} />
          {isFilterApplied &&
            <Link
              underline="always"
              component="button"
              variant="body2"
              style={{ color: "#000" }}
              onClick={handleResetFilters}>
              Rensa Filter
          </Link>}
          <FilterModal
            setDropdownOpen={setDropdownOpen}
            setOwnFilters={setOwnFilters}
            customFilterData={customFilterData}
            setCustomFilterData={setCustomFilterData} />
        </div>
      </div>
    </>
  );
};

export default NoticesSearch;

