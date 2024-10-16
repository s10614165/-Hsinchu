import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useLocation } from "react-router-dom";

import Banner from "./banner.jsx";
import ButtonArea from "./buttonarea.jsx";
import banner_desk from "@/assets/banner_desk.png";
import banner_mobile from "@/assets/banner_mobile.png";

const StyledContainer = styled.div`
  /* background-color: red; */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  background-image: url(${banner_desk});
  background-repeat: no-repeat;
  @media (max-width: 768px) {
    /* background-color: blue; */
    justify-content: center;
  }

  @media (max-width: 480px) {
    background: url(${banner_mobile}) top/contain no-repeat;
  }
`;

const Home = () => {
  return (
    <StyledContainer>
      {/* <Banner /> */}
      <ButtonArea />
    </StyledContainer>
  );
};

export default Home;
