// Layout.jsx
import React from "react";
import styled from "styled-components";
import { useLocation, Outlet } from "react-router-dom";
import landing_bg from "@/assets/landing_bg.png";
import map_bg_desktop from "@/assets/map_bg_desktop.png";

import Header from "./Header";
import Footer from "./Footer";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-size: cover;
  background-position: center;
`;

const Content = styled.main`
  flex: 1;
  overflow-y: auto;
  /* padding: 0rem 1rem; */
  box-sizing: border-box;
  position: relative; // 添加相對定位
`;

const Layout = () => {
  const location = useLocation();

  const getBackgroundImage = () => {
    return location.pathname === "/chutaxdalp/map"
      ? map_bg_desktop
      : landing_bg;
  };

  return (
    <LayoutWrapper backgroundImage={getBackgroundImage()}>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
