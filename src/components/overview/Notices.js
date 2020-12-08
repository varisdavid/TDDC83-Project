import React, {useState, useMemo, useEffect} from 'react';

import {NoticesSearch, NoticesTable} from '..'
import {useTable, useFlexLayout, useFilters, useGlobalFilter, useSortBy} from 'react-table'

import {Link} from '@material-ui/core';

import {useAuth0} from "@auth0/auth0-react";

import {useHistory} from 'react-router-dom';

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
                onClick={navigateToPatientView}
                component="button"
                style={{color: "#000"}}
            >
                {name}
            </Link>
        </>

    );
}

const Notices = () => {

    // This will apply filters to the table based on what filterData it recieves,
    // it will also toggle the displaying of what the applied filter is and option to clear it
    const setOwnFilters = (filterData) => {

        // setAllFilters([
        //   { id: 'gender', value: customFilterData.gender },
        //   { id: 'priority', value: customFilterData.priority },
        // ])

        setFilter('gender', filterData.gender);
        setFilter('priority', filterData.priority);
        setFilter('team', filterData.team)
        setFilter('department', filterData.department)
        setFilter('age', [filterData.minAge, filterData.maxAge])
        setFilter('diagnoses', filterData.diagnoses)
        setFilter('dateRow', true)

        // After we have applied it to our table, we will send it to the PatientsSearch component for displaying.
        setActiveFiltersState(filterData)
        setCustomFilterData(filterData); // This makes sure our representation of the fields in the filterModal is kept up to date.

    }

    const data = useMemo(
        // To get them in the proper order, using numbers to represent priority, 1 = high, 2 = medium, 3 = low with notification, 4 = low without notification
        () => [
            {
                href: "2020-12-10", // This is for displaying purposes
                date: "2020-12-10:00", // the added :00 makes it so this sorts above patient info with the same date.
                dateRow: true,
                print: false,
            }, {

                priority: 3,
                href: <PatientLink id="641220-5509" name="Lena Dahlman"/>,
                name: "Lena Dahlman",
                sweID: "641220-5509",
                diagnoses: ["Diabetes", "Hypertoni"],
                date: "2020-12-10",
                notis: "Missat schemalagd mättagning: Blodtryck",
                age: 56,
                gender: "female",
                team: "Team 1",
            },


            {
                priority: 1,
                href: <PatientLink id="590619-7602" name="Gerd karlsson"/>,
                name: "Gerd Karlsson",
                sweID: "590619-7602",
                diagnoses: ["Hypertoni"],
                date: "2020-12-10",
                notis: "Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)",
                age: 61,
                gender: "female",
                team: "Team 2",

            }, {
                priority: 1,
                href: <PatientLink id="440508-7653" name="Kalle Persson"/>,
                name: "Kalle Persson",
                sweID: "440508-7653",
                diagnoses: ["Diabetes"],
                date: "2020-12-10",
                notis: "Oväntat skattat värde! Vikt: 90 kg (7 kg över förväntat värde)",
                age: 76,
                gender: "male",
                team: "Team 2",
            },

            {
                href: "2020-12-09", // This is for displaying purposes
                date: "2020-12-09:00", // the added :00 makes it so this sorts above patient info with the same date.
                dateRow: true,
                print: false,
            },

            {
                priority: 2,
                href: <PatientLink id="590103-9965" name="Erika Ekholm"/>,
                name: "Erika Ekholm",
                sweID: "590103-9965",
                diagnoses: ["Diabetes", "Hypertoni"],
                date: "2020-12-09",
                notis: "Missat schemalagd mättagning för: Blodtryck, Vikt",
                age: 61,
                gender: "female",
                team: "Team 1",
            },

            {

                priority: 2,
                href: <PatientLink id="571224-0075" name="Magnus Ågren"/>,
                name: "Magnus Ågren",
                sweID: "571224-0075",
                diagnoses: ["Diabetes"],
                date: "2020-12-09",
                age: 63,
                notis: "Missat schemalagd mättagning för: Blodtryck, Vikt",
                gender: "male",
                team: "Team 1",
            },
            {
                priority: 1,
                href: <PatientLink id="470426-9713" name="Knut Hedström"/>,
                name: "Knut Hedström",
                sweID: "470426-9713",
                diagnoses: ["Diabetes", "Hypertoni"],
                date: "2020-12-09",
                notis: "2 Missade schemalagda mättagningar för: Blodtryck, Vikt",
                age: 73,
                gender: "male",
                team: "Team 1",
            },
            {
                priority: 1,
                href: <PatientLink id="531124-7687" name="Frida Rehn"/>,
                name: "Frida Rehn",
                sweID: "531124-7687",
                diagnoses: ["Diabetes", "Hypertoni"],
                date: "2020-12-09",
                notis: "Oväntat skattat värde! Blodtryck: 155/110 (Gränsvärde 140/90)",
                age: 67,
                gender: "female",
                team: "Team 1",
            },

            {
                href: "2020-12-07", // This is for displaying purposes
                date: "2020-12-07:00", // the added :00 makes it so this sorts above patient info with the same date.
                dateRow: true,
                print: false,
            }, {

                priority: 3,
                href: <PatientLink id="510505-1741" name="Marie-Sofie Ekberg"/>,
                name: "Marie-Sofie Ekberg",
                sweID: "510505-1741",
                diagnoses: ["Hypertoni"],
                date: "2020-12-07",
                updatedBy: "Patienten",
                age: 69,
                notis: "Missat schemalagd mättagning för: Vikt",
                gender: "female",
                team: "Team 1",
                department: "Department 1"
            },


            {

                priority: 3,
                href: <PatientLink id="641220-5509" name="Lena Dahlman"/>,
                name: "Lena Dahlman",
                sweID: "641220-5509",
                diagnoses: ["Diabetes", "Hypertoni"],
                date: "2020-12-07",
                age: 56,
                notis: "Missat schemalagd mättagning för: Blodtryck",
                gender: "female",
                team: "Team 1",
            },


            {
                href: "2020-12-04", // This is for displaying purposes
                date: "2020-12-04:00", // the added :00 makes it so this sorts above patient info with the same date.
                dateRow: true,
                print: false,
            },

            {
                priority: 3,
                href: <PatientLink id="611111-7229" name="Madelene Engdahl"/>,
                name: "Madelene Engdahl",
                sweID: "611111-7229",
                diagnoses: ["Hypertoni"],
                date: "2020-12-04",
                notis: "Missat schemalagd mättagning för: Blodtryck",
                age: 59,
                gender: "female",
                team: "Team 1",
                department: "Department 2",
            },

            {

                priority: 2,
                href: <PatientLink id="560501-9529" name="Edith Sjöholm"/>,
                name: "Edith Sjöholm",
                sweID: "560501-9529",
                diagnoses: ["Hypertoni"],
                date: "2020-12-04",
                age: 64,
                notis: "Missat schemalagd mättagning för: Blodtryck, Vikt",
                gender: "female",
                team: "Team 1",
                department: "Department 1",
            },

            {
                href: "2020-12-02", // This is for displaying purposes
                date: "2020-12-02:00", // the added :00 makes it so this sorts above patient info with the same date.
                dateRow: true,
                print: false,
            }, {

                priority: 2,
                href: <PatientLink id="470426-9713" name="Knut Hedström"/>,
                name: "Knut Hedström",
                sweID: "470426-9713",
                diagnoses: ["Diabetes", "Hypertoni"],
                date: "2020-12-02",
                notis: "Missat schemalagd mättagning för: Blodtryck, Vikt",
                age: 73,
                gender: "male",
                team: "Team 1",

            },

            /*
                // Last correct input...
                {
                    priority: 1,
                    href: <PatientLink id='470203-1324' name="Gunilla Andersson"/>,
                    name: "Gunilla Andersson",
                    sweID: '470203-1324',
                    diagnoses: ['Diabetes', 'Hypertoni'],
                    date: '2020-11-17',
                    notis: 'Oväntat mätvärde: Blodtryck: 180/110. Avvikande från patients normalvärde: 130/70.',
                    age: 73,
                    gender: 'female',
                    team: 'Team 1',
                },
                {
                    priority: 1,
                    href: <PatientLink id='470203-1324' name="Gunilla Andersson"/>,
                    name: "Gunilla Andersson",
                    sweID: '470203-1324',
                    diagnoses: ['Diabetes', 'Hypertoni'],
                    date: '2020-11-17',
                    notis: 'Oväntat mätvärde: Vikt: 30 kg. 28 kg under målvärde',
                    age: 73,
                    gender: 'female',
                    team: 'Team 1',
                },
                {
                    href: "2020-11-14",
                    date: "2020-11-14:00",
                    dateRow: true,
                    print: false,

                },
                {
                    priority: 1,
                    href: <PatientLink id='470203-1324' name="Gunilla Andersson"/>,
                    name: "Gunilla Andersson",
                    sweID: '470203-1324',
                    diagnoses: ['Diabetes', 'Hypertoni'],
                    date: '2020-11-14',
                    notis: 'Fem missade mätningar av vikt.',
                    age: 73,
                    gender: 'female',
                    team: 'Team 1',
                },
                {
                    priority: 1,
                    href: <PatientLink id='470203-1324' name="Gunilla Andersson"/>,
                    name: "Gunilla Andersson",
                    sweID: '470203-1324',
                    diagnoses: ['Diabetes', 'Hypertoni'],
                    date: '2020-11-14',
                    notis: 'Oväntat mätvärde: Vikt: 30 kg. 28 kg under målvärde',
                    age: 73,
                    gender: 'female',
                    team: 'Team 1',
                },
                {
                    href: "2020-11-12",
                    date: "2020-11-12:00",
                    dateRow: true,
                    print: false,

                },
                {
                    priority: 1,
                    href: <PatientLink id='470203-1324' name="Gunilla Andersson"/>,
                    name: "Gunilla Andersson",
                    sweID: '470203-1324',
                    diagnoses: ['Diabetes', 'Hypertoni'],
                    date: '2020-11-12',
                    notis: 'Fem missade mätningar av vikt.',
                    age: 73,
                    gender: 'female',
                    team: 'Team 1',
                },
                {
                    priority: 1,
                    href: <PatientLink id='470203-1324' name="Gunilla Andersson"/>,
                    name: "Gunilla Andersson",
                    sweID: '470203-1324',
                    diagnoses: ['Diabetes', 'Hypertoni'],
                    date: '2020-11-12',
                    notis: 'Oväntat mätvärde: Vikt: 30 kg. 28 kg under målvärde',
                    age: 73,
                    gender: 'female',
                    team: 'Team 1',
                },
                {
                    priority: 1,
                    href: <PatientLink id='470203-1324' name="Gunilla Andersson"/>,
                    name: "Gunilla Andersson",
                    sweID: '470203-1324',
                    diagnoses: ['Diabetes', 'Hypertoni'],
                    date: '2020-11-12',
                    notis: 'Oväntat mätvärde: Blodtryck: 180/110. Avvikande från patients normalvärde: 130/70.',
                    age: 73,
                    gender: 'female',
                    team: 'Team 1',
                },
                {
                    href: "2020-11-07",
                    date: "2020-11-07:00",
                    dateRow: true,
                    print: false,

                },
                {
                    priority: 2,
                    href: <PatientLink id='470203-1324' name="Gunilla Andersson"/>,
                    name: "Gunilla Andersson",
                    sweID: '470203-1324',
                    diagnoses: ['Diabetes', 'Hypertoni'],
                    date: '2020-11-07',
                    notis: 'Två missade mätningar av vikt.',
                    age: 73,
                    gender: 'female',
                    team: 'Team 1',
                },
                {
                    priority: 2,
                    href: <PatientLink id='470203-1324' name="Gunilla Andersson"/>,
                    name: "Gunilla Andersson",
                    sweID: '470203-1324',
                    diagnoses: ['Diabetes', 'Hypertoni'],
                    date: '2020-11-07',
                    notis: 'Oväntat mätvärde: Vikt:50 kg. 8 kg från målvärde.',
                    age: 73,
                    gender: 'female',
                    team: 'Team 1',
                },
                {
                    href: "2020-11-01",
                    date: "2020-11-01:00",
                    dateRow: true,
                    print: false,

                },
                {
                    priority: 2,
                    href: <PatientLink id='470203-1324' name="Gunilla Andersson"/>,
                    name: "Gunilla Andersson",
                    sweID: '470203-1324',
                    diagnoses: ['Diabetes', 'Hypertoni'],
                    date: '2020-11-01',
                    notis: 'Två missade mätningar av blodtryck.',
                    age: 73,
                    gender: 'female',
                    team: 'Team 1',
                },
                {
                    priority: 2,
                    href: <PatientLink id='470203-1324' name="Gunilla Andersson"/>,
                    name: "Gunilla Andersson",
                    sweID: '470203-1324',
                    diagnoses: ['Diabetes', 'Hypertoni'],
                    date: '2020-11-01',
                    notis: 'Två missade mätningar av vikt.',
                    age: 73,
                    gender: 'female',
                    team: 'Team 1'
                },
                {
                    priority: 3,
                    href: <PatientLink id='470203-1324' name="Gunilla Andersson"/>,
                    name: "Gunilla Andersson",
                    sweID: '470203-1324',
                    diagnoses: ['Diabetes', 'Hypertoni'],
                    date: '2020-11-01',
                    notis: 'En missad mätning av vikt.',
                    age: 73,
                    gender: 'female',
                    team: 'Team 1',
                },
                {
                    priority: 3,
                    href: <PatientLink id='470203-1324' name="Gunilla Andersson"/>,
                    name: "Gunilla Andersson",
                    sweID: '470203-1324',
                    diagnoses: ['Diabetes', 'Hypertoni'],
                    date: '2020-11-01',
                    notis: 'Nytt mätvärde: Vikt: 65 kg. Mätvärde överensstämmer med målvikt.',
                    age: 73,
                    gender: 'female',
                    team: 'Team 1',
                },
                {
                    priority: 1,
                    href: <PatientLink id='350203-1324' name="Göran Andersson"/>,
                    name: "Göran Andersson",
                    sweID: '350203-1324',
                    diagnoses: ['Diabetes'],
                    date: '2020-11-07',
                    notis: 'Fem missade mätningar av blodtryck.',
                    age: 85,
                    gender: 'male',
                    team: 'Team 2',
                },
                {
                    href: "2020-10-29",
                    date: "2020-10-29:00",
                    dateRow: true,
                    print: false,

                },
                {
                    priority: 3,
                    href: <PatientLink id='998877-1324' name="Casper Andersson"/>,
                    name: "Casper Andersson",
                    sweID: '998877-1324',
                    diagnoses: ['Diabetes'],
                    date: '2020-10-29',
                    notis: 'En missad mätning av blodtryck.',
                    age: 21,
                    gender: 'male',
                    team: 'Team 2',
                },
                {
                    priority: 3,
                    href: <PatientLink id='350203-1324' name="Xander Andersson"/>,
                    name: "Xander Andersson",
                    sweID: '350203-1324',
                    diagnoses: ['Diabetes'],
                    date: '2020-10-29',
                    notis: 'Nytt mätvärde: Vikt: 65 kg. Mätvärde överensstämmer med målvikt.',
                    age: 85,
                    gender: 'male',
                    team: 'Team 2',
                },
                {
                    priority: 3,
                    href: <PatientLink id='350203-1324' name="Viktor Andersson"/>,
                    name: "Viktor Andersson",
                    sweID: '350203-1324',
                    diagnoses: ['Diabetes'],
                    date: '2020-10-29',
                    notis: 'Nytt mätvärde: Vikt: 65 kg. Mätvärde överensstämmer med målvikt.',
                    age: 85,
                    gender: 'male',
                    team: 'Team 2',
                },

                */
        ],
        []
    )

    const columns = useMemo(
        () => [
            {
                Header: 'Namn',
                accessor: 'href',
            },
            {
                Header: 'Söknamn', // This is for mapping search queries.
                accessor: 'name',
            },
            {
                Header: 'Personnummer',
                accessor: 'sweID',
            },
            {
                Header: 'Diagnos',
                accessor: 'diagnoses',
                Cell: ({value}) => String(value.join(', ')),
                filter: 'containsMatchingValues',
            },
            {
                Header: 'Datum',
                accessor: 'date',
            },
            {
                Header: 'Notis',
                accessor: 'notis',
            },
            {
                Header: 'Prioritering',
                accessor: 'priority', // accessor is the 'key' in the data
                filter: 'priorityFilter',
            },
            {
                Header: 'Ålder',
                accessor: 'age',
                filter: 'numberInRangeFilter',
            },
            {
                Header: 'Kön',
                accessor: 'gender',
                filter: 'selectFilter',
            },
            {
                Header: 'Team',
                accessor: 'team',
                filter: 'selectFilter',
            },
            {
                Header: 'Department',
                accessor: 'department',
                filter: 'selectFilter',
            },
            {
                Header: 'DateRow',
                accessor: "dateRow",
                filter: 'clearAllBadDateRows',
            },
        ],
        []
    )

    // Returns all rows containing either a selected value or all
    function selectFilterFn(rows, id, filterValue) {
        if (filterValue === 'all') {
            return rows;
        }
        // If it either matches, or it is a dateRow we keep it.
        return rows.filter(row => row.values[id] === filterValue || row.original["dateRow"])
    }

    // Returns all rows containing a chosen priority.
    function priorityFilterFn(rows, id, filterValue) {

        var priority = [];
        if (filterValue.low) {
            priority[0] = 3
        }
        if (filterValue.average) {
            priority[1] = 2
        }
        if (filterValue.high) {
            priority[2] = 1
        }

        if (priority.length > 0) {
            return rows.filter(row => priority.includes(row.values[id]) || row.original["dateRow"])
        } else {
            return rows
        }
    }

    // Returns all rows containing a number inbetween a chosen range.
    function numberInRangeFilterFn(rows, id, filterValue) {
        return rows.filter(row => (filterValue[0] < row.values[id] && row.values[id] < filterValue[1]) || row.original["dateRow"])
    }

    // Returns all patients with one of the selected diagnoses
    function containsMatchingValuesFn(rows, id, filterValue) {

        // This is used to avoid duplicates.
        var matches = [];

        // If we dont have any diagnoses to filter with, all should be returned
        if (filterValue.length > 0) {
            // This line goes through all possible filters and sees if any of the rows have one of the filter values in its diagnoses array
            // , and if this is fulfilled + that row hasen't already been added, we add it.
            filterValue.forEach(value => rows.forEach((row, index) => {
                if ((row.original["dateRow"] || row.values[id].indexOf(value)) !== -1 && matches.indexOf(index) === -1) {
                    // It is very important that it first checks if it is a dateRow, because it wont have be able to use the function indexOf for these rows.
                    matches.push(index)
                }
            }))
            return matches.map(index => rows[index])
        } else {
            return rows;
        }

    }

    function clearAllBadDateRowsFn(rows) {

        var matches = [];

        var dates = []

        rows.forEach(row => {
            if (!row.original.dateRow && dates.indexOf(row.original.date.substring(0, 10)) === -1) {
                dates.push(row.original.date.substring(0, 10));
            }
        });

        rows.forEach((row, index) => {
            if (!row.original.dateRow) {
                matches.push(index)
            }
        });

        dates.forEach(date => {
            rows.forEach((row, index) => {
                if (row.original.dateRow) {
                    if (row.original.date.substring(0, 10) === date) {
                        matches.push(index)
                    }
                }
            })
        })

        return matches.map(index => rows[index])
    }

    const filterTypes = useMemo(
        () => ({
            selectFilter: selectFilterFn,
            priorityFilter: priorityFilterFn,
            numberInRangeFilter: numberInRangeFilterFn,
            containsMatchingValues: containsMatchingValuesFn,
            clearAllBadDateRows: clearAllBadDateRowsFn,
        }),
        []
    );

    const [searchValue, setSearchValue] = useState('')

    // This state will keep track of what filters we have active.flex-row
    const [activeFiltersState, setActiveFiltersState] = useState({});

    // Basic structure [{ id: 'name', value: 'Jane'}, { id: 'age', value: 21 }]
    //const [filterState, setFilterState] = useState({});

    // This keeps track of our current filter in the representation of the field in filterModal
    const [customFilterData, setCustomFilterData] = useState({
        minAge: 0,
        maxAge: 200,
        gender: 'all',
        team: 'all',
        department: 'all',
        priority: {low: false, average: false, high: false}, // Either low, medium, high, undefined (translated to 3, 2, 1, 0)
        diagnoses: [],
    })

    // State keeping track of wheter the sort menu has been toggled or not
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Used for beginning values passed to the PatientTable
    const initialState = {
        sortBy: [
            {
                id: 'date',
                desc: true
            }
        ],
        filters: [],
        hiddenColumns: ['age', 'name', 'gender', 'team', 'department', 'diagnoses', 'dateRow']
        // filters: [{ id: 'col1', value: 'Green'}]
    };

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
    } = useTable({columns, data, initialState, filterTypes},
        useFilters, // useFilters!
        useGlobalFilter,
        useSortBy,
        useFlexLayout,
    );

    const {getAccessTokenSilently} = useAuth0();
    // When something happens, we check to see if we change the sorting option, and we check if the search has been triggered
    useEffect(() => {
        // Basic example of how to make a authorized fetch call to our backend endpoints
        const getPatientList = async () => {
            const domain = "http://127.0.0.1:5000/api/patientlist";

            try {
                const token = await getAccessTokenSilently();
                const response = await fetch(domain,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const responseData = await response.json();
                console.log(responseData);
            } catch (error) {
                console.log(error.message);
            }
        };
        getPatientList();
        setGlobalFilter(searchValue); // We use the stored searchValue to globally filter our table by.
    }, [searchValue, toggleSortBy, setGlobalFilter, getAccessTokenSilently]);

    return (
        <>
            <div className='flex justify-center'>
                <div
                    style={{backgroundColor: '#A9D7FF', borderRadius: '15px 15px'}}
                    className='flex w-10/12 mt-2 p-2'
                >
                    <NoticesSearch
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
            </div>

            <div className='flex justify-center'>
                <div style={{width: 'calc(85%)', marginRight: '22.5px'}} className='mt-3 p-2'>
                    <div style={{width: 'calc(97%)', marginLeft: 'calc(3%)'}}>
                        <NoticesTable
                            data={data}
                            getTableProps={getTableProps}
                            getTableBodyProps={getTableBodyProps}
                            headerGroups={headerGroups}
                            rows={rows}
                            prepareRow={prepareRow}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notices;