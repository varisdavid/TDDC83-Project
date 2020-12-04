import serverInfoTypes from "./serverInfo.types";


export const setAdress = (adress) => {
  return {
    type: serverInfoTypes.SET_ADRESS,
    payload: adress
  };
};

export const  setCurrentEhr = (ehr) => {
  return {
    type: serverInfoTypes.SET_CURRENT_EHR,
    payload: ehr
  };
};
