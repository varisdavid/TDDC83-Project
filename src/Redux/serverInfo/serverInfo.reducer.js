import serverInfoTypes from "./serverInfo.types";

const initialState = {
  adress: "http://127.0.0.1:5000", 
  current_ehr: "", 
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case serverInfoTypes.SET_ADRESS:
      return {
        ...state,
        adress: action.payload
      }
    case serverInfoTypes.SET_CURRENT_EHR: 
      {
        return{
          ...state,
          current_ehr : action.payload
        }
      }
    default:
      return state;
  }
};

export default postReducer;
