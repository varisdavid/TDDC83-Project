import React, { useState, useMemo, useEffect, useContext } from 'react';

import { PatientsSearch, PatientsTable } from "..";
import {
  useTable,
  useFlexLayout,
  useFilters,
  useGlobalFilter,
  useSortBy,
} from "react-table";

import { Tooltip, Link, Grid } from "@material-ui/core";
import { NotificationImportant } from "@material-ui/icons";

import { useAuth0 } from "@auth0/auth0-react";

import { useHistory } from "react-router-dom";
import JourTable from "./JourTable";
import { settingsContext } from "./ColumnFilter"



// Component rendering bell icon (color based on value: integer) and hover information based on (text: string)
const Notification = ({ value, text }) => {
  var color;
  if (value === 1) {
    color = "#FF6464";
  } else if (value === 2) {
    color = "#FED765";
  } else if (value === 3) {
    color = "#27AE60";
  } else if (value === 0) {
    color = "#FFF"; // This is for rendering bug, empty cell not taking same space.
  }

  return (
    <Tooltip title={text} placement="left-start">
      <NotificationImportant
        style={{
          color: color,
          fontSize: "30px",
        }}
      />
    </Tooltip>
  );
};

// This component links the patients name from the table to a confirmation modal and then onto its patient specific part of the website.
const PatientLink = ({ id, name }) => {

  const href = "/patient/overview/" + id;
  const history = useHistory();

  const navigateToPatientView = () => {
    history.push(href);
  };

  return (
    <>
      <Link
        component="button"
        style={{ color: "#000" }}
        onClick={navigateToPatientView}
      >
        {name}
      </Link>
    </>
  );
};

