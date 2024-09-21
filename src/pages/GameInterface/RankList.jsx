import React from "react";
import styled from "styled-components";
import playerRecord from "@/assets/playerRecord.png";
import rankBorder from "@/assets/rankBorder.png";
import rankTitle from "@/assets/rankTitle.png";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding-top: 60px;
`;

const LeaderboardContainer = styled.div`
  background-color: #000;
  color: #fff;
  font-family: Arial, sans-serif;
  padding: 20px;
  position: relative;
  max-width: 950px;
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
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 5px;
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

  ${(props) =>
    props.rank &&
    `
    color: #00ffff;
    width: 10%;
    font-weight: bold;
     flex-shrink: 0;
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
const TableCellWithSeparator = styled(TableCell)`
  &::before {
    content: "|";
    position: absolute;
    left: -10px;
    color: white;
  }
`;

const HighlightedRow = styled(TableRow)`
  position: relative;
  margin-top: 50px;
  padding: 10px;
  height: 90px;
  display: flex;
  justify-content: space-between;
  z-index: 1; // Ensure this is above the background

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-image-source: url(${playerRecord});
    border-image-slice: 30 fill;
    border-image-width: 20px;
    border-image-outset: 5px;
    pointer-events: none;
    z-index: -1; // Place this behind the content
  }
`;

const leaderboardData = [
  { rank: 1, name: "成大能源", time: "00:12:55" },
  { rank: 2, name: "Kuo 00", time: "00:14:05" },
  { rank: 3, name: "Coco", time: "00:20:23" },
  { rank: 4, name: "Andy Chu", time: "00:23:15" },
  { rank: 5, name: "林謀謀", time: "00:24:21" },
  { rank: 6, name: "成大xvbf", time: "00:24:43" },
  { rank: 7, name: "李美美", time: "00:29:12" },
];

const Leaderboard = ({ name, time }) => {
  return (
    <Wrapper>
      <Title>排行榜</Title>
      <LeaderboardContainer>
        <Table>
          {leaderboardData.map((item) => (
            <TableRow key={item.rank}>
              <TableCell rank>{item.rank}</TableCell>
              <TableCell name>{item.name}</TableCell>
              <TableCell time>{item.time}</TableCell>
            </TableRow>
          ))}
        </Table>
      </LeaderboardContainer>
      <HighlightedRow>
        <TableCell rank>6</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell time>{time}</TableCell>
      </HighlightedRow>
    </Wrapper>
  );
};

export default Leaderboard;
