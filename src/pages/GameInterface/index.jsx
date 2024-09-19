import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
// Import images (ensure these imports are correct for your project structure)
import titleImg from "@/assets/Title.png";
import startContext from "@/assets/startContext.png";
import startTime from "@/assets/startTime.png";
import gameStartImage from "@/assets/gameStart.png";
import inputImg from "@/assets/Input.png";
import calculateTimeDifference from "@/Util/calculateTimeDifference.js";
// Styled components (keeping your existing styles)
const Container = styled.div`
  width: 100vw;
  height: 100vh;
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
  background-image: url(${gameStartImage});
  width: clamp(200px, 300px, 300px);
  height: clamp(90px, 90px, 90px);
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
  color: white;
`;

const routerTimerName = {
  sun: { start: "sunStartTime", end: "sunEndTime" },
  water: { start: "waterStartTime", end: "waterEndTime" },
  wind: { start: "windStartTime", end: "windEndTime" },
  energy: { start: "energyStartTime", end: "energyEndTime" },
};

const GameInterface = () => {
  const [s_cookies, set_s_cookie] = useCookies(["name"]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 獲取 'route' 參數的值
  const route = queryParams.get("route");

  // 獲取 'gameStage' 參數的值
  const gameStage = queryParams.get("gameStage");

  console.log("route:", route); // 將輸出 "sun"
  console.log("gameStage:", gameStage); // 將輸出 "start"

  console.log(routerTimerName[route].start);
  console.log(s_cookies[routerTimerName[route].start]);

  const [name, setName] = useState("");

  const handleStartGame = () => {
    if (name === "請輸入暱稱") {
      return;
    }
    if (name.trim() === "") {
      setName("請輸入暱稱");
    } else {
      set_s_cookie("name", name, { path: "/" });
    }
  };

  useEffect(() => {
    if (gameStage === "start") {
      set_s_cookie(routerTimerName[route].start, new Date(), { path: "/" });
      return;
    }
    set_s_cookie(routerTimerName[route].end, new Date(), { path: "/" });
  }, []);
  console.log(
    calculateTimeDifference(
      s_cookies[routerTimerName[route].start],
      s_cookies[routerTimerName[route].end]
    )
  );
  console.log(  s_cookies[routerTimerName[route].start])
  console.log(  s_cookies[routerTimerName[route].end])
  return (
    <Container>
      <Header>
        <Logo>
          <LogoImage src={titleImg} alt="源大覺醒" />
        </Logo>
      </Header>

      <Main>
        <CharacterImage>
          <CharacterImageStyle
            src={
              s_cookies.name !== "請輸入暱稱" &&
              s_cookies.name !== "" &&
              s_cookies.name !== undefined
                ? startTime
                : startContext
            }
            alt="在開始任務前，要跟你說明一下，有很多組入馬一起行動，在越短的時間完成任務就能被排在任務排行榜的前20名喔！試著用最短的時間來完成任務吧！"
          />
        </CharacterImage>

        {!s_cookies.name ? (
          <InputArea>
            <StyledInput
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="輸入您的暱稱"
            />
          </InputArea>
        ) : (
          <StyledName>{s_cookies.name}</StyledName>
        )}

        <StartButton>
          <CustomButton onClick={handleStartGame} />
        </StartButton>
      </Main>
    </Container>
  );
};

export default GameInterface;