const Patients = () => {
  // This will apply filters to the table based on what filterData it recieves,
  // it will also toggle the displaying of what the applied filter is and option to clear it
  const setOwnFilters = (filterData) => {
    // setAllFilters([
    //   { id: 'gender', value: customFilterData.gender },
    //   { id: 'priority', value: customFilterData.priority },
    // ])

    setFilter("gender", filterData.gender);
    setFilter("priority", filterData.priority);
    setFilter("team", filterData.team);
    setFilter("department", filterData.department);
    setFilter("age", [filterData.minAge, filterData.maxAge]);
    setFilter("diagnoses", filterData.diagnoses);

    // After we have applied it to our table, we will send it to the PatientsSearch component for displaying.
    setActiveFiltersState(filterData);
    setCustomFilterData(filterData); // This makes sure our representation of the fields in the filterModal is kept up to date.
  };

  // This can later be used to save our retrieved patientlist from our API.
  // const setPatientList = () => {
  // }

  const data = useMemo(
    // To get them in the proper order, using numbers to represent priority, 1 = high, 2 = medium, 3 = low with notification, 4 = low without notification
    () => [
      {
        notices: (
          <Notification
            value={1}
            text={
              "Ov??ntat skattat v??rde! Vikt: 30 kg (28 kg under f??rv??ntat v??rde)"
            }
          />
        ),
        priority: 1,
        href: <PatientLink id="470203-1324" name="Gunilla Andersson" />,
        name: "Gunilla Andersson",
        sweID: "470203-1324",
        diagnoses: ["Diabetes", "Hypertoni"],
        updatedAt: "2020-10-08",
        updatedBy: "Patienten",
        age: 73,
        gender: "female",
        team: "Team 1",
        department: "Department 1",
      },
      {
        notices: (
          <Notification
            value={1}
            text={
              "Ov??ntat skattat v??rde! Vikt: 30 kg (28 kg under f??rv??ntat v??rde)"
            }
          />
        ),
        priority: 1,
        href: <PatientLink id="470203-1324" name="Gunilla Andersson" />,
        name: "Gunilla Andersson",
        sweID: "470203-1324",
        diagnoses: ["Diabetes", "Hypertoni"],
        updatedAt: "2020-10-08",
        updatedBy: "Patienten",
        age: 73,
        gender: "female",
        team: "Team 1",
        department: "Department 1",
      },
      {
        notices: (
          <Notification
            value={1}
            text={
              "Ov??ntat skattat v??rde! Vikt: 30 kg (28 kg under f??rv??ntat v??rde)"
            }
          />
        ),
        priority: 1,
        href: <PatientLink id="470203-1324" name="Gunilla Andersson" />,
        name: "Gunilla Andersson",
        sweID: "470203-1324",
        diagnoses: ["Diabetes", "Hypertoni"],
        updatedAt: "2020-10-08",
        updatedBy: "Patienten",
        age: 73,
        gender: "female",
        team: "Team 1",
        department: "Department 1",
      },
      {
        notices: (
          <Notification
            value={1}
            text={
              "Ov??ntat skattat v??rde! Vikt: 30 kg (28 kg under f??rv??ntat v??rde)"
            }
          />
        ),
        priority: 1,
        href: <PatientLink id="470203-1324" name="Gunilla Andersson" />,
        name: "Gunilla Andersson",
        sweID: "470203-1324",
        diagnoses: ["Diabetes", "Hypertoni"],
        updatedAt: "2020-10-08",
        updatedBy: "Patienten",
        age: 73,
        gender: "female",
        team: "Team 1",
        department: "Department 1",
      },
      {
        notices: (
          <Notification
            value={1}
            text={
              "Ov??ntat skattat v??rde! Vikt: 30 kg (28 kg under f??rv??ntat v??rde)"
            }
          />
        ),
        priority: 1,
        href: <PatientLink id="470203-1324" name="Gunilla Andersson" />,
        name: "Gunilla Andersson",
        sweID: "470203-1324",
        diagnoses: ["Diabetes", "Hypertoni"],
        updatedAt: "2020-10-08",
        updatedBy: "Patienten",
        age: 73,
        gender: "female",
        team: "Team 1",
        department: "Department 1",
      },
      {
        notices: (
          <Notification
            value={1}
            text={
              "Ov??ntat skattat v??rde! Vikt: 30 kg (28 kg under f??rv??ntat v??rde)"
            }
          />
        ),
        priority: 1,
        href: <PatientLink id="470203-1324" name="Gunilla Andersson" />,
        name: "Gunilla Andersson",
        sweID: "470203-1324",
        diagnoses: ["Diabetes", "Hypertoni"],
        updatedAt: "2020-10-08",
        updatedBy: "Patienten",
        age: 73,
        gender: "female",
        team: "Team 1",
        department: "Department 1",
      },
      {
        notices: (
          <Notification
            value={1}
            text={
              "Ov??ntat skattat v??rde! Vikt: 30 kg (28 kg under f??rv??ntat v??rde)"
            }
          />
        ),
        priority: 1,
        href: <PatientLink id="470203-1324" name="Gunilla Andersson" />,
        name: "Gunilla Andersson",
        sweID: "470203-1324",
        diagnoses: ["Diabetes", "Hypertoni"],
        updatedAt: "2020-10-08",
        updatedBy: "Patienten",
        age: 73,
        gender: "female",
        team: "Team 1",
        department: "Department 1",
      },
      {
        notices: (
          <Notification
            value={1}
            text={
              "Ov??ntat skattat v??rde! Vikt: 30 kg (28 kg under f??rv??ntat v??rde)"
            }
          />
        ),
        priority: 1,
        href: <PatientLink id="470203-1324" name="Gunilla Andersson" />,
        name: "Gunilla Andersson",
        sweID: "470203-1324",
        diagnoses: ["Diabetes", "Hypertoni"],
        updatedAt: "2020-10-08",
        updatedBy: "Patienten",
        age: 73,
        gender: "female",
        team: "Team 1",
        department: "Department 1",
      },
      {
        notices: (
          <Notification
            value={2}
            text={
              "Ov??ntat skattat v??rde! Vikt: 30 kg (28 kg under f??rv??ntat v??rde)"
            }
          />
        ),
        priority: 2,
        href: <PatientLink id="470203-1324" name="Gunilla Andersson" />,
        name: "Gunilla Andersson",
        sweID: "470203-1324",
        diagnoses: ["Diabetes", "Hypertoni"],
        updatedAt: "2020-10-08",
        updatedBy: "Patienten",
        age: 73,
        gender: "female",
        team: "Team 1",
        department: "Department 1",
      },
      {
        notices: (
          <Notification
            value={2}
            text={
              "Ov??ntat skattat v??rde! Vikt: 30 kg (28 kg under f??rv??ntat v??rde)"
            }
          />
        ),
        priority: 2,
        href: <PatientLink id="470203-1324" name="Gunilla Andersson" />,
        name: "Gunilla Andersson",
        sweID: "470203-1324",
        diagnoses: ["Diabetes", "Hypertoni"],
        updatedAt: "2020-10-08",
        updatedBy: "Patienten",
        age: 73,
        gender: "female",
        team: "Team 1",
        department: "Department 1",
      },
      {
        notices: (
          <Notification
            value={2}
            text={
              "Ov??ntat skattat v??rde! Vikt: 30 kg (28 kg under f??rv??ntat v??rde)"
            }
          />
        ),
        priority: 2,
        href: <PatientLink id="470203-1324" name="Gunilla Andersson" />,
        name: "Gunilla Andersson",
        sweID: "470203-1324",
        diagnoses: ["Diabetes", "Hypertoni"],
        updatedAt: "2020-10-08",
        updatedBy: "Patienten",
        age: 73,
        gender: "female",
        team: "Team 1",
        department: "Department 2",
      },
      {
        notices: (
          <Notification
            value={2}
            text={
              "Ov??ntat skattat v??rde! Vikt: 30 kg (28 kg under f??rv??ntat v??rde)"
            }
          />
        ),
        priority: 2,
        href: <PatientLink id="470203-1324" name="Gunilla Andersson" />,
        name: "Gunilla Andersson",
        sweID: "470203-1324",
        diagnoses: ["Diabetes", "Hypertoni"],
        updatedAt: "2020-10-08",
        updatedBy: "Patienten",
        age: 73,
        gender: "female",
      },
      {
        notices: (
          <Notification
            value={3}
            text={
              "Ov??ntat skattat v??rde! Vikt: 30 kg (28 kg under f??rv??ntat v??rde)"
            }
          />
        ),
        priority: 3,
        href: <PatientLink id="470203-1324" name="Gunilla Andersson" />,
        name: "Gunilla Andersson",
        sweID: "470203-1324",
        diagnoses: ["Diabetes", "Hypertoni"],
        updatedAt: "2020-10-08",
        updatedBy: "Patienten",
        age: 73,
        gender: "female",
        team: "Team 1",
        department: "Department 2",
      },
      {
        notices: (
          <Notification
            value={3}
            text={
              "Ov??ntat skattat v??rde! Vikt: 30 kg (28 kg under f??rv??ntat v??rde)"
            }
          />
        ),
        priority: 3,
        href: <PatientLink id="470203-1324" name="Gunilla Andersson" />,
        name: "Gunilla Andersson",
        sweID: "470203-1324",
        diagnoses: ["Diabetes", "Hypertoni"],
        updatedAt: "2020-10-08",
        updatedBy: "Patienten",
        age: 73,
        gender: "female",
        team: "Team 1",
        department: "Department 2",
      },
      {
        notices: <Notification value={0} text={""} />,
        priority: 4,
        href: <PatientLink id="470203-1324" name="Gunilla Andersson" />,
        name: "Gunilla Andersson",
        sweID: "470203-1324",
        diagnoses: ["Diabetes", "Hypertoni"],
        updatedAt: "2020-10-08",
        updatedBy: "Patienten",
        age: 73,
        gender: "female",
        team: "Team 2",
        department: "Department 2",
      },
      {
        notices: <Notification value={0} text={""} />,
        priority: 4,
        href: <PatientLink id="410203-1324" name="Patrik Andersson" />,
        name: "Patrik Andersson",
        sweID: "410203-1324",
        diagnoses: ["Diabetes"],
        updatedAt: "2020-10-08",
        updatedBy: "Patienten",
        age: 79,
        gender: "male",
        team: "Team 2",
        department: "Department 2",
      },
      {
        notices: (
          <Notification
            value={1}
            text={
              "Ov??ntat skattat v??rde! Vikt: 30 kg (28 kg under f??rv??ntat v??rde)"
            }
          />
        ),
        priority: 1,
        href: <PatientLink id="350203-1324" name="G??ran Andersson" />,
        name: "G??ran Andersson",
        sweID: "350203-1324",
        diagnoses: ["Diabetes"],
        updatedAt: "2020-10-08",
        updatedBy: "Patienten",
        age: 85,
        gender: "male",
        team: "Team 2",
        department: "Department 2",
      },
      {
        notices: (
          <Notification
            value={3}
            text={
              "Ov??ntat skattat v??rde! Vikt: 30 kg (28 kg under f??rv??ntat v??rde)"
            }
          />
        ),
        priority: 3,
        href: <PatientLink id="998877-1324" name="Casper Andersson" />,
        name: "Casper Andersson",
        sweID: "998877-1324",
        diagnoses: ["Diabetes"],
        updatedAt: "2020-10-08",
        updatedBy: "Patienten",
        age: 21,
        gender: "male",
        team: "Team 2",
        department: "Department 2",
      },
      {
        notices: (
          <Notification
            value={3}
            text={
              "Ov??ntat skattat v??rde! Vikt: 30 kg (28 kg under f??rv??ntat v??rde)"
            }
          />
        ),
        priority: 3,
        href: <PatientLink id="350203-1324" name="Xander Andersson" />,
        name: "Xander Andersson",
        sweID: "350203-1324",
        diagnoses: ["Diabetes"],
        updatedAt: "2020-10-08",
        updatedBy: "Patienten",
        age: 85,
        gender: "male",
        team: "Team 2",
        department: "Department 1",
      },
      {
        notices: (
          <Notification
            value={3}
            text={
              "Ov??ntat skattat v??rde! Vikt: 30 kg (28 kg under f??rv??ntat v??rde)"
            }
          />
        ),
        priority: 3,
        href: <PatientLink id="350203-1324" name="Viktor Andersson" />,
        name: "Viktor Andersson",
        sweID: "350203-1324",
        diagnoses: ["Diabetes"],
        updatedAt: "2020-10-08",
        updatedBy: "Patienten",
        age: 85,
        gender: "male",
        team: "Team 2",
        department: "Department 1",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "notices",
      },
      {
        Header: "Prioritering",
        accessor: "priority", // accessor is the 'key' in the data
        filter: "priorityFilter",
      },
      {
        Header: "Namn",
        accessor: "href",
      },
      {
        Header: "S??knamn", // This is for mapping search queries.
        accessor: "name",
      },
      {
        Header: "Personnummer",
        accessor: "sweID",
      },
      {
        Header: "Diagnos",
        accessor: "diagnoses",
        Cell: ({ value }) => String(value.join(", ")),
        filter: "containsMatchingValues",
      },
      {
        Header: "Senast uppdaterad",
        accessor: "updatedAt",
      },
      {
        Header: "Uppdaterad av",
        accessor: "updatedBy",
      },
      {
        Header: "??lder",
        accessor: "age",
        filter: "numberInRangeFilter",
      },
      {
        Header: "K??n",
        accessor: "gender",
        filter: "selectFilter",
      },
      {
        Header: "Team",
        accessor: "team",
        filter: "selectFilter",
      },
      {
        Header: "Department",
        accessor: "department",
        filter: "selectFilter",
      },
    ],
    []
  );

  // Returns all rows containing either a selected value or all
  function selectFilterFn(rows, id, filterValue) {
    if (filterValue === "all") {
      return rows;
    }
    return rows.filter((row) => row.values[id] === filterValue);
  }

  // Returns all rows containing a chosen priority.
  function priorityFilterFn(rows, id, filterValue) {
    var priority = [];
    if (filterValue.low) {
      priority[0] = 3;
    }
    if (filterValue.average) {
      priority[1] = 2;
    }
    if (filterValue.high) {
      priority[2] = 1;
    }

    if (priority.length > 0) {
      return rows.filter((row) => priority.includes(row.values[id]));
    } else {
      return rows;
    }
  }

  // Returns all rows containing a number inbetween a chosen range.
  function numberInRangeFilterFn(rows, id, filterValue) {
    return rows.filter(
      (row) =>
        filterValue[0] < row.values[id] && row.values[id] < filterValue[1]
    );
  }

  // Returns all patients with one of the selected diagnoses
  function containsMatchingValuesFn(rows, id, filterValue) {
    // This is used to avoid duplicates.
    var matches = [];

    // If we dont have any diagnoses to filter with, all should be returned
    if (filterValue.length > 0) {
      // This line goes through all possible filters and sees if any of the rows have one of the filter values in its diagnoses array
      // , and if this is fulfilled + that row hasen't already been added, we add it.
      filterValue.forEach((value) =>
        rows.forEach((row, index) => {
          if (
            row.values[id].indexOf(value) !== -1 &&
            matches.indexOf(index) === -1
          ) {
            matches.push(index);
          }
        })
      );
      return matches.map((index) => rows[index]);
    } else {
      return rows;
    }
  }

  const filterTypes = useMemo(
    () => ({
      selectFilter: selectFilterFn,
      priorityFilter: priorityFilterFn,
      numberInRangeFilter: numberInRangeFilterFn,
      containsMatchingValues: containsMatchingValuesFn,
    }),
    []
  );

  const [searchValue, setSearchValue] = useState("");

  // Keeps track of sorting options, starting column sorting : 'priority'
  const [sortState, setSortState] = useState({ columnId: "priority" });

  // This state will keep track of what filters we have active.flex-row
  const [activeFiltersState, setActiveFiltersState] = useState({});

  // Basic structure [{ id: 'name', value: 'Jane'}, { id: 'age', value: 21 }]
  //const [filterState, setFilterState] = useState({});

  // This keeps track of our current filter in the representation of the field in filterModal
  const [customFilterData, setCustomFilterData] = useState({
    minAge: 0,
    maxAge: 200,
    gender: "all",
    team: "all",
    department: "all",
    priority: { low: false, average: false, high: false }, // Either low, medium, high, undefined (translated to 3, 2, 1, 0)
    diagnoses: [],
  });

  // State keeping track of wheter the sort menu has been toggled or not
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Used for beginning values passed to the PatientTable
  const initialState = {
    sortBy: [sortState],
    filters: [],
    hiddenColumns: ["age", "name", "gender", "team", "department"],
    // filters: [{ id: 'col1', value: 'Green'}]
  };
  const { settings } = useContext(settingsContext);
  // Creates an instance of table, given columns, data and an initial state.
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    toggleSortBy,
    setGlobalFilter,
    setFilter,
    setAllFilters,
    setHiddenColumns
  } = useTable({ columns, data, initialState, filterTypes },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    useFlexLayout
  );

  useMemo(() => {
    setHiddenColumns((prev) => {return (['age', 'name', 'gender', 'team', 'department'].concat(settings))})
  }, [setHiddenColumns, settings])

  const { getAccessTokenSilently } = useAuth0();

  // When something happens, we check to see if we change the sorting option, and we check if the search has been triggered
  useEffect(() => {
    // Basic example of how to make a authorized fetch call to our backend endpoints
    /*const getPatientList = async () => {
      const domain = "http://127.0.0.1:5000/api/patientlist";

      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(domain, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.log(error.message);
      }
    };*/
    toggleSortBy(sortState.columnId); // Based on our chosen sorting column, this toggles.
    setGlobalFilter(searchValue); // We use the stored searchValue to globally filter our table by.
  }, [
    searchValue,
    sortState,
    toggleSortBy,
    setGlobalFilter,
    getAccessTokenSilently,
  ]);

  return (
    <Grid container alignItems="center" justify="center">
      <Grid container spacing={3} justify="center">
        <Grid item xs={11}>
          <div
            style={{ backgroundColor: "#A9D7FF", borderRadius: "15px 15px" }}
            className="flex mt-2 p-2"
          >
            <PatientsSearch
              setSortState={setSortState}
              toggleSortBy={toggleSortBy}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              setOwnFilters={setOwnFilters}
              activeFiltersState={activeFiltersState}
              setActiveFiltersState={setActiveFiltersState}
              setAllFilters={setAllFilters}
              customFilterData={customFilterData}
              setCustomFilterData={setCustomFilterData}
              dropdownOpen={dropdownOpen}
              setDropdownOpen={setDropdownOpen}
            />
          </div>
        </Grid>
        <Grid item xs={11}>
          <PatientsTable
            getTableProps={getTableProps}
            getTableBodyProps={getTableBodyProps}
            headerGroups={headerGroups}
            rows={rows}
            prepareRow={prepareRow}
          />
        </Grid>
      </Grid>
      <Grid container>
          <Grid item xs = {4} style={{paddingLeft: "5%", marginTop: "8px"}}>
            <JourTable />
          </Grid> 
      </Grid>
    </Grid>
  );
};

export default Patients;
