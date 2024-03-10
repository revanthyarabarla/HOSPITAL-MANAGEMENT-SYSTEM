import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  // USE STATE HOOK
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userType, setUserType] = useState("");
  const [passwordMatchDisplay, setPasswordMatchDisplay] = useState("none");
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      let user = {
        firstName,
        lastName,
        email,
        username,
        password,
        userType,
      };
    
      try {
        // Attach Frontend With Backend Fetching Data using axios
        const response = await axios.post(
          "http://localhost:8080/api/register",
          user
        );
    
        if (response.status === 200) {
          toast.success("User Added");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setUserType("");
          setUsername("");
          navigate("/");
        }
      } catch (error) {
        console.log(error)
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Error response:", error.response.data);
          console.error("Status code:", error.response.status);
    
          // Handle specific error messages or display a generic error
          if (error.response.status === 400) {
            toast.error("Bad Request: " + error.response.data.message);
            // You can handle specific error messages here, e.g.,
            // if (error.response.data.errors.includes("Last name is invalid")) {
            //   // Handle the specific error
            // }
          } else {
            toast.error("An error occurred while processing your request");
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
          toast.error("No response received from the server");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error:", error.message);
          toast.error("An unexpected error occurred");
        }
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
    <div id={styles.signUpBody}>
      <div id={styles.signUpBG}>
        <div className={styles.greenLayer}></div>
      </div>
      <div>
        <h2>Create An Account</h2>
        <form className={styles.signUpform} onSubmit={handleSubmit}>
          <div className="d-flex flex-column flex-lg-row flex-sm-column mt-5">
            <div className="col-12 col-sm-12 col-lg-6  form-floating mx-2 ">
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-control"
                placeholder="first name"
                value={firstName}
                required
                onChange={(event) => setFirstName(event.target.value)}
              />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="col-12  col-sm-12 col-lg-6  mt-3 mt-sm-3 mt-lg-0 form-floating mx-2">
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control"
                placeholder="last name"
                value={lastName}
                required
                onChange={(event) => setLastName(event.target.value)}
              />
              <label htmlFor="lastName">Last Name</label>
            </div>
          </div>

          <div className="form-floating mt-3 col-12 mx-2">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="form-control"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="col-12 col-sm-12 col-lg-6  form-floating mx-2 ">
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              placeholder="username"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-floating mt-3 col-12 mx-2">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="form-control"
              required
              placeholder="password"
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="mx-2 text-danger"> {passwordValidationMessage}</div>

          <div className="form-floating mt-3 col-12 mx-2">
            <select
              id="userType"
              name="userType"
              value={userType}
              onChange={(event) => setUserType(event.target.value)}
              className="form-select"
              required
            >
              <option value=""></option>
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="Admin">Admin</option>
            </select>
            <label htmlFor="userType">User Type</label>
          </div>

          <div className="form-group form-check mt-5 mx-2">
            <input
              type="checkbox"
              className="form-check-input"
              id="terms-chkbox"
              required
            />
            <label className="" htmlFor="terms-chkbox">
              I agree with the terms and conditons
            </label>
          </div>
          <div className="text-center">
            <button id={styles.signUpBtn} type="submit">
              Sign Up
            </button>
          </div>
          <div className="text-center">
            Already have an account?{" "}
            <NavLink to="/login" exact>
              Sign In
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
