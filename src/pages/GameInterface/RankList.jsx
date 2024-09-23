import { useEffect } from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import playerRecord from "@/assets/playerRecord.png";
import rankBorder from "@/assets/rankBorder.png";
import rankTitle from "@/assets/rankTitle.png";
import rankBorderIndex from "@/assets/rankBorderIndex.png";
import useGoogleSheet from "@/customHooks/useGoogleSheet";
import millisecondsToTime from "../../Util/millisecondsToTime";
import calculateTimeDifference from "@/Util/calculateTimeDifference.js";
import timeToMilliseconds from "@/Util/timeToMilliseconds.js";
import { useState } from "react";
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 975px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* margin: 0 auto; */
  padding-top: 60px;
`;

const LeaderboardContainer = styled.div`
  background-color: #000;
  color: #fff;
  font-family: Arial, sans-serif;
  padding: 15px;
  position: relative;
  max-width: 970px;
  max-height: 654px;
  z-index: 1; // Ensure this is above the background

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    max-width: 950px;
    border-image-source: url(${rankBorder});
    border-image-slice: 30 fill;
    border-image-width: 20px;
    border-image-outset: 10px;
    pointer-events: none;
    z-index: -1; // Place this behind the content
  }
`;

const Title = styled.h2`
  position: absolute;
  top: 3%;
  left: 50%;
  transform: translateX(-50%);
  width: calc(600 / 960 * 100%);
  color: #fff;
  margin: 0;
  padding: 10px 40px;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  z-index: 2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-image-source: url(${rankTitle});
    border-image-slice: 30 fill;
    border-image-width: 20px;
    border-image-outset: 5px;
    pointer-events: none;
    z-index: -1;
  }
`;

const Table = styled.div`
  width: 100%;
  max-width: 960px;
  height: clamp(0px, min(calc(100vw * 620 / 960), 620px), 620px);
  overflow-y: auto;

  /* Webkit scrollbar styles */
  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-button {
    background: transparent;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track-piece {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: white;
    border: 1px solid white;
  }

  &::-webkit-scrollbar-track {
    box-shadow: transparent;
  }

  /* Firefox scrollbar styles */
  scrollbar-width: thin;
  scrollbar-color: white transparent;
`;
const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
  border-bottom: 2px solid white;
  font-size: 32px;
  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%; // Ensure the cell takes full height of the row

  /* 改進的邊框圖片樣式，限制最大尺寸為 60px x 60px */
  ${(props) =>
    props.rank &&
    `
  /* 使用背景圖片代替邊框圖片 */
  background-image: ${
    props.index + 1 <= 3 ? `url(${rankBorderIndex})` : "none"
  };
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  
  /* 設置最大尺寸為 60px x 60px */
  min-width: 60px;
  min-height: 60px;
  
  /* 使用寬高比來保持元素為正方形 */
  aspect-ratio: 1 / 1;
  
  /* 使用 flexbox 使內容居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  
  /* 使用內邊距來確保內容不會被背景圖片遮擋 */
  padding: 5px;
  
  /* 保持其他樣式 */
  color: #00ffff;
  font-weight: bold;
  
  /* 移除固定的寬度百分比，改為自適應大小 */
  width: auto;
  
  /* 如果需要，可以添加一個小的外邊距 */
  margin: 2px;
  
  /* 如果背景圖片有透明部分，可能需要一個實際的邊框 */
  border: ${props.index <= 3 ? "1px solid transparent" : "none"};
  
  /* 確保內容不會溢出 */
  overflow: hidden;
  
  /* 可選：添加過渡效果使尺寸變化更平滑 */
  transition: all 0.3s ease;
`}

  ${(props) =>
    props.name &&
    `
    width: 45% !important;
   flex: 1 1 auto;
    border-right: 1px solid white;
  `}
  
  ${(props) =>
    props.time &&
    `
    width: 45%;
  `}
`;

const HighlightedRow = styled(TableRow)`
  position: relative;
  margin-top: 50px;
  padding: 5px 15px;
  height: 40px;
  max-width: 95.5%;
  display: flex;
  justify-content: space-between;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -5px;
    right: 0;
    bottom: 0;
    border-image-source: url(${playerRecord});
    border-image-slice: 30 fill;
    border-image-width: 15px;
    border-image-outset: 5px;
    pointer-events: none;
    z-index: -1;
    max-width: 100%; // 確保 ::before 不會超出父元素
    box-sizing: border-box; // 包含邊框在內的盒模型
  }
`;

const CloseText = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: black;
  color: #00ffff;
  padding: 10px;
  font-size: clamp(8px, 5vw, 32px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ROUTER_TIMER_NAME = {
  sun: { start: "sunStartTime", end: "sunEndTime" },
  water: { start: "waterStartTime", end: "waterEndTime" },
  wind: { start: "windStartTime", end: "windEndTime" },
  energy: { start: "energyStartTime", end: "energyEndTime" },
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

const Leaderboard = ({ name, time }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const route = queryParams.get("route");
  const [cookies, setCookie, removeCookie] = useCookies(COOKIE_NAMES);

  const { data, loading, error } = useGoogleSheet(`${route}!A1:D21`);
  const startTime = cookies[ROUTER_TIMER_NAME[route]?.start];
  const endTime = cookies[ROUTER_TIMER_NAME[route]?.end];

  const [s_timeDiff, set_s_timeDiff] = useState("");

  const findRank = data?.find((item) => item[0] === cookies.UUID)?.[3] ?? null;

  console.log(findRank);

  useEffect(() => {
    set_s_timeDiff(calculateTimeDifference(startTime, endTime));
  }, []);

  useEffect(() => {
    if (route) {
      const startTimeCookie = `${route}StartTime`;
      const endTimeCookie = `${route}EndTime`;

      if (COOKIE_NAMES.includes(startTimeCookie)) {
        removeCookie(startTimeCookie);
      }
      if (COOKIE_NAMES.includes(endTimeCookie)) {
        removeCookie(endTimeCookie);
      }
    }
  }, [route, removeCookie]);

  // Assuming leaderboardData is derived from 'data'
  const leaderboardData = data
    ? data
        .filter((item, index) => index !== 0)
        .map((item, index) => {
          return {
            rank: item[3],
            name: item[1], // Adjust these indices based on your actual data structure
            time: item[2],
          };
        })
    : [];

  return (
    <Wrapper>
      <Title>排行榜</Title>
      <LeaderboardContainer>
        <Table>
          {leaderboardData.map((item, index) => (
            <TableRow key={item.rank}>
              <TableCell index={index} rank>
                {item.rank}
              </TableCell>
              <TableCell name>{item.name}</TableCell>
              <TableCell time>
                {item.time === "" ? "" : millisecondsToTime(item.time)}
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </LeaderboardContainer>
      <HighlightedRow>
        <TableCell rank>{findRank ? findRank : "-"}</TableCell>
        <TableCell name>{name}</TableCell>
        <TableCell time>{s_timeDiff}</TableCell>
      </HighlightedRow>
      <CloseText>按下右上角叉叉關閉</CloseText>
    </Wrapper>
  );
};

export default Leaderboard;
