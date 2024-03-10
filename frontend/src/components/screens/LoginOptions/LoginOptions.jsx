import React from "react";
import LoginOptionImage from "../../../assets/images/login-options-left.svg";
import Button from "../../Global/components/Button/Button";
import { Link } from "react-router-dom";
import "./LoginOption.css";

const LoginOptions = () => {
  return (
    <div className="optioncontainer">
      <div className="left">
        <img src={LoginOptionImage} alt={"Left"} />
      </div>
      <div className="right">
        <h2 className="supertitle">Choose suitable Account option</h2>
        <div className="login-register-container">
          <div className="title">Admin Account </div>
          <Link to="/user_register">
            <Button className="noradiusbutton" outlined>
              Register As Admin
            </Button>
          </Link>

          <Link to="/user_login">
            <Button className="noradiusbutton" outlined>
              Login as Admin{" "}
            </Button>
          </Link>
        </div>
        <div className="login-register-container">
          <div className="title">Hospital Account</div>
          <Link to="/hospital_login">
            <Button className="noradiusbutton" outlined>
              Hospital Login{" "}
            </Button>
          </Link>
          <Link to="/doctor_login">
            <Button className="noradiusbutton" outlined>
              Login As Doctor
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginOptions;
