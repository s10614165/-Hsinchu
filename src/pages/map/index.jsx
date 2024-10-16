import React, { useState, useEffect } from "react";
import btn_lottery_disable from "@/assets/btn_lottery_disable.png";
import btn_lottery_normal from "@/assets/btn_lottery_normal.png";
import btn_museum from "@/assets/btn_museum.png";
import btn_theater from "@/assets/btn_theater.png";
import btn_lock from "@/assets/btn_lock.png";
import btn_game from "@/assets/btn_game.png";
import btn_home_desktop from "@/assets/btn_home_desktop.png";
import styled from "styled-components";
import map_label_popup from "@/assets/map_label_popup.png";
import map_label_popup2 from "@/assets/map_label_popup2.svg";
import { useNavigate } from "react-router-dom";

import popup_museum_mission from "@/assets/popup_museum_mission.png";
import popup_theater from "@/assets/popup_theater.png";

import CustomModal from "@/components/CustomModal";

const CustomButtonLock = styled.button`
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: transparent;
  font-size: 0;
  transition: transform 0.3s ease;
  background-image: ${({ isLocked }) =>
    isLocked ? `url(${btn_lottery_disable})` : `url(${btn_lottery_normal})`};

  width: 292px;
  height: 267px;

  @media (max-width: 768px) {
    max-height: 60vh;
  }

  @media (max-width: 480px) {
    width: 171px;
    height: 157px;
  }
`;
const CustomButton = styled.button`
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: transparent;
  font-size: 0;
  /* aspect-ratio: 392/367; */
  transition: transform 0.3s ease;
  background-image: ${({ src }) => `url(${src})`};

  width: 292px;
  height: 267px;
  display: ${({ isLoading }) => (isLoading ? "none" : "block")};
  /* aspect-ratio: 300 / 90; */

  /* &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  } */

  @media (max-width: 768px) {
    max-height: 60vh;
  }

  @media (max-width: 480px) {
    width: 171px;
    height: 157px;
    /* flex: 1; */
  }
`;
const CustomButtonBack = styled.button`
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: transparent;
  font-size: 0;
  transition: transform 0.3s ease;
  background-image: url(${btn_home_desktop});

  width: 292px;
  height: 267px;
  aspect-ratio: 392/367;
  /* display: ${({ isLoading }) => (isLoading ? "none" : "block")}; */
  /* aspect-ratio: 300 / 90; */

  /* &:hover {
    transform: scale(1.05);
    }
    
    &:active {
      transform: scale(0.95);
      } */

  @media (max-width: 768px) {
    max-height: 60vh;
  }

  @media (max-width: 480px) {
    width: 171px;
    height: 157px;
    /* flex: 1; */
  }
`;

const navigateUrl = {
  0: "https://www.chutax.gov.tw/Active_ReadAgree.aspx?n=397&ss=A08360D6FCAB8088&t=22E7C1255BF33664A9DE064055F49809",
  1: "https://www.chutax.gov.tw/Active_ReadAgree.aspx?n=397&ss=A08360D6FCAB8088&t=22E7C1255BF33664A9DE064055F49809",
  2: "https://www.chutax.gov.tw/Active_ReadAgree.aspx?n=397&ss=F00646E53B749D5A&t=22E7C1255BF33664A9DE064055F49809",
  3: "https://www.chutax.gov.tw/Active_ReadAgree.aspx?n=397&ss=2FFB87952DB5BA15&t=22E7C1255BF33664A9DE064055F49809 ",
};
const Map = () => {
  const [s_currentGroup, set_s_CurrentGroup] = useState("");
  const [s_groupActivities, set_s_GroupActivities] = useState({});
  const navigate = useNavigate();

  const [s_isOpen, set_s_isOpen] = useState(false);

  useEffect(() => {
    // 1. 在初始化時從 localStorage 中找尋 currentGroup
    const storedCurrentGroup = localStorage.getItem("currentGroup");
    console.log(storedCurrentGroup);
    if (storedCurrentGroup) {
      set_s_CurrentGroup(storedCurrentGroup);

      // 2. 根據 currentGroup 找尋對應的值並進行 JSON 解析
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
      // 添加所有活動完成時的邏輯
      console.log("All activities completed, proceed to next step");
      console.log(navigateUrl[s_currentGroup]);
      window.open(navigateUrl[s_currentGroup]);

      // 這裡可以添加導航到下一步或其他操作
    }
  };
  // console.log(s_groupActivities);
  //
  return (
    <div>
      <CustomButtonLock
        isLocked={Object.values(s_groupActivities).includes(0)}
        onClick={handleLockButtonClick}
      />
      <CustomButton
        src={btn_museum}
        onClick={() => {
          navigate("/larry/energy/dist/museum");
        }}
      />
      <CustomButton
        src={btn_theater}
        onClick={() => {
          navigate("/larry/energy/dist/theater");
        }}
      />
      <CustomButton
        src={btn_game}
        onClick={() => {
          navigate("/larry/energy/dist/theater");
        }}
      />
      <CustomButtonBack
        onClick={() => {
          navigate("/larry/energy/dist/");
        }}
      />

      <CustomModal
        isOpen={s_isOpen}
        onClose={() => {
          set_s_isOpen(false);
        }}
        imageSrc={map_label_popup2}
        useType="map"
      />
    </div>
  );
};

export default Map;
