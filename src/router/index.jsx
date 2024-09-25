import { Route, Routes } from "react-router-dom";
import React from "react";

import EnterName from "@/pages/GameInterface/";


const PageRoutes = () => (
  <Routes >
    <Route path="/larry/energy/dist/" element={<EnterName />} />
  </Routes>
);

export default PageRoutes;
