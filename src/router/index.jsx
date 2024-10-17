import { Route, Routes } from "react-router-dom";
import React from "react";

import Layout from "../components/Layout/index"; // 請確保路徑正確
import Home from "@/pages/Home/";
import Map from "@/pages/map/";
import Theater from "@/pages/game/theater.jsx";
import Museum from "@/pages/game/museum.jsx";
import EventBoard from "@/pages/eventBoard/";

const PageRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map />} />
      <Route path="/theater" element={<Theater />} />
      <Route path="/museum" element={<Museum />} />
      <Route path="/eventBoard" element={<EventBoard />} />
    </Route>
  </Routes>
);

export default PageRoutes;
