import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";

import EnterName from "@/pages/GameInterface/";

const PageRoutes = () => (
  <Routes>
    <Route path="/" element={<EnterName />} />
    <Route path="/sun" element={<EnterName name="太陽" />} />
    <Route path="/water" element={<EnterName name="水" />} />
    <Route path="/wind" element={<EnterName name="風" />} />
    <Route path="/energy" element={<EnterName name="能源" />} />
  </Routes>
);

export default PageRoutes;
