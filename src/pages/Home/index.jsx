import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import RankList from "./RankList.jsx";
import titleImg from "@/assets/Title.png";
import startContext from "@/assets/startContext.png";
import startTime from "@/assets/startTime.png";
import gameEndImage from "@/assets/gameEnd.png";
import inputImg from "@/assets/Input.png";
import exclude from "@/assets/Exclude.png";
import calculateTimeDifference from "@/Util/calculateTimeDifference.js";
import Banner from "./banner.jsx";
import ButtonArea from "./buttonarea.jsx";

const StyledContainer = styled.div`
  /* background-color: red; */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;

  @media (max-width: 768px) {
    /* background-color: blue; */
    justify-content: center;
  }

  @media (max-width: 480px) {
    /* background-color: green; */
    justify-content: end;
  }
`;

const Home = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const route = queryParams.get("route");
  const gameStage = queryParams.get("gameStage");

  return (
    <StyledContainer>
      <Banner />
      <ButtonArea />
    </StyledContainer>
  );
};

export default Home;
