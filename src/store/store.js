import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root", // we want to persist the whole thing; start from the root level
  storage,
  whitelist: ["user", "patientData"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [];

export const store = createStore(
  persistedReducer,
  undefined,
  applyMiddleware(...middleware)
);

export const persistor = persistStore(store);
