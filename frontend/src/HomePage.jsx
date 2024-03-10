import { BrowserRouter as Router } from "react-router-dom";
import PagesRoutes from "./pagesRoutes";
import React from "react";
import { ToastContainer } from "react-toastify";

export default function HomePage() {
  return (
    <Router>
      <ToastContainer position="top-center" />
      <div>
        <PagesRoutes />
      </div>
    </Router>
  );
}
