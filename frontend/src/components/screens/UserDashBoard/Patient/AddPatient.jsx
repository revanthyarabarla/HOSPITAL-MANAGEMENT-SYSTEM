import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function AddPatient() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDOB] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");

  const addPatient = async (event) => {
    event.preventDefault();

    const form = document.forms.addPatientForm;
    const patient = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      username: form.username.value,
      email: form.email.value,
      phone: form.phone.value,
      password: form.password.value,
      address: form.address.value,
      gender: form.gender.value,
      dob: form.dob.value,
    };
    // Attach Frontend with Backend Using axios method -Add Patient
    try {
      const response = await fetch("http://localhost:8080/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Error:", errorData);
        return;
      }

      const data = await response.json();

      if (data.message === "success") {
        toast.success("Patient Added Successfully");
        navigate("/patients");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (password.length > 0 && password?.trim()?.length <= 6) {
      setPasswordValidationMessage(
        "Password Length must be greater than 6 characters"
      );
    } else {
      setPasswordValidationMessage("");
    }
  }, [password]);

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div className="page-wrapper">
        <div className="content">
          <div className="card-box">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <h4 className="page-title">Add Patient</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <form
                  id="addPatientForm"
                  name="addPatientForm"
                  onSubmit={addPatient}
                >
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          First Name <span className="text-danger">*</span>
                        </label>
                        <input
                          name="firstName"
                          className="form-control"
                          type="text"
                          value={firstName}
                          onChange={(event) => setFirstName(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          name="lastName"
                          className="form-control"
                          type="text"
                          value={lastName}
                          onChange={(event) => setLastName(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Username <span className="text-danger">*</span>
                        </label>
                        <input
                          name="username"
                          className="form-control"
                          type="text"
                          value={username}
                          onChange={(event) => setUsername(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          name="email"
                          className="form-control"
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          name="password"
                          className="form-control"
                          type="password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Phone </label>
                        <input
                          name="phone"
                          className="form-control"
                          type="text"
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Address </label>
                        <input
                          name="address"
                          className="form-control"
                          type="text"
                          value={address}
                          onChange={(event) => setAddress(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Gender</label>
                        <select
                          name="gender"
                          className="form-select"
                          value={gender}
                          onChange={(event) => setGender(event.target.value)}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Date of Birth </label>
                        <input
                          name="dob"
                          className="form-control"
                          type="date"
                          value={dob}
                          onChange={(event) => setDOB(event.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="m-t-20 text-center">
                    <button
                      id="addPatient"
                      type="submit"
                      className="btn btn-primary submit-btn"
                    >
                      Create Patient
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default AddPatient;
