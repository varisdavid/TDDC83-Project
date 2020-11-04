import React, { useState } from "react";

import { InputBase, Button } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';

import { FilterModal } from "../components"

const PatientsSearch = ({columns, 
                        NumberRangeColumnFilter, 
                        SelectColumnFilter, 
                        GlobalFilter, 
                        state, 
                        preGlobalFilteredRows, 
                        setGlobalFilter, 
                        headerGroups,
                        visibleColumns}) => {

    // Work in progress, need to add hooks for react-table for the filtering and sorting buttons.
    // Need to understand how filtrera shall work and make sortera efter into a proper dropdown menu.

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
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
                    value={searchTerm} 
                />
            </div>

            <div style={{ height: "auto", paddingTop: "12px", paddingBottom: "2px", width: "40%", marginLeft: "auto", textAlign: "end" }}>
                <FilterModal
                    columns={columns}
                    NumberRangeColumnFilter={NumberRangeColumnFilter} 
                    SelectColumnFilter={SelectColumnFilter}
                    GlobalFilter={GlobalFilter}
                    state={state}
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    setGlobalFilter={setGlobalFilter}
                    headerGroups={headerGroups}
                    visibleColumns={visibleColumns}
                />
                <Button className="shadow" style={{ borderRadius: "0", backgroundColor: "#FFF" }}>
                    Sortera efter
                    <ArrowDropDown style={{ marginLeft: "20px", fontSize: "16px" }} />
                </Button>
            </div>
        </div>
        
    </>
    );
};

export default PatientsSearch;

