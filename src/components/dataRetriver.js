import axios from "axios";

const ref = "http://127.0.0.1:5000";

//Temporary function for modifying the 'Time: ' variable.
//Increaments the time buy 1:N days where N is length of the array
const addDays = (data) => {
  for (var i = 0; i < data.length; i++) {
    var tomorrow = new Date(`${data[i]["Time: "]}`);
    tomorrow.setDate(tomorrow.getDate() + i);
    data[i]["Time: "] = tomorrow.toJSON().slice(0, 10);
  }
  return data;
};

//This function fetches measurement data for one patient
// - Expected input  : string ehrID, example of valid id: ("c784e009-c51b-437c-9c8d-a4a87dc18a72")
// - Expected output : list with json objects, containing measurements
export const FetchMeasurements = (ehrId) => {
  return axios
    .get(`${ref}/measurements/${ehrId}`)
    .then(({ data }) => {
      data = addDays(data);
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

//This function fetches the medication list for one patient
// - Expected input  : string ehrID, example of valid id: ("c784e009-c51b-437c-9c8d-a4a87dc18a72")
// - Expected output : list with json objects, containing medication information
export const FetchMedicationList = (ehrId) => {
  return axios
    .get(`${ref}/medication_list/${ehrId}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

//This function fetches the diagnosis for one patient
// - Expected input  : string ehrID, example of valid id: ("c784e009-c51b-437c-9c8d-a4a87dc18a72")
// - Expected output : list with json objects, containing diagnosis information
export const FetchDiagnosis = (ehrId) => {
  return axios
    .get(`${ref}/diagnosis/${ehrId}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

//This function fetches information about all the departments
// - Expected input  : none
// - Expected output : list
export const FetchAllDepartments = () => {
  return axios
    .get(`${ref}/department/all`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

//This function fetches information about one department
// - Expected input  : string departmentID
// - Expected output : list
export const FetchDepartment = (departmentID) => {
  return axios
    .get(`${ref}/department/${departmentID}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

//This function fetches information about all the employess
// - Expected input  : none
// - Expected output : list
export const FetchAllEmployees = () => {
  return axios
    .get(`${ref}/employee/all`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

//This function fetches information about one employee
// - Expected input  : string employeeID
// - Expected output : list
export const FetchEmployee = (employeeID) => {
  return axios
    .get(`${ref}/employee/${employeeID}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

//This function fetches information about all employees
// - Expected input  : none
// - Expected output : list
export const FetchAllHospitals = () => {
  return axios
    .get(`${ref}/hospital/all`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

//This function fetches information about one hospital
// - Expected input  : string hospitalID
// - Expected output : list
export const FetchHospital = (hospitalID) => {
  return axios
    .get(`${ref}/hospital/${hospitalID}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

//This function fetches information about all teams
// - Expected input  : none
// - Expected output : list
export const FetchAllTeams = () => {
  return axios
    .get(`${ref}/team/all`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

//This function fetches information about one team
// - Expected input  : string teamID
// - Expected output : list
export const FetchTeam = (teamID) => {
  return axios
    .get(`${ref}/team/${teamID}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

//This function fetches information about all patients
// - Expected input  : none
// - Expected output : list
export const FetchAllPatients = () => {
  return axios
    .get(`${ref}/patients/all`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};
