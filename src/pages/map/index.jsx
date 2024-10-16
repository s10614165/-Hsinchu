import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 導入所有必要的圖片資源
import btn_lottery_disable from "@/assets/btn_lottery_disable.svg";
import btn_lottery_normal from "@/assets/btn_lottery_normal.svg";
import btn_museum from "@/assets/btn_museum.svg";
import btn_theater from "@/assets/btn_theater.svg";
import btn_game from "@/assets/btn_game.svg";
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
  background-color: red;
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url(${land_map});
  background-size: 100% 100%;
  background-position: top;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 480px) {
    height: 80vh;
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
  top: 0%;
  left: 35%;
  /* transform: translate(150%, 0%); */
  background-image: ${({ isLocked }) =>
    isLocked ? `url(${btn_lottery_disable})` : `url(${btn_lottery_normal})`};
  @media (max-width: 480px) {
    transform: translate(-100%, 120%);
  }
`;

const CustomButtonBack = styled(CustomButton)`
  bottom: 5%;
  left: 50%;
  width: 20%;
  padding-bottom: 6%; /* 調整寬高比 */
  max-width: 209px;
  max-height: 62px;

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

const Banner = styled.div`
  background-color: blue;
  position: absolute;
  top: 0;
  right: 0;
  width: 20%;
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    height: 80vh;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const Map = () => {
  const [s_currentGroup, set_s_CurrentGroup] = useState("");
  const [s_groupActivities, set_s_GroupActivities] = useState({});
  const [s_isOpen, set_s_isOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCurrentGroup = localStorage.getItem("currentGroup");
    if (storedCurrentGroup) {
      set_s_CurrentGroup(storedCurrentGroup);
      const storedGroupActivities = localStorage.getItem(storedCurrentGroup);
      if (storedGroupActivities) {
        try {
          const parsedGroupActivities = JSON.parse(storedGroupActivities);
          set_s_GroupActivities(parsedGroupActivities);
        } catch (error) {
          console.error("Error parsing group activities:", error);
        }
      }
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
        <img src={logo} />
        <img src={groupImage[s_currentGroup]} />
      </Banner>
      <CustomButtonLock
        isLocked={Object.values(s_groupActivities).includes(0)}
        onClick={handleLockButtonClick}
      />
      <CustomButton
        src={btn_museum}
        onClick={() => navigate("/chutaxdalp/museum")}
        style={{ top: "35%", left: "50%" }}
      />
      <CustomButton
        src={btn_theater}
        onClick={() => navigate("/chutaxdalp/theater")}
        style={{ top: "55%", left: "55%" }}
      />
      <CustomButton
        src={btn_game}
        onClick={() => navigate("/chutaxdalp/theater")}
        style={{ top: "20%", left: "35%" }}
      />
      <CustomButtonBack
        src={btn_home_desktop}
        onClick={() => navigate("/chutaxdalp/")}
      />
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
