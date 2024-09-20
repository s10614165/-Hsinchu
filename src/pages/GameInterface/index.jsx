import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import titleImg from "@/assets/Title.png";
import startContext from "@/assets/startContext.png";
import startTime from "@/assets/startTime.png";
import gameStartImage from "@/assets/gameStart.png";
import gameEndImage from "@/assets/gameEnd.png";
import inputImg from "@/assets/Input.png";
import exclude from "@/assets/Exclude.png";
import calculateTimeDifference from "@/Util/calculateTimeDifference.js";
import parseTimeDifference from "@/Util/parseTimeDifferen";

const Container = styled.div`
  width: clamp(100vw, 100vw, 100%);
  height: clamp(100vh, 100vh, 100%);
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
`;

const LogoImage = styled.img`
  max-width: 100%;
  aspect-ratio: 2.54/1;
  display: block;
  height: auto;
  object-fit: contain;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  height: calc(80vh - 20px);
`;

const CharacterImage = styled.div`
  margin: 0 auto;
  width: calc(100%);
  max-height: calc(60vh - 40px);
  display: flex;
  align-items: center;
`;
const TimeExclude = styled.div`
  position: relative;
  margin-top: 30px;
  width: calc(100%);
  max-height: calc(60vh - 40px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimeExcludeImageStyle = styled.img`
  width: 37%;
  height: 100%;
  object-fit: contain;
`;
const CharacterImageStyle = styled.img`
  aspect-ratio: 6/1;
  max-width: 100%;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const StartButton = styled.div`
  text-align: center;
  padding: calc(2vh + 10px) 0;
  width: 100%;
`;

const InputArea = styled.div`
  margin: 0 auto;
  max-width: 500px;
  width: 300px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
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
  background-image: ${({ route }) =>
    route === "start" ? `url(${gameStartImage})` : `url(${gameEndImage})`};
  width: clamp(200px, 20vw, 300px);
  height: clamp(30px, 6vw, 90px);
  max-width: 300px;
  max-height: 90px;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;
const StyledInput = styled.input`
  margin-top: 10px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${({ value }) => (value === "請輸入暱稱" ? "red" : "white")};

  font-size: 28px;
  text-align: center;
  transition: transform 0.3s ease;
  background-image: url(${inputImg});
  width: clamp(200px, 100%, 500px);
  height: 60px;
  max-height: 90px;

  &:active {
    transform: scale(0.95);
  }
`;

const StyledName = styled.div`
  font-size: 50px;
  /* gameStage   */
  color: white;
`;

const TimeZone = styled.div`
  font-size: clamp(2rem, 3.5vw, 64px);
  font-weight: "700";
  color: #53f9ef;
`;
const TimeZoneText = styled.div`
  font-size: clamp(1rem, 1.7vw, 32px);
  font-weight: "700";
