import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import btn_01 from "@/assets/btn_01.png";

import btn_02 from "@/assets/btn_02.png";

import btn_03 from "@/assets/btn_03.png";

import btn_04 from "@/assets/btn_04.png";
import img_date_desktop from "@/assets/img_date_desktop.png";
import bannerImg from "@/assets/banner1.png";
import { useCookies } from "react-cookie";
import { useState } from "react";

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  /* flex01 */
  gap: 112px;

  @media (max-width: 768px) {
    /* max-height: 60vh; */
  }

  @media (max-width: 480px) {
    gap: 35px;

    /* width: 175px; */
    /* height: 175px; */
    /* flex: 1; */
  }
`;

const ButtonAreaWarp = styled.div`
  display: flex;
  width: 100%;
  /* background-color: green; */
  height: 100%;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  /* margin-top: calc(00px); */
  z-index: 3;

  @media (max-width: 480px) {
    background-image: url(${bannerImg});
    background-size: 100% 342px;
    aspect-ratio: 149/342;
    background-position: top center;
    background-repeat: no-repeat;
    /* align-items: center; */
    /* justify-content: start; */
    justify-content: center;
    /* padding-top: 20px; */
    /* padding-bottom: 10px; */
    /* height: 100vh; 使用視窗高度 */
  }
`;

const TimeImageStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  @media (max-width: 480px) {
    width: 80%;
    height: 80%;
    /* height: 100vh; 使用視窗高度 */
  }
`;

const ButtonArea = () => {
  const navigate = useNavigate();
  const [currentGroup, setCurrentGroup] = useState(null);

  const group = [0, 1, 2, 3];
  // const group = [
  //   "juniorElementary",
  //   "seniorElementary",
  //   "juniorHighschool",
  //   "adult",
  // ];

  const initGameStage = {
    artGallery: 0,
    amusementPark: 0,
    theater: 0,
  };
  const buttonImages = [btn_01, btn_02, btn_03, btn_04];

  const handleButtonClick = (groupName) => {
    console.log(groupName);
    localStorage.setItem(`currentGroup`, groupName);

    // 檢查 localStorage 是否已存在該 group
    if (!localStorage.getItem(groupName)) {
      // 如果不存在，則設置 localStorage
      localStorage.setItem(`${groupName}`, JSON.stringify(initGameStage));
    }

    // 設置當前的 group
    setCurrentGroup(groupName);

    // 跳轉到指定路徑
    navigate("/chutaxdalp/map");
  };

  return (
    <ButtonAreaWarp>
      <div
        style={{
          width: "90%",
          height: "10%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TimeImageStyle src={img_date_desktop} alt="Date" />
      </div>
      <ButtonContainer>
        {group.map((groupName, index) => (
          <CustomButton
            key={groupName}
            src={buttonImages[index]}
            onClick={() => handleButtonClick(groupName)}
          />
        ))}
      </ButtonContainer>
    </ButtonAreaWarp>
  );
};

export default ButtonArea;
