import { PATIENT_DATA_ACTION_TYPES } from "./patient-data.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setPatientData = (patientData) =>
  createAction(PATIENT_DATA_ACTION_TYPES.SET_PATIENT_DATA, patientData);
