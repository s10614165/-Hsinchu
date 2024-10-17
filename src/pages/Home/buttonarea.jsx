import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import btn_01 from "@/assets/btn_01.png";

import btn_02 from "@/assets/btn_02.png";

import btn_03 from "@/assets/btn_03.png";

import btn_04 from "@/assets/btn_04.png";
import img_date_desktop from "@/assets/img_date_desktop.png";
import btn_event_guideline from "@/assets/btn_event_guideline.svg";
import eventBoard from "@/assets/eventBoard.png";
import bannerImg from "@/assets/banner1.png";
import { useCookies } from "react-cookie";
import { useState } from "react";
import logo from "@/assets/logo2.svg";
import CustomModal from "@/components/CustomModal";

const ImgfilmExcludeImageStyleII = styled.img`
  width: 55%;
  height: 55%;
  object-fit: contain;
  margin-top: 40px;

  @media (max-width: 480px) {
    width: 80%;
    height: 80%;

    /* width: 175px; */
    /* height: 175px; */
    /* flex: 1; */
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
  transition: transform 0.3s ease;
  background-image: ${({ src }) => `url(${src})`};
  width: 292px;
  height: 267px;
  display: ${({ isLoading }) => (isLoading ? "none" : "block")};
  @media (max-width: 768px) {
    max-height: 60vh;
  }
  @media (max-width: 480px) {
    width: 171px;
    height: 157px;
    /* flex: 1; */
  }
`;
const CustomEvenButton = styled.button`
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: left;
  /* transform: translate(0%, 0%); */
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: transparent;
  font-size: 0;
  transition: transform 0.3s ease;
  background-image: ${({ src }) => `url(${src})`};
  width: 292px;
  height: 267px;
  display: ${({ isLoading }) => (isLoading ? "none" : "block")};
  @media (max-width: 768px) {
    /* max-height: 60vh; */
  }
  @media (max-width: 480px) {
    transform: translate(-20%, 0%);

    width: 200px;
    height: 900px;
    align-self: flex-start;
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
  /* background-color: green; */
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  /* margin-top: calc(00px); */
  z-index: 3;
  @media (max-width: 480px) {
    /* padding-top: ; */

    /* width: 175px; */
    /* height: 175px; */
    /* flex: 1; */
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
const Container = styled.div`
  width: 70%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 480px) {
    width: 80%;
    flex-direction: column;
  }
`;
const ButtonArea = () => {
  const navigate = useNavigate();
  const [currentGroup, setCurrentGroup] = useState(null);
  const [s_isOpen, set_s_isOpen] = useState(false);

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

    if (!localStorage.getItem(`currentGroup`)) {
      localStorage.setItem(
        `currentGroup`,
        JSON.stringify({
          group: groupName,
          gameStage: [
            initGameStage,
            initGameStage,
            initGameStage,
            initGameStage,
          ],
        })
      );
    } else {
      const parse = JSON.parse(localStorage.getItem(`currentGroup`));
      const newSet = { ...parse, group: groupName };
      localStorage.setItem(`currentGroup`, JSON.stringify(newSet));
    }
    // 設置當前的 group
    setCurrentGroup(groupName);

    // 跳轉到指定路徑
    navigate("/map");
  };

  return (
    <ButtonAreaWarp>
      <ImgfilmExcludeImageStyleII src={logo} alt="Banner" />

      <Container>
        <CustomEvenButton
          onClick={() => {
            // set_s_isOpen(true);
            navigate("/eventBoard");

            // eventBoard
          }}
          src={btn_event_guideline}
          alt="event"
        />
        <TimeImageStyle src={img_date_desktop} alt="Date" />
      </Container>
      <ButtonContainer>
        {group.map((groupName, index) => (
          <CustomButton
            key={groupName}
            src={buttonImages[index]}
            onClick={() => handleButtonClick(groupName)}
          />
        ))}
      </ButtonContainer>

      <CustomModal
        event={true}
        isOpen={s_isOpen}
        onClose={() => {
          set_s_isOpen(false);
        }}
        imageSrc={eventBoard}
        useType="map"
      />
    </ButtonAreaWarp>
  );
};

export default ButtonArea;
