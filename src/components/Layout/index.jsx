import React from "react";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      {/* 这里是你的固定Header内容 */}
      <Header />

      <main className="content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
