import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 導入所有必要的圖片資源
import btn_lottery_disable from "@/assets/btn_lottery_disable.png";
import btn_lottery_normal from "@/assets/btn_lottery_normal.svg";
import btn_museum from "@/assets/btn_museum.svg";
import theater_disabled from "@/assets/theater_disabled.png";
import game_disabled from "@/assets/game_disabled.png";
import btn_theater from "@/assets/btn_theater.svg";
import btn_game from "@/assets/btn_game.png";
import museum_disabled from "@/assets/museum_disabled.png";
import btn_home_desktop from "@/assets/btn_home_desktop.png";
import map_label_popup2 from "@/assets/map_label_popup2.svg";
import land_map from "@/assets/land_map.svg";
import map_tag_01 from "@/assets/map_tag_01.png";
import map_tag_02 from "@/assets/map_tag_02.png";
import map_tag_03 from "@/assets/map_tag_03.png";
import map_tag_04 from "@/assets/map_tag_04.png";
import logo from "@/assets/logo.png";

import CustomModal from "@/components/CustomModal";

const ContentWrapper = styled.div`
  /* background-color: red; */
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  background-image: url(${land_map});
  background-size: 100% 100%;
  background-position: top;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  overflow: hidden;
  @media (max-width: 480px) {
    height: 90vh;
  }
`;

const CustomButton = styled.button`
  background-size: contain;
  background-repeat: no-repeat;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: transparent;
  font-size: 0;
  transition: transform 0.3s ease;
  background-image: ${({ src }) => `url(${src})`};
  position: absolute;
  width: 15%;
  height: 0;
  padding-bottom: 15%;
  max-width: 167px;
  max-height: 168px;
  transform: translate(15%, 0%);

  &.game {
    width: 35%;
    /* transform: scale(1.5); // 放大 game 按鈕 */
    @media (max-width: 480px) {
      width: 45%;
      transform-box: fill-box;
      transform: translate(0%, 85%) scale(1.3); // 保持放大效果並應用移動變換
      transform-box: fill-box;
      padding-bottom: 0%;
      min-width: 103px;
      min-height: 94px;
    }
  }
  &.museum {
    width: 35%;
    transform: scale(1.1); // 放大 game 按鈕
    @media (max-width: 480px) {
      width: 95%;
      transform: translate(-5%, 15%) scale(0.9); // 保持放大效果並應用移動變換
      padding-bottom: 0%;
      min-width: 103px;
      min-height: 94px;
      z-index: 50;
    }
  }
  &.theater {
    width: 35%;
    /* transform: scale(1.1); // 放大 game 按鈕 */
    @media (max-width: 480px) {
      width: 95%;
      transform: translate(0%, -25%) scale(0.9); // 保持放大效果並應用移動變換
      padding-bottom: 0%;
      min-width: 103px;
      min-height: 94px;
    }
  }

  @media (max-width: 768px) {
    width: 20%;
    padding-bottom: 20%;
  }

  @media (max-width: 480px) {
    width: 55%;
    transform: translate(0%, 45%);

    padding-bottom: 0%;
    min-width: 103px;
    min-height: 94px;
  }
`;

const CustomButtonLock = styled(CustomButton)`
  top: 3%;
  left: 30%;
  max-width: 200px;
  max-height: 201px;
  transform: scale(1.1); // 放大 game 按鈕
  /* transform: translate(150%, 0%); */
  background-image: ${({ isLocked }) =>
    isLocked ? `url(${btn_lottery_disable})` : `url(${btn_lottery_normal})`};
  @media (max-width: 480px) {
    transform: translate(-50%, 160%);
  }
`;

const CustomButtonBack = styled(CustomButton)`
  bottom: 5%;
  left: 50%;
  width: 20%;
  padding-bottom: 6%; /* 調整寬高比 */
  max-width: 209px;
  max-height: 62px;
  transform: translate(-50%, 50%);
  @media (max-width: 768px) {
    width: 25%;
    padding-bottom: 7.5%;
  }

  @media (max-width: 480px) {
    width: 30%;
    padding-bottom: 0;
    min-width: 171px;
    min-height: 51px;
    transform: translate(-50%, -50%);
  }
`;

const Banner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden; // Add this to prevent overflow

  @media (max-width: 480px) {
    height: 35vh;
    width: 40%;
    /* right: 10%; */
  }
