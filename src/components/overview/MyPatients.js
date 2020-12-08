import React, {useState, useMemo, useEffect, useContext} from 'react';

import {PatientsSearch, PatientsTable} from "..";
import {
    useTable,
    useFlexLayout,
    useFilters,
    useGlobalFilter,
    useSortBy,
} from "react-table";

import {Tooltip, Link, Grid} from "@material-ui/core";
import {NotificationImportant} from "@material-ui/icons";

import {useAuth0} from "@auth0/auth0-react";

import {useHistory} from "react-router-dom";
import JourTable from "./JourTable";
import {settingsContext} from "./ColumnFilter"


// Component rendering bell icon (color based on value: integer) and hover information based on (text: string)
const Notification = ({value, text}) => {
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
const PatientLink = ({id, name}) => {

    const href = "/patient/overview/" + id;
    const history = useHistory();

    const navigateToPatientView = () => {
        history.push(href);
    };

    return (
        <>
            <Link
                component="button"
                style={{color: "#000"}}
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
                            "Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)"
                        }
                    />
                ),
                priority: 1,
                href: <PatientLink id="590619-7602" name="Gerd Karlsson"/>,
                name: "Gerd Karlsson",
                sweID: "590619-7602",
                diagnoses: ["Hypertoni"],
                updatedAt: "2020-12-10",
                updatedBy: "Patienten",
                age: 61,
                gender: "female",
                team: "Team 2",
                department: "Department 2",
            },

            {
                notices: (
                    <Notification
                        value={1}
                        text={
                            "Oväntat skattat värde! Vikt: 90 kg (7 kg över förväntat värde)"
                        }
                    />
                ),
                priority: 2,
                href: <PatientLink id="440508-7653" name="Kalle Persson"/>,
                name: "Kalle Persson",
                sweID: "440508-7653",
                diagnoses: ["Diabetes"],
                updatedAt: "2020-12-10",
                updatedBy: "Patienten",
                age: 76,
                gender: "male",
                team: "Team 2",
                department: "Department 1",
            },


            {
                notices: (
                    <Notification
                        value={1}
                        text={
                            "2 Missade schemalagda mättagningar för: Blodtryck, Vikt"
                        }
                    />
                ),
                priority: 2,
                href: <PatientLink id="470426-9713" name="Knut Hedström"/>,
                name: "Knut Hedström",
                sweID: "470426-9713",
                diagnoses: ["Diabetes", "Hypertoni"],
                updatedAt: "2020-11-25",
                updatedBy: "Patienten",
                age: 73,
                gender: "male",
                team: "Team 1",
                department: "Department 1",
            },

            {
                notices: (
                    <Notification
                        value={1}
                        text={
                            "Oväntat skattat värde! Blodtryck: 155/110 (Gränsvärde 140/90)"
                        }
                    />
                ),
                priority: 1,
                href: <PatientLink id="531124-7687" name="Frida Rehn"/>,
                name: "Frida Rehn",
                sweID: "531124-7687",
                diagnoses: ["Diabetes", "Hypertoni"],
                updatedAt: "2020-12-09",
                updatedBy: "Patienten",
                age: 67,
                gender: "female",
                team: "Team 1",
                department: "Department 2",
            },

            {
                notices: (
                    <Notification
                        value={2}
                        text={
                            "Missat schemalagd mättagning för: Blodtryck, Vikt"
                        }
                    />
                ),
                priority: 2,
                href: <PatientLink id="571224-0075" name="Magnus Ågren"/>,
                name: "Magnus Ågren",
                sweID: "571224-0075",
                diagnoses: ["Diabetes"],
                updatedAt: "2020-12-02",
                updatedBy: "Patienten",
                age: 63,
                gender: "male",
                team: "Team 1",
                department: "Department 1",
            },

  {
                notices: (
                    <Notification
                        value={0}
                        text={""
                        }
                    />
                ),
                priority: 4,
                href: <PatientLink id="470203-1324" name="Gunilla Andersson"/>,
                name: "Gunilla Andersson",
                sweID: "470203-1909",
                diagnoses: ["Diabetes", "Hypertoni"],
                updatedAt: "2020-12-10",
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
                            "Missat schemalagd mättagning för: Blodtryck, Vikt"
                        }
                    />
                ),
                priority: 1,
                href: <PatientLink id="590103-9965" name="Erika Ekholm"/>,
                name: "Erika Ekholm",
                sweID: "590103-9965",
                diagnoses: ["Diabetes", "Hypertoni"],
                updatedAt: "2020-12-02",
                updatedBy: "Patienten",
                age: 61,
                gender: "female",
                team: "Team 1",
                department: "Department 1",
            },

            {
                notices: (
                    <Notification
                        value={0}
                        text={
                            ""
                        }
                    />
                ),
                priority: 1,
                href: <PatientLink id="470523-5424" name="Gun-Britt Englund"/>,
                name: "Gun-Britt Englund",
                sweID: "470523-5424",
                diagnoses: ["Diabetes", "Hypertoni"],
                updatedAt: "2020-12-05",
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
                            "Missat schemalagd mättagning för: Blodtryck, Vikt"
                        }
                    />
                ),
                priority: 2,
                href: <PatientLink id="560501-9529" name="Edith Sjöholm"/>,
                name: "Edith Sjöholm",
                sweID: "560501-9529",
                diagnoses: ["Hypertoni"],
                updatedAt: "2020-11-27",
                updatedBy: "Patienten",
                age: 64,
                gender: "female",
                team: "Team 1",
                department: "Department 1",
            },

            {
                notices: (
                    <Notification
                        value={3}
                        text={
                            "Missat schemalagd mättagning för: Vikt"
                        }
                    />
                ),
                priority: 2,
                href: <PatientLink id="510505-1741" name="Marie-Sofie Ekberg"/>,
                name: "Marie-Sofie Ekberg",
                sweID: "510505-1741",
                diagnoses: ["Hypertoni"],
                updatedAt: "2020-11-30",
                updatedBy: "Patienten",
                age: 69,
                gender: "female",
                team: "Team 1",
                department: "Department 1",
            },

            {
                notices: (
                    <Notification
                        value={0}
                        text={
                            ""
                        }
                    />
                ),
                priority: 2,
                href: <PatientLink id="490227-5868" name="Lena Stenbock"/>,
                name: "Lena Stenbock",
                sweID: "490227-5868",
                diagnoses: ["Diabetes", "Hypertoni"],
                updatedAt: "2020-12-05",
                updatedBy: "Patienten",
                age: 71,
                gender: "female",
                team: "Team 1",
                department: "Department 2",
            },


            {
                notices: (
                    <Notification
                        value={0}
                        text={
                            ")"
                        }
                    />
                ),
                priority: 2,
                href: <PatientLink id="671020-8106" name="Matilda Sundqvist"/>,
                name: "Matilda Sundqvist",
                sweID: "671020-8106",
                diagnoses: ["Diabetes", "Hypertoni"],
                updatedAt: "2020-12-06",
                updatedBy: "Patienten",
                age: 53,
                gender: "female",
            },
            {
                notices: (
                    <Notification
                        value={3}
                        text={
                            "Missat schemalagd mättagning: Blodtryck"
                        }
                    />
                ),
                priority: 3,
                href: <PatientLink id="641220-5509" name="Lena Dahlman"/>,
                name: "Lena Dahlman",
                sweID: "641220-5509",
                diagnoses: ["Diabetes", "Hypertoni"],
                updatedAt: "2020-11-30",
                updatedBy: "Patienten",
                age: 56,
                gender: "female",
                team: "Team 1",
                department: "Department 2",
            },

            {
                notices: (
                    <Notification
                        value={3}
                        text={
                            "Missat schemalagd mättagning för: Blodtryck"
                        }
                    />
                ),
                priority: 3,
                href: <PatientLink id="611111-7229" name="Madelene Engdahl"/>,
                name: "Madelene Engdahl",
                sweID: "611111-7229",
                diagnoses: ["Hypertoni"],
                updatedAt: "2020-11-27",
                updatedBy: "Patienten",
                age: 59,
                gender: "female",
                team: "Team 1",
                department: "Department 2",
            },

            {
                notices: <Notification value={0} text={""}/>,
                priority: 4,
                href: <PatientLink id="580107-9160" name="Elsa Strandberg"/>,
                name: "Elsa Strandberg",
                sweID: "580107-9160",
                diagnoses: ["Diabetes", "Hypertoni"],
                updatedAt: "2020-12-04",
                updatedBy: "Patienten",
                age: 62,
                gender: "female",
                team: "Team 2",
                department: "Department 2",
            },

            {
                notices: <Notification value={0} text={""}/>,
                priority: 3,
                href: <PatientLink id="410307-5190" name="Ulf Östberg"/>,
                name: "Ulf Östberg",
                sweID: "410307-5190",
                diagnoses: ["Diabetes"],
                updatedAt: "2020-12-09",
                updatedBy: "Patienten",
                age: 79,
                gender: "male",
                team: "Team 2",
                department: "Department 2",
            },
            {
                notices: (
                    <Notification
                        value={0}
                        text={
                            ""
                        }
                    />
                ),
                priority: 1,
                href: <PatientLink id="350203-0798" name="Håkan Lind"/>,
                name: "Håkan Lind",
                sweID: "350203-0798",
                diagnoses: ["Diabetes"],
                updatedAt: "2020-12-04",
                updatedBy: "Patienten",
                age: 85,
                gender: "male",
                team: "Team 2",
                department: "Department 2",
            },
            {
                notices: (
                    <Notification
                        value={0}
                        text={
                            ""
                        }
                    />
                ),
                priority: 3,
                href: <PatientLink id="461103-4275" name="Casper Sjöberg"/>,
                name: "Casper Sjöberg",
                sweID: "461103-4275",
                diagnoses: ["Diabetes"],
                updatedAt: "2020-12-04",
                updatedBy: "Patienten",
                age: 74,
                gender: "male",
                team: "Team 2",
                department: "Department 2",
            },

            {
                notices: (
                    <Notification
                        value={0}
                        text={
                            ""
                        }
                    />
                ),
                priority: 3,
                href: <PatientLink id="360903-7142" name="Britta Söderberg"/>,
                name: "Britta Söderberg",
                sweID: "360903-7142",
                diagnoses: ["Diabetes"],
                updatedAt: "2020-12-08",
                updatedBy: "Patienten",
                age: 85,
                gender: "female",
                team: "Team 2",
                department: "Department 1",
            },
            {
                notices: (
                    <Notification
                        value={0}
                        text={
                            ""
                        }
                    />
                ),
                priority: 3,
                href: <PatientLink id="390617-1735" name="Viktor Andersson"/>,
                name: "Viktor Andersson",
                sweID: "390617-1735",
                diagnoses: ["Diabetes"],
                updatedAt: "2020-12-07",
                updatedBy: "Patienten",
                age: 81,
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
                Header: "Söknamn", // This is for mapping search queries.
                accessor: "name",
            },
            {
                Header: "Personnummer",
                accessor: "sweID",
            },
            {
                Header: "Diagnos",
                accessor: "diagnoses",
                Cell: ({value}) => String(value.join(", ")),
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
                Header: "Ålder",
                accessor: "age",
                filter: "numberInRangeFilter",
            },
            {
                Header: "Kön",
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
    const [sortState, setSortState] = useState({columnId: "priority"});

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
        priority: {low: false, average: false, high: false}, // Either low, medium, high, undefined (translated to 3, 2, 1, 0)
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
    const {settings} = useContext(settingsContext);
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
    } = useTable({columns, data, initialState, filterTypes},
        useFilters, // useFilters!
        useGlobalFilter,
        useSortBy,
        useFlexLayout
    );

    useMemo(() => {
        setHiddenColumns((prev) => {
            return (['age', 'name', 'gender', 'team', 'department'].concat(settings))
        })
    }, [setHiddenColumns, settings])

    const {getAccessTokenSilently} = useAuth0();

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
                        style={{backgroundColor: "#A9D7FF", borderRadius: "15px 15px"}}
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
                <Grid item xs={4} style={{paddingLeft: "5%", marginTop: "8px"}}>
                    <JourTable/>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Patients;
