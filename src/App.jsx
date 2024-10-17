// App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import PageRoutes from "@/router/";
import GlobalStyle from "./style/GlobalStyle.jsx";

function App() {
  return (
    <BrowserRouter basename="/chutaxdalp">
      <GlobalStyle />
      <PageRoutes />
    </BrowserRouter>
  );
}

export default App;
