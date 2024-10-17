import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import btn_01 from "@/assets/btn_01.png";
import btn_02 from "@/assets/btn_02.png";
import btn_03 from "@/assets/btn_03.png";
import btn_04 from "@/assets/btn_04.png";
import img_date_desktop from "@/assets/img_date_desktop.png";
import btn_event_guideline from "@/assets/btn_event_guideline.svg";
import eventBoard from "@/assets/eventBoard.png";
import logo from "@/assets/logo2.svg";
import CustomModal from "@/components/CustomModal";

const ButtonAreaWarp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 20px 0;
  box-sizing: border-box;
`;

const ImgfilmExcludeImageStyleII = styled.img`
  width: clamp(200px, 55%, 800px);
  height: auto;
  object-fit: contain;
  margin-bottom: 40px;
  @media (max-width: 480px) {
    margin-bottom: 0px;
  }
`;

const Container = styled.div`
  width: 70%;
  display: flex;
  position: relative;
  justify-content: center;
  gap: 110px;
  /* align-items: center; */
  /* margin-bottom: 40px; */

  @media (max-width: 480px) {
    width: 80%;
    flex-direction: column;
    justify-content: center;
    gap: 0px;
    align-items: center;
  }
`;

const CustomEvenButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: transparent;
  font-size: 0;
  background-image: ${({ src }) => `url(${src})`};
  width: 20vw; // 視窗寬度的 20%
  height: 30vh; // 視窗高度的 30%
  min-width: 150px; // 設置最小寬度
  min-height: 150px; // 設置最小高度
  max-width: 292px; // 設置最大寬度
  max-height: 267px; // 設置最大高度

  @media (max-width: 480px) {
    width: 10vw; // 在小螢幕上增加相對大小
    height: 10vh;
    min-width: 50px; // 調整小螢幕的最小尺寸
    min-height: 50px;
    top: -50px;
    left: 0;
    bottom: none;
  }
`;

const TimeImageStyle = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  object-fit: contain;

  @media (max-width: 480px) {
    width: 80%;
    margin-top: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
  max-width: 800px;
  width: 100%;
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

  @media (max-width: 480px) {
    width: 171px;
    height: 157px;
  }
`;
const initGameStage = {
  artGallery: 0,
  amusementPark: 0,
  theater: 0,
};
const ButtonArea = () => {
  const navigate = useNavigate();
  const [currentGroup, setCurrentGroup] = useState(null);
  const [s_isOpen, set_s_isOpen] = useState(false);

  const group = [0, 1, 2, 3];
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
      <ImgfilmExcludeImageStyleII src={logo} alt="Logo" />

      <Container>
        <CustomEvenButton
          onClick={() => navigate("/eventBoard")}
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
        onClose={() => set_s_isOpen(false)}
        imageSrc={eventBoard}
        useType="map"
      />
    </ButtonAreaWarp>
  );
};

export default ButtonArea;
