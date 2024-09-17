import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import PageRoutes from "./router/index";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <PageRoutes />
    </Router>
  );
}

export default App;
