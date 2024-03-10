import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import { UserContext } from "../../../Context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminProfile() {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");

  useEffect(() => {
    getAdminById();
  }, []);

  const getAdminById = async () => {
    let adminUserId = currentUser.userId;
    const response = await axios.get(
      `http://localhost:8080/api/profile/admin/${adminUserId}`
    );

    setUserId(response.data._id);
    setFirstName(response.data.firstName);
    setLastName(response.data.lastName);
    setEmail(response.data.email);
    setUsername(response.data.username);
    setPassword(response.data.password);
  };

  const updateAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/profile/admin/${userId}`, {
        firstName,
        lastName,
        username,
        email,
        password,
      });
      toast.success("Profile Updated Successfully");

      navigate("/profile");
    } catch (error) {
      toast.error(error);
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
                <h3 className="page-title">Update Profile</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <form
                  id="addAdminForm"
                  name="addAdminForm"
                  onSubmit={updateAdmin}
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
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="m-t-20 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary submit-btn"
                    >
                      Update Profile
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

export default AdminProfile;
