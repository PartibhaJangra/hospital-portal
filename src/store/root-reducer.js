import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { patientDataReducer } from "./patient-data/patient-data.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  patientData: patientDataReducer,
});
