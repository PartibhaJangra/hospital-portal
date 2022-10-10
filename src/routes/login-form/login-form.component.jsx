import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { doctorData } from "../../data/doctor-data";
import { setCurrentUser } from "../../store/user/user.action";
import { getPatientData } from "../../store/patient-data/patient-data.selector";

import "./login-form.styles.css";

const defaultFormFields = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [selectedType, setSelectedType] = useState("");
  const patientData = useSelector(getPatientData);
  const { email, password } = formFields;
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleInputSelect = (e) => {
    setSelectedType(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const dataSet = selectedType === "doctor" ? doctorData : patientData;
    const user = dataSet.find(
      (data) => data.email === email && data.password === password
    );
    if (!user) {
      return setErrorMessage("User not found");
    }
    dispatch(setCurrentUser(user));
    if (selectedType === "doctor") {
      navigate("/patient-list");
    } else {
      navigate("/patient-profile");
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={handleFormSubmit}>
        <h1> Login Form </h1>
        <div className="form-input">
          <label>Email id</label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-input">
          <label>Password</label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <select
          value={selectedType}
          onChange={handleInputSelect}
          className="form-control"
        >
          <option defaultValue>Select Type</option>
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
        </select>
        {errorMessage && <p className="error-msg">{errorMessage}</p>}
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
