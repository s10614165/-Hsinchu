import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./App.css";
import PageRoutes from "@/router/";
function App() {
  return (
    <Router>
      <PageRoutes />
    </Router>
  );
}

export default App;
