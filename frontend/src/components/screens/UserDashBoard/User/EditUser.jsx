import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditUser() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:8080/api/users/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setFirstName(response.data.firstName);
    setLastName(response.data.lastName);
    setEmail(response.data.email);
    setUsername(response.data.username);
    setPassword(response.data.password);
    setUserType(response.data.userType);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      // Update User using Axios
      await axios.put(
        `http://localhost:8080/api/users/${id}`,
        {
          firstName,
          lastName,
          username,
          email,
          password,
          userType,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("User Updated Successfully");
      navigate("/users");
    } catch (errors) {
      toast.error(errors);
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
      <div class="page-wrapper">
        <div className="content">
          <div class="card-box">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <h3 className="page-title">Edit User</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <form id="addUserForm" name="addUserForm" onSubmit={updateUser}>
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
                          required
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
                          required
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
                          required
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
                          required
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
                          required
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Role</label>
                        <select
                          name="userType"
                          className="form-select"
                          value={userType}
                          onChange={(event) => setUserType(event.target.value)}
                        >
                          <option value="Admin">Admin</option>
                          <option value="Doctor">Doctor</option>
                          <option value="Patient">Patient</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="m-t-20 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary submit-btn"
                    >
                      Update User
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

export default EditUser;
