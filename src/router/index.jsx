import { Route, Routes } from "react-router-dom";
import React from "react";

import Layout from "../components/Layout/index"; // 請確保路徑正確
import Home from "@/pages/Home/";
import Map from "@/pages/map/";
import Theater from "@/pages/game/theater.jsx";
import Museum from "@/pages/game/museum.jsx";

const PageRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/larry/energy/dist/" element={<Home />} />
      <Route path="/larry/energy/dist/map" element={<Map />} />
      <Route path="/larry/energy/dist/theater" element={<Theater />} />
      <Route path="/larry/energy/dist/museum" element={<Museum />} />
    </Route>
  </Routes>
);

export default PageRoutes;
