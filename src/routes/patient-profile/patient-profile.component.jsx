import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getCurrentUser } from "../../store/user/user.selector";
import { setPatientData } from "../../store/patient-data/patient-data.action";
import { getPatientData } from "../../store/patient-data/patient-data.selector";

import "./patient-profile.styles.css";

const defaultFormFields = {
  password: "",
  newPassword: "",
  reEnterPassword: "",
};

const PatientProfile = () => {
  const location = useLocation();
  const { patientData } = location.state ? location.state : "";
  const patientProfileData = useSelector(getCurrentUser);

  const data = patientData ? patientData : patientProfileData;

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { password, newPassword, reEnterPassword } = formFields;
  const [errorMessage, setErrorMessage] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const patientList = useSelector(getPatientData);
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleChangePasswordBtn = () => setChangePassword(!changePassword);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (data.password === password) {
      if (newPassword === reEnterPassword) {
        patientList.forEach((patient) => {
          if (patient.key === data.key) {
            patient.password = newPassword;
          }
        });
        dispatch(setPatientData([...patientList]));
        alert("Password Updated");
        setChangePassword(false);
      } else {
        return setErrorMessage("Password does not match");
      }
    } else {
      return setErrorMessage("Please enter correct password");
    }
  };

  return (
    <div className="patient-profile-container">
      <table className="patient-profile-table">
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Phone</td>
            <td>Diagnosis</td>
            <td>Prescribed Medication</td>
            <td>Address</td>
            <td>City</td>
            <td>State</td>
            <td>Country</td>
            <td>Pincode</td>
            <td>Email</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.key}</td>
            <td>{data.name}</td>
            <td>{data.phone}</td>
            <td>{data.diagnosis}</td>
            <td>{data.prescribedMedication}</td>
            <td>{data.address}</td>
            <td>{data.city}</td>
            <td>{data.state}</td>
            <td>{data.country}</td>
            <td>{data.pincode}</td>
            <td>{data.email}</td>
          </tr>
        </tbody>
      </table>
      {!patientData && (
        <button
          type="submit"
          onClick={handleChangePasswordBtn}
          className="change-password-btn"
        >
          Change Password
        </button>
      )}
      {changePassword && (
        <div className="form-container">
          <form className="patient-profile-form" onSubmit={onSubmitHandler}>
            <div>
              <label>Enter old password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChangeHandler}
                className="form-control"
              ></input>
            </div>
            <div>
              <label>Enter new password</label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={onChangeHandler}
                className="form-control"
              ></input>
            </div>
            <div>
              <label>Reenter password</label>
              <input
                type="password"
                name="reEnterPassword"
                value={reEnterPassword}
                onChange={onChangeHandler}
                className="form-control"
              ></input>
            </div>
            {errorMessage && <p className="error-msg">{errorMessage}</p>}
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
