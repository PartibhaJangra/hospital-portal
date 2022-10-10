import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./App.css";
import LoginForm from "./routes/login-form/login-form.component";
import Navigation from "./routes/navigation/navigation.component";
import PatientList from "./routes/patient-list/patient-list.component";
import PatientProfile from "./routes/patient-profile/patient-profile.component";
import { setPatientData } from "./store/patient-data/patient-data.action";
import { useEffect } from "react";
import { patientList } from "./data/patient-list";

function App() {
  const dispatch = useDispatch();

  // load patient data in redux as soon as the app mounts
  useEffect(() => {
    dispatch(setPatientData(patientList));
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/patient-list" element={<PatientList />} />
          <Route path="/patient-profile" element={<PatientProfile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
