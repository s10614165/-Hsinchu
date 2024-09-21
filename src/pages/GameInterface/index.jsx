import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import RankList from "./RankList.jsx";
import titleImg from "@/assets/Title.png";
import startContext from "@/assets/startContext.png";
import startTime from "@/assets/startTime.png";
import gameStartImage from "@/assets/gameStart.png";
import gameEndImage from "@/assets/gameEnd.png";
import inputImg from "@/assets/Input.png";
import exclude from "@/assets/Exclude.png";
import calculateTimeDifference from "@/Util/calculateTimeDifference.js";
import parseTimeDifference from "@/Util/parseTimeDifferen";
import useAddToGoogleSheet from "@/customHooks/useAddToGoogleSheet.jsx";
import timeToMilliseconds from "@/Util/timeToMilliseconds.js";

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
  flex-grow: 1;
  width: 100%;
  max-height: calc(75vh - 20px);
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

const ROUTER_TIMER_NAME = {
  sun: { start: "sunStartTime", end: "sunEndTime" },
  water: { start: "waterStartTime", end: "waterEndTime" },
  wind: { start: "windStartTime", end: "windEndTime" },
  energy: { start: "energyStartTime", end: "energyEndTime" },
};

const GAME_STAGE_SHOW_STATES = {
  start: {
    logo: true,
    titleContextImage: true,
    timeZone: false,
    input: true,
    button: true,
    name: false,
    rank: false,
  },
  enterName: {
    logo: true,
    titleContextImage: true,
    timeZone: true,
    input: false,
    button: false,
    name: true,
    rank: false,
  },
  processing: {
    logo: true,
    titleContextImage: false,
    timeZone: true,
    input: false,
    button: false,
    name: true,
    rank: false,
  },
  end: {
    logo: true,
    titleContextImage: false,
    timeZone: true,
    input: false,
    button: true,
    name: true,
  },
  nextRouter: {
    logo: true,
    titleContextImage: true,
    timeZone: false,
    input: false,
    button: true,
    name: true,
    rank: false,
  },
  rank: {
    logo: true,
    titleContextImage: false,
    timeZone: false,
    input: false,
    button: true,
    name: false,
    rank: true,
  },
};

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
  const [name, setName] = useState("");
  const [timeDiff, setTimeDiff] = useState("00:00:00");
  const [isShow, setIsShow] = useState(GAME_STAGE_SHOW_STATES.start);
  const { addData, loading, error } = useAddToGoogleSheet();

  const handleStartGame = () => {
    if (
      cookies[ROUTER_TIMER_NAME[route].start] !== undefined &&
      cookies[ROUTER_TIMER_NAME[route].end] !== undefined
    ) {
      console.log(timeToMilliseconds(timeDiff));
      // addData({
      //   UUID: cookies.UUID,
      //   name: cookies.name,
      //   route: route,
      //   time:timeToMilliseconds( timeDiff),
      // });
      // setIsShow(GAME_STAGE_SHOW_STATES.rank);
      return;
    }
    if (cookies.name !== undefined) {
      setCookie(ROUTER_TIMER_NAME[route].start, new Date().toISOString(), {
        path: "/",
      });
      setIsShow(GAME_STAGE_SHOW_STATES.enterName);
      return;
    }

    if (name.trim() === "") {
      setName("請輸入暱稱");
    } else {
      setCookie("name", name, { path: "/" });
      setCookie("UUID", uuidv4(), { path: "/" });
      setCookie(ROUTER_TIMER_NAME[route].start, new Date().toISOString(), {
        path: "/",
      });
      setIsShow(GAME_STAGE_SHOW_STATES.enterName);
    }
  };

  useEffect(() => {
    if (gameStage === "start" && cookies.name !== undefined) {
      if (cookies[ROUTER_TIMER_NAME[route]?.start] === undefined) {
        setIsShow(GAME_STAGE_SHOW_STATES.nextRouter);
        return;
      }
      setIsShow(GAME_STAGE_SHOW_STATES.enterName);
    } else if (gameStage === "end" && cookies.name !== undefined) {
      setIsShow(GAME_STAGE_SHOW_STATES.end);
    } else if (gameStage === "processing" && cookies.name !== undefined) {
      setIsShow(GAME_STAGE_SHOW_STATES.processing);
    } else if (gameStage === "end" && cookies.name === undefined) {
      setIsShow(GAME_STAGE_SHOW_STATES.start);
    }
  }, [gameStage, cookies.name, route]);

  useEffect(() => {
    const startTime = cookies[ROUTER_TIMER_NAME[route]?.start];
    const endTime = cookies[ROUTER_TIMER_NAME[route]?.end];

    if (endTime !== undefined && startTime !== undefined) {
      setTimeDiff(calculateTimeDifference(startTime, endTime));

      return;
    }
    if (gameStage === "end" && endTime === undefined) {
      const now = new Date().toISOString();
      setCookie(ROUTER_TIMER_NAME[route].end, now, { path: "/" });
      setTimeDiff(calculateTimeDifference(startTime, now));
      // setIsShow(GAME_STAGE_SHOW_STATES.end);
    } else if (
      startTime !== undefined &&
      endTime === undefined &&
      (gameStage === "start" || gameStage === "processing")
    ) {
      const updateTimer = () => {
        const now = new Date().toISOString();
        setTimeDiff(calculateTimeDifference(startTime, now));
      };

      setIsShow(
        gameStage === "start"
          ? GAME_STAGE_SHOW_STATES.enterName
          : GAME_STAGE_SHOW_STATES.processing
      );

      updateTimer();
      const timerId = setInterval(updateTimer, 1000);
      return () => clearInterval(timerId);
    }
  }, [cookies, route, gameStage]);
  console.log(loading, error);
  return (
    <Container>
      <Header>
        {isShow.logo && (
          <Logo>
            <LogoImage src={titleImg} alt="源大覺醒" />
          </Logo>
        )}
      </Header>
      <Main>
        {isShow.titleContextImage && (
          <CharacterImage>
            <CharacterImageStyle
              src={
                cookies[ROUTER_TIMER_NAME[route]?.start] !== undefined
                  ? startTime
                  : startContext
              }
              alt="在開始任務前，要跟你說明一下，有很多組入馬一起行動，在越短的時間完成任務就能被排在任務排行榜的前20名喔！試著用最短的時間來完成任務吧！"
            />
          </CharacterImage>
        )}

        {isShow.input && (
          <InputArea>
            <StyledInput
              value={name}
              onFocus={() => setName("")}
              onChange={(e) => setName(e.target.value)}
              placeholder="輸入您的暱稱"
            />
          </InputArea>
        )}

        {isShow.name && (
          <StyledName gameStage={gameStage}>{cookies.name}</StyledName>
        )}

        {isShow.timeZone && (
          <TimeExclude>
            <TimeExcludeImageStyle src={exclude} />
            <TimeDisplayWrapper>
              <TimeZone>{timeDiff}</TimeZone>
              <TimeZoneText>{"你的遊玩時間"}</TimeZoneText>
            </TimeDisplayWrapper>
          </TimeExclude>
        )}
        {isShow.rank && <RankList name={cookies.name} time={timeDiff} />}

        {isShow.button && (
          <StartButton>
            <CustomButton gameStage={gameStage} onClick={handleStartGame} />
          </StartButton>
        )}
      </Main>
    </Container>
  );
};

export default GameInterface;
