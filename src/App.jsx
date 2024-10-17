// App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import PageRoutes from "@/router/";
import { useCookies } from "react-cookie";

function App() {
  return (
    <BrowserRouter basename="/chutaxdalp">
      <PageRoutes />
    </BrowserRouter>
  );
}

export default App;