`;

const routerTimerName = {
  sun: { start: "sunStartTime", end: "sunEndTime" },
  water: { start: "waterStartTime", end: "waterEndTime" },
  wind: { start: "windStartTime", end: "windEndTime" },
  energy: { start: "energyStartTime", end: "energyEndTime" },
};

const gameStageShowStates = {
  start: {
    titleContextImage: true,
    timeZone: false,
    input: true,
    button: true,
    name: false,
  },
  enterName: {
    titleContextImage: true,
    timeZone: true,
    input: false,
    button: false,
    name: true,
  },
  processing: {
    titleContextImage: false,
    timeZone: true,
    input: false,
    button: false,
    name: true,
  },
  end: {
    titleContextImage: false,
    timeZone: true,
    input: false,
    button: true,
    name: true,
  },
  nextRouter: {
    titleContextImage: true,
    timeZone: false,
    input: false,
    button: true,
    name: true,
  },
};

const GameInterface = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const route = queryParams.get("route");
  const gameStage = queryParams.get("gameStage");
  const [s_cookies, set_s_cookie] = useCookies([
    'name',
    'UUID',
    'windStartTime',
    'windEndTime',
    'sunStartTime',
    'sunEndTime',
    'waterStartTime',
    'waterEndTime',
    'energyStartTime',
    'energyEndTime'
  ]);

  const [s_name, set_s_name] = useState("");
  const [s_timeDiff, set_s_timeDiff] = useState("00:00:00");

  const [s_isShow, set_s_isShow] = useState(gameStageShowStates["start"]);

  const handleStartGame = () => {
    //不同 route進來之後，按下開始按鈕
    if (s_cookies.name !== undefined) {
      console.log("in next router");
      set_s_cookie(routerTimerName[route].start, new Date().toISOString(), {
        path: "/",
      });
      set_s_isShow(gameStageShowStates["enterName"]);
    }

    if (s_name === "請輸入暱稱") {
      return;
    }
    if (s_name.trim() === "") {
      set_s_name("請輸入暱稱");
    } else {
      set_s_cookie("name", s_name, { path: "/" });
      set_s_cookie("UUID", uuidv4(), { path: "/" });
      set_s_cookie(routerTimerName[route].start, new Date().toISOString(), {
        path: "/",
      });
      set_s_isShow(gameStageShowStates["enterName"]);
    }
  };

  useEffect(() => {
    if (gameStage === "start" && s_cookies.name !== undefined) {
      if (s_cookies[routerTimerName[route].start] === undefined) {
        //代表輸入過姓名且挑戰過一個關卡
        // set_s_cookie(routerTimerName[route].start, new Date().toISOString(), {
        //   path: "/",
        // });
        console.log("in change router");
        set_s_isShow(gameStageShowStates["nextRouter"]);
      }
      return;
    }
    if (gameStage === "end" && s_cookies.name !== undefined) {
      set_s_isShow(gameStageShowStates["end"]);
      return;
    }
    if (gameStage === "processing" && s_cookies.name !== undefined) {
      set_s_isShow(gameStageShowStates["processing"]);
      return;
    }
    if (gameStage === "end" && s_cookies.name === undefined) {
      set_s_isShow(gameStageShowStates["start"]);
      return;
    }

    // set_s_cookie(routerTimerName[route].end, new Date(), { path: "/" });
  }, []);

  useEffect(() => {
    const startTime = s_cookies[routerTimerName[route]?.start];
    const endTime = s_cookies[routerTimerName[route]?.end];
    console.log(s_cookies)
    console.log(startTime);
    console.log(endTime)
    console.log(s_isShow);
    console.log(route);
    console.log(gameStage);
    if (gameStage === "end") {
      const now = new Date().toISOString();
      set_s_cookie(routerTimerName[route].end, now, { path: "/" });
      const timeDiff = calculateTimeDifference(startTime, now);
      set_s_timeDiff(timeDiff);
      set_s_isShow(gameStageShowStates["end"]);
    }
    if (
      startTime !== undefined &&
      endTime === undefined &&
      gameStage === "start"
    ) {
      console.log("in");
      const updateTimer = () => {
        const now = new Date().toISOString();
        const timeDiff = calculateTimeDifference(startTime, now);
        set_s_timeDiff(timeDiff);
      };
      set_s_isShow(gameStageShowStates["enterName"]);

      updateTimer(); // Initial update
      const timerId = setInterval(updateTimer, 1000);

      return () => clearInterval(timerId); // Cleanup on unmount
    }
    if (
      startTime !== undefined &&
      endTime === undefined &&
      gameStage === "processing"
    ) {
      console.log("in");
      const updateTimer = () => {
        const now = new Date().toISOString();
        const timeDiff = calculateTimeDifference(startTime, now);
        set_s_timeDiff(timeDiff);
      };
      set_s_isShow(gameStageShowStates["processing"]);

      updateTimer(); // Initial update
      const timerId = setInterval(updateTimer, 1000);

      return () => clearInterval(timerId); // Cleanup on unmount
    }
  }, [s_cookies, route, gameStage, s_isShow]);

  return (
    <Container>
      <Header>
        <Logo>
          <LogoImage src={titleImg} alt="源大覺醒" />
        </Logo>
      </Header>
      <Main>
        {s_isShow.titleContextImage && (
          <CharacterImage>
            <CharacterImageStyle
              src={
                s_cookies[routerTimerName[route].start] !== undefined
                  ? startTime
                  : startContext
              }
              alt="在開始任務前，要跟你說明一下，有很多組入馬一起行動，在越短的時間完成任務就能被排在任務排行榜的前20名喔！試著用最短的時間來完成任務吧！"
            />
          </CharacterImage>
        )}

        {s_isShow.input && (
          <InputArea>
            <StyledInput
              value={s_name}
              onFocus={() => {
                set_s_name("");
              }}
              onChange={(e) => {
                set_s_name(e.target.value);
              }}
              placeholder="輸入您的暱稱"
            />
          </InputArea>
        )}

        {s_isShow.name && (
          <StyledName gameStage={gameStage}>{s_cookies.name}</StyledName>
        )}

        {s_isShow.timeZone && (
          <TimeExclude>
            <TimeExcludeImageStyle src={exclude} />
            <div
              style={{
                position: "absolute",
                top: "20%",
                fontSize: "64px",
                fontWeight: "700",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <TimeZone>{s_timeDiff}</TimeZone>
              <TimeZoneText>{"你的遊玩時間"}</TimeZoneText>
            </div>
          </TimeExclude>
        )}

        {s_isShow.button && (
          <StartButton>
            <CustomButton route={route} onClick={handleStartGame} />
          </StartButton>
        )}
      </Main>
    </Container>
  );
};
export default GameInterface;
