import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Banner from "./banner.jsx";
import ButtonArea from "./buttonarea.jsx";
import banner_desk from "@/assets/banner_desk.png";
import banner_mobile from "@/assets/banner_mobile.png";

const StyledContainer = styled.div`
  /* background-color: red; */
  height: 100%;
  display: flex;
  flex-direction: column;
  background-size: 95%;
  background-position: top;
  /* justify-content: end; */
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
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const link = queryParams.get("Link");
  useEffect(() => {
    if (link) {
      switch (link) {
        case "map":
          navigate("/map");
          break;
        case "museum":
          navigate("/museum");
          break;
        case "theater":
          navigate("/theater");
          break;
        case "amusementPark":
          window.location.href =
            "https://hchg-vtuber.url.tw/chutaxdalp/amusementPark/";
          break;
        default:
          // console.log("未知的Link參數");
          break;
      }
    } else {
      // console.log("無Link參數");
    }
  }, [link, navigate]);

  return (
    <StyledContainer>
      {/* <Banner /> */}
      <ButtonArea />
    </StyledContainer>
  );
};

export default Home;
