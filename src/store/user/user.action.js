import { USER_ACTION_TYPES } from "./user.types";
import { createAction } from "../../utils/reducer/reducer.utils";

// action generator to store the current user in redux state
export const setCurrentUser = (currentUser) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, currentUser);
