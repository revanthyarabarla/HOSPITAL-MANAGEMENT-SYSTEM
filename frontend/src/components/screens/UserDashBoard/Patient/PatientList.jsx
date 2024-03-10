import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PatientTable from "../../../MUITable/PatientTable";

function PatientList() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  const [patients, setPatient] = useState([]);

  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = async () => {
    const response = await axios.get("http://localhost:8080/api/patients", {
      params: {
        name: name,
      },
    });
    setPatient(response.data);
  };

  const deletePatient = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/patients/${id}`
      );

      if (response.status === 200) {
        toast.success("Patient deleted successfully");
      }
      getPatients();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 11 }}>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-sm-4 col-3">
              <h4 className="page-title">Patient</h4>
            </div>
            <div className="col-sm-8 col-9 text-right mb-2">
              <Link
                to="/patients/add"
                className="btn btn-primary float-right btn-rounded"
              >
                <i className="fa fa-plus"></i> Add Patient
              </Link>
            </div>
          </div>
          <form action="/patients" name="userFilter">
            <div className="row filter-row">
              <div className="col-sm-4 col-md-4">
                <div className="form-floating">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Patient Name"
                  />
                  <label className="focus-label">Patient Name</label>
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
          <PatientTable patientList={patients} deletePatient={deletePatient} />
        </div>
      </div>
    </Box>
  );
}

export default PatientList;
