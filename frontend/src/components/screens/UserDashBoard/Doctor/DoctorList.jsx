import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import DoctorTable from "../../../MUITable/DoctorTable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DoctorList() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  const [doctors, setdoctor] = useState([]);

  useEffect(() => {
    getdoctors();
  }, []);

  const getdoctors = async () => {
    const response = await axios.get("http://localhost:8080/api/doctors", {
      params: {
        name: name,
      },
    });
    setdoctor(response.data);
  };

  const deleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/doctors/${id}`);
      toast.success("Doctor Deleted Successfully");

      getdoctors();
    } catch (error) {
      toast.error("error:", error);
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 5, p: 11 }}>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-sm-4 col-3">
              <h4 className="page-title">Doctor</h4>
            </div>
            <div className="col-sm-8 col-9 text-right mb-2">
              <Link
                to="/doctors/add"
                className="btn btn-primary float-right btn-rounded"
              >
                <i className="fa fa-plus"></i> Add Doctor
              </Link>
            </div>
          </div>
          <form action="/doctors" name="userFilter">
            <div className="row filter-row">
              <div className="col-sm-4 col-md-4">
                <div className="form-floating ">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Doctor Name"
                  />
                  <label className="focus-label">Doctor Name</label>
                </div>
              </div>

              <div className="col-sm-4 col-md-4 mb-2">
                <button type="submit" className="btn btn-primary btn-block">
                  {" "}
                  Search{" "}
                </button>
              </div>
            </div>
          </form>
          <DoctorTable doctorList={doctors} deleteDoctor={deleteDoctor} />
        </div>
      </div>
    </Box>
  );
}

export default DoctorList;
