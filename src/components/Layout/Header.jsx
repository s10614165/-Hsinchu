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
  width: 73px;
  height: 73px;
  display: ${({ isLoading }) => (isLoading ? "none" : "block")};
  aspect-ratio: 300 / 90;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 480px) {
    width: 65px;
    height: 65px;
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
  width: 546px;
  height: 97px;
  display: ${({ isLoading }) => (isLoading ? "none" : "block")};
  aspect-ratio: 300 / 90;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
  @media (max-width: 480px) {
    width: 328px;
    height: 65px;
  }
`;
const CustomHeader = styled.header`
  /* background-color: blue; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 35px 30px 0px 45px;
  @media (max-width: 480px) {
    padding: 14px 19px 0px 17px;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const handleHeaderClick = () => {
    navigate("/larry/energy/dist/");
  };
  const handleIconClick = () => {
    window.open("https://www.facebook.com/chutax", "_blank");
  };
  return (
    <CustomHeader>
      <StartButton>
        <CustomHeaderLogoButton onClick={handleHeaderClick} />
      </StartButton>
      <CustomIconButton onClick={handleIconClick} />
    </CustomHeader>
  );
};

export default Header;
