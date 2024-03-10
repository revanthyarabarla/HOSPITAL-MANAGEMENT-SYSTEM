import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import UserTable from "../../../MUITable/UserTable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserList() {
  const params = new URLSearchParams(window.location.search);
  const role = params.get("role");
  const name = params.get("name");
  const [users, setUser] = useState([]);
  const [searchrole, setRole] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:8080/api/users", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: {
        role: role,
        name: name,
      },
    });
    setUser(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("User deleted successfully");
      getUsers();
    } catch (error) {
      toast.error("Error deleting user", error);
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 10, p: 10 }}>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-sm-4 col-3">
              <h4 className="page-title">User</h4>
            </div>
            <div className=" col-sm-8 col-9 text-right m-b-20">
              <Link
                to="/users/add"
                className="btn btn-primary float-right btn-rounded"
              >
                <i className="fa fa-plus"></i> Add User
              </Link>
            </div>
          </div>
          <form action="/users" name="userFilter">
            <div className="row filter-row pb-4">
              <div className="col-sm-4 col-md-4">
                <div className="form-floating ">
                  <input
                    name="name"
                    type="text"
                    id="empNameSearch"
                    className="form-control"
                    placeholder="Name"
                  />
                  <label htmlFor="empNameSearch">User Name</label>
                </div>
              </div>
              <div className="col-sm-4 col-md-4">
                <div className="form-floating">
                  <select name="role" className="form-select floating">
                    <option value="">All</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Admin">Admin</option>
                    <option value="Patient">Patient</option>
                  </select>
                  <label htmlFor="role" className="focus-label">
                    Role
                  </label>
                </div>
              </div>
              <div className="col-sm-4 col-md-4">
                <button type="submit" className="btn btn-primary btn-block">
                  {" "}
                  Search{" "}
                </button>
              </div>
            </div>
          </form>
          <UserTable userList={users} deleteUser={deleteUser} />
        </div>
      </div>
    </Box>
  );
}

export default UserList;
