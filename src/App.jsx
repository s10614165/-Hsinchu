import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import PageRoutes from "@/router/";

import { useCookies } from "react-cookie";
function App() {
  return (
    <Router>
      <PageRoutes />
    </Router>
  );
}

export default App;
