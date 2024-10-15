import React from "react";
import styled from "styled-components";
import gameStartImage from "@/assets/gameStart.png";

const StartButton = styled.div`
  text-align: center;
  padding: calc(2vh + 10px) 0;
  width: 100%;
  display: flex;
  justify-content: center;
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
  width: clamp(150px, 30vw, 300px);
  height: calc(clamp(150px, 30vw, 300px) * (90 / 300));
  display: ${({ isLoading }) => (isLoading ? "none" : "block")};
  aspect-ratio: 300 / 90;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const Header = () => {
  return (
    <header>
      <StartButton>
        <CustomButton
          disabled={loading}
          isLoading={loading}
          gameStage={gameStage}
          onClick={handleStartGame}
        />
      </StartButton>
    </header>
  );
};

export default Header;
