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

import Layout from "@/components/Layout/index.jsx";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #000000;
  color: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Header = styled.header`
  text-align: center;
  flex-shrink: 0;
`;

const Logo = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 582.86px;
`;

const LogoImage = styled.img`
  width: 100%;
  height: clamp(0px, calc(100vw * 240 / 582.86), 240px);
  max-width: 582.86px;
  max-height: 240px;
  aspect-ratio: 582.86 / 240;
  display: block;
  object-fit: contain;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
  /* max-height: calc(75vh - 20px); */
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px; // 給定一個固定高度
`;

const CharacterImage = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 844.66px;
  height: clamp(0px, calc(100vw * (345 / 844.66)), 345px);
  display: flex;
  align-items: center;
`;

const CharacterImageStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  aspect-ratio: 844.66 / 345;
`;
const TimeExclude = styled.div`
  position: relative;
  margin-top: 30px;
  width: 100%;
  max-width: 960px;
  aspect-ratio: 960 / 246;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimeExcludeImageStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const TimeDisplayWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
`;

const TimeZone = styled.div`
  font-size: clamp(16px, 6.67vw, 64px);
  color: #53f9ef;
  font-weight: 700;
  margin-bottom: 10px;
`;

const TimeZoneText = styled.div`
  font-weight: 700;

  font-size: clamp(12px, 3.33vw, 32px);
  color: white;
`;

const StartButton = styled.div`
  text-align: center;
  padding: calc(2vh + 10px) 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const CustomButton = styled.button`
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: transparent;
  font-size: 0;

  transition: transform 0.3s ease;
  background-image: ${({ gameStage }) =>
    gameStage === "start" ? `url(${gameStartImage})` : `url(${gameEndImage})`};

  width: clamp(150px, 30vw, 300px);
  height: calc(clamp(150px, 30vw, 300px) * (90 / 300));
  display: ${({ isLoading }) => (isLoading ? "none" : "block")};
  aspect-ratio: 300 / 90;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const InputArea = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const StyledInput = styled.input`
  margin-top: 10px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${({ value }) => (value === "請輸入暱稱" ? "red" : "white")};

  font-size: clamp(16px, 4.67vw, 28px);
  text-align: center;
  transition: transform 0.3s ease;
  background-image: url(${inputImg});

  width: clamp(200px, 100%, 600px);
  height: clamp(30px, 15vw, 90px);

  aspect-ratio: 600 / 90;

  &:active {
    transform: scale(0.95);
  }
`;

const StyledName = styled.div`
  font-size: 50px;
  /* gameStage   */
  color: white;
`;

const COOKIE_NAMES = [
  "name",
  "UUID",
  "windStartTime",
  "windEndTime",
  "sunStartTime",
  "sunEndTime",
  "waterStartTime",
  "waterEndTime",
  "energyStartTime",
  "energyEndTime",
];

const GameInterface = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const route = queryParams.get("route");
  const gameStage = queryParams.get("gameStage");

  const [cookies, setCookie] = useCookies(COOKIE_NAMES);

  const [timeDiff, setTimeDiff] = useState("00:00:00");

  // useEffect(() => {
  //   console.log("in 1 Effect");
  //   if (gameStage === "start" && cookies.name !== undefined) {
  //     if (cookies[ROUTER_TIMER_NAME[route]?.start] === undefined) {
  //       setIsShow(GAME_STAGE_SHOW_STATES.nextRouter);
  //       return;
  //     }
  //     setIsShow(GAME_STAGE_SHOW_STATES.enterName);
  //   } else if (gameStage === "end" && cookies.name !== undefined) {
  //     setIsShow(GAME_STAGE_SHOW_STATES.end);
  //   } else if (gameStage === "processing" && cookies.name !== undefined) {
  //     setIsShow(GAME_STAGE_SHOW_STATES.processing);
  //   } else if (gameStage === "end" && cookies.name === undefined) {
  //     setIsShow(GAME_STAGE_SHOW_STATES.start);
  //   }
  // }, [gameStage, cookies.name, route]);

  // useEffect(() => {
  //   const startTime = cookies[ROUTER_TIMER_NAME[route]?.start];
  //   const endTime = cookies[ROUTER_TIMER_NAME[route]?.end];
  //   console.log("in 2 Effect");
  //   if (endTime !== undefined && startTime !== undefined) {
  //     setTimeDiff(calculateTimeDifference(startTime, endTime));

  //     return;
  //   }

  //   if (
  //     startTime !== undefined &&
  //     endTime === undefined &&
  //     isShow.rank === false &&
  //     loading === false
  //     // &&
  //     // (gameStage === "start" || gameStage === "processing")
  //   ) {
  //     console.log("inTTTTT");
  //     const updateTimer = () => {
  //       const now = new Date().toISOString();

  //       setTimeDiff(calculateTimeDifference(startTime, now));
  //     };

  //     updateTimer();
  //     const timerId = setInterval(updateTimer, 1000);

  //     if (gameStage === "start") {
  //       setIsShow(GAME_STAGE_SHOW_STATES.enterName);
  //     }
  //     if (gameStage === "processing") {
  //       setIsShow(GAME_STAGE_SHOW_STATES.processing);
  //     }
  //     if (gameStage === "end") {
  //       setIsShow(GAME_STAGE_SHOW_STATES.end);
  //     }

  //     return () => clearInterval(timerId);
  //   }
  // }, [cookies, route, gameStage]);

  return (
    <Layout>
      <div>123</div>
    </Layout>
  );
};

export default GameInterface;
