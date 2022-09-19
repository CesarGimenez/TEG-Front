import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "../pages/home/Home";

export const Navigation = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};
