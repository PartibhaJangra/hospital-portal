import { PATIENT_DATA_ACTION_TYPES } from "./patient-data.types";

const INITIAL_STATE = {
  patientData: [],
};

export const patientDataReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case PATIENT_DATA_ACTION_TYPES.SET_PATIENT_DATA:
      return {
        ...state,
        patientData: payload,
      };
    default:
      return state;
  }
};
