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
// - Expected input  : string ehrID
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
// - Expected input  : string ehrID
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