`;

const Logo = styled.img`
  /* max-width: 100%; */
  width: 375px;
  height: 274px;
  max-height: 75%;
  /* object-fit: contain; */

  @media (max-width: 480px) {
    max-width: 100%;
    max-height: 40vh;
    width: 275px;
    height: 274px;
  }
`;

const GroupImage = styled.img`
  max-width: 100%;
  width: auto;
  height: auto;
  max-height: 45%;
  object-fit: contain;
  background-position: right;
  width: 275px;
  height: 174px;
  /* margin-top: -40px; */

  @media (max-width: 480px) {
    max-width: 100%;
    max-height: 10vh;
    margin-top: -40px;
    width: 140px;
    height: 50px;
  }
`;

const navigateUrl = {
  0: "https://www.chutax.gov.tw/Active_ReadAgree.aspx?n=397&ss=A08360D6FCAB8088&t=22E7C1255BF33664A9DE064055F49809",
  1: "https://www.chutax.gov.tw/Active_ReadAgree.aspx?n=397&ss=A08360D6FCAB8088&t=22E7C1255BF33664A9DE064055F49809",
  2: "https://www.chutax.gov.tw/Active_ReadAgree.aspx?n=397&ss=F00646E53B749D5A&t=22E7C1255BF33664A9DE064055F49809",
  3: "https://www.chutax.gov.tw/Active_ReadAgree.aspx?n=397&ss=2FFB87952DB5BA15&t=22E7C1255BF33664A9DE064055F49809",
};

const groupImage = {
  0: map_tag_01,
  1: map_tag_02,
  2: map_tag_03,
  3: map_tag_04,
};

const Map = () => {
  const [s_currentGroup, set_s_CurrentGroup] = useState("");
  const [s_groupActivities, set_s_GroupActivities] = useState({});
  const [s_isOpen, set_s_isOpen] = useState(false);
  const navigate = useNavigate();
  const storedCurrentGroup = JSON.parse(localStorage.getItem("currentGroup"));

  useEffect(() => {
    // const parse = JSON.parse(storedCurrentGroup);
    console.log(storedCurrentGroup);
    if (Object.keys(storedCurrentGroup).length > 0) {
      set_s_CurrentGroup(storedCurrentGroup.group);
      set_s_GroupActivities(
        storedCurrentGroup.gameStage[storedCurrentGroup.group]
      );
    }
  }, []);

  const handleLockButtonClick = () => {
    const isLocked = Object.values(s_groupActivities).includes(0);

    if (isLocked) {
      set_s_isOpen(true);
    } else {
      console.log("All activities completed, proceed to next step");
      window.open(navigateUrl[s_currentGroup]);
    }
  };

  return (
    <ContentWrapper>
      <Banner>
        <Logo src={logo} alt="Logo" />
        <GroupImage src={groupImage[s_currentGroup]} alt="Group Image" />
      </Banner>
      <CustomButtonLock
        isLocked={Object.values(s_groupActivities).includes(0)}
        onClick={handleLockButtonClick}
      />
      <CustomButton
        className="museum"
        src={
          storedCurrentGroup.gameStage[storedCurrentGroup.group].museum === 1
            ? btn_museum
            : museum_disabled
        }
        onClick={() => navigate("/museum")}
        style={{ top: "40%", left: "50%" }}
      />
      <CustomButton
        className="theater"
        src={
          storedCurrentGroup.gameStage[storedCurrentGroup.group].theater === 1
            ? btn_theater
            : theater_disabled
        }
        onClick={() => navigate("/theater")}
        style={{ top: "60%", left: "52%" }}
      />
      <CustomButton
        className="game"
        src={
          storedCurrentGroup.gameStage[storedCurrentGroup.group]
            .amusementPark === 1
            ? btn_game
            : game_disabled
        }
        onClick={() => {
          // console.log(gameurl[s_currentGroup]);
          window.location.href =
            "https://hchg-vtuber.url.tw/chutaxdalp/amusementPark/";
          // navigate("/chutaxdalp/theater");
        }}
        style={{ top: "30%", left: "35%" }}
      />
      <CustomButtonBack src={btn_home_desktop} onClick={() => navigate("/")} />
      <CustomModal
        isOpen={s_isOpen}
        onClose={() => set_s_isOpen(false)}
        imageSrc={map_label_popup2}
        useType="map"
      />
    </ContentWrapper>
  );
};

export default Map;
