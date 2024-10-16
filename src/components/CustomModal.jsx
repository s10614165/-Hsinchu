import React from "react";
import styled from "styled-components";
import btn_close_map from "@/assets/btn_close_map.png";
import btn_close from "@/assets/btn_close.png";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  width: 50%;
  height: 50%;
  max-width: 800px;
  max-height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
  /* background-color: #fff; */
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* @media (max-width: 480px) {
    top: 15%;
    right: 5%;
  } */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5%;
  right: 25%;
  background: ${({ usetype }) =>
    usetype === "map"
      ? `url(${btn_close_map}) no-repeat center center`
      : `url(${btn_close}) no-repeat center center`};
  background-size: contain;
  width: 24px;
  height: 24px;
  border: none;
  cursor: pointer;
  z-index: 1;
  @media (max-width: 480px) {
    top: 15%;
    right: 5%;
  }
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const ImageModal = ({
  isOpen,
  onClose,
  imageSrc = "map_label_popup.png",
  useType = "map",
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent>
        <ImageWrapper>
          <StyledImage src={imageSrc} alt="Modal content" />
        </ImageWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ImageModal;
