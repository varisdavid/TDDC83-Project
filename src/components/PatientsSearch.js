import React, { useState } from "react";

import { InputBase, Button } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';

import { FilterModal } from "../components"

const DropdownContent = ({ dropdownItems, setSortState, setDropdownOpen, dropdownOpen }) => {

    const handleClick = (id) => {
        setSortState({columnId: id});
        setDropdownOpen(!dropdownOpen);
    }

    return (
        <div 
            style={{width: "175px"}} 
            className="bg-white text-center grey-400 w-inherit absolute right-0 p-2 shadow-lg rounded-lg mt-2"
        >
        
        {dropdownItems.map((item, i) => {
            return (
            <div className="mt-1" key={i}>
               <Button onClick={() => handleClick(item.id)}>
                   {item.sortBy}
               </Button>
            </div>
            );
        })}
        </div>
    );
};

const PatientsSearch = ({columns, 
                        NumberRangeColumnFilter, 
                        SelectColumnFilter,
                        setSortState,
                        searchValue,
                        setSearchValue
                        }) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const dropdownItems = [
        {
        sortBy: 'Prioritering',
        id: 'col1',
        },
        {
        sortBy: 'Namn',
        id: 'col2',
        },
        {
        sortBy: 'Personnummer',
        id: 'col3',
        },
        {
        sortBy: 'Diagnos',
        id: 'col4',
        },
        {
        sortBy: 'Senast uppdaterad',
        id: 'col5',
        },
        {
        sortBy: 'Uppdaterad av',
        id: 'col6',
        },
    ];

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
    <>
        <div style={{ height: "auto", marginLeft: "auto", marginRight: "auto", width: "95%" }}>
            <div style={{ height: "45px", width: "inherit", marginLeft: "auto", marginRight: "auto", backgroundColor: "#FFF", borderRadius: "25px 25px" }}>
                <InputBase
                    inputComponent='input'               
                    className="text-gray-800"
                    style={{ 
                        marginLeft: "10px",
                        height: "45px",
                        width: "100%"
                    }}
                    placeholder="Sök:"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleSearchChange}
                    value={searchValue} 
                />
            </div>

            <div style={{ height: "auto", paddingTop: "12px", paddingBottom: "2px", marginLeft: "auto", textAlign: "end" }}>
                <FilterModal
                    columns={columns}
                    NumberRangeColumnFilter={NumberRangeColumnFilter} 
                    SelectColumnFilter={SelectColumnFilter}
                />
                <Button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="shadow" 
                    style={{ borderRadius: "0", backgroundColor: "#FFF" }}
                >
                    Sortera efter
                    <ArrowDropDown style={{ marginLeft: "20px", fontSize: "16px" }} />
                </Button>
                {dropdownOpen && (
                    <div className="relative">
                        <DropdownContent dropdownItems={dropdownItems} setSortState={setSortState} setDropdownOpen={setDropdownOpen} dropdownOpen={dropdownOpen} />
                    </div>
                )}
            </div>
        </div>
        
    </>
    );
};

export default PatientsSearch;

