// App.jsx
import React from "react";
import { HashRouter } from "react-router-dom";
import "./App.css";
import PageRoutes from "@/router/";
import GlobalStyle from "./style/GlobalStyle.jsx";

function App() {
  return (
    <HashRouter>
      <GlobalStyle />
      <PageRoutes />
    </HashRouter>
  );
}

export default App;
