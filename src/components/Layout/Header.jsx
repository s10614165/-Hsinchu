import React from "react";
import styled from "styled-components";
import header_logo_desktop from "@/assets/header_logo_desktop.png";
import btn_share_fb_desktop from "@/assets/btn_share_fb_desktop.png";

import { useNavigate } from "react-router-dom";
const StartButton = styled.div`
  text-align: center;
  /* padding: calc(2vh + 10px) 0; */
  /* width: 100%; */
  display: flex;
  justify-content: center;
`;

const CustomIconButton = styled.button`
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: transparent;
  font-size: 0;
  transition: transform 0.3s ease;
  background-image: url(${btn_share_fb_desktop});
  width: clamp(30px, 30px, 87px);
  height: clamp(30px, 30px, 87px);
  display: ${({ isLoading }) => (isLoading ? "none" : "block")};
  aspect-ratio: 300 / 90;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`;
const CustomHeaderLogoButton = styled.button`
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: transparent;
  font-size: 0;
  transition: transform 0.3s ease;
  background-image: url(${header_logo_desktop});
  width: clamp(328px, 45vw, 617px);
  height: clamp(65px, 30vw, 123px);
  display: ${({ isLoading }) => (isLoading ? "none" : "block")};
  aspect-ratio: 300 / 90;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
  @media (max-width: 480px) {
    width: 200px;
    height: 35px;
  }
`;
const CustomHeader = styled.header`
  /* background-color: blue; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 30px;
  @media (max-width: 480px) {
    padding: 22px 26px 26px 26px;
  }
  /* // */
`;

const Header = () => {
  const navigate = useNavigate();

  const handleHeaderClick = () => {
    navigate("/");
  };
  const handleIconClick = () => {
    navigate("/");
  };
  return (
    <CustomHeader>
      <StartButton>
        <CustomHeaderLogoButton onChange={handleHeaderClick} />
      </StartButton>
      <CustomIconButton onChange={handleIconClick} />
    </CustomHeader>
  );
};

export default Header;
