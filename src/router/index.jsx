import { Route, Routes } from "react-router-dom";
import React from "react";

import Layout from "../components/Layout/index"; // 請確保路徑正確
import Home from "@/pages/Home/";
import Map from "@/pages/map/";

const PageRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/larry/energy/dist/" element={<Home />} />
      <Route path="/larry/energy/dist/map" element={<Map />} />
    </Route>
  </Routes>
);

export default PageRoutes;
