import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

const Cancel = () => {
  const [session, setSession] = useState({});
  const location = useNavigate();
  const queryLocation = location.search;
  useEffect(() => {
    async function fetchSession() {
      const products = await fetch(
        "http://localhost:8080/api/paypal/cancel" + queryLocation
      ).then((res) => res.json());
      setSession(products);
    }
    fetchSession();
  }, [queryLocation]);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <div className="page-wrapper">
        <div className="content">
          {session.status === "fail" ? (
            <div className="row filter-row">
              <h1>Your payment was canceled</h1>
              <h4 className="page-title">
                <Link to="/prescriptions">{session.msg}</Link>
              </h4>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Box>
  );
};

export default Cancel;
