import React from "react";
import bannerImg from "@/assets/banner1.png";
import styled from "styled-components";

const Img_filmExclude = styled.div`
  position: absolute;
  /* background-color: blue; */
  width: 100%;
  max-width: 100%;
  height: 100%;
  top: 0;
  /* max-height: 50vh; */
  /* aspect-ratio: 2214.7 / 1245.96; */
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    max-height: 60vh;
  }

  @media (max-width: 480px) {
    max-height: 40vh;
    /* width: 150%; */
    display: none;
    background-color: orange;
  }
`;

const ImgfilmExcludeImageStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Banner = () => {
  return (
    <Img_filmExclude>
      <ImgfilmExcludeImageStyle src={bannerImg} alt="Banner" />
    </Img_filmExclude>
  );
};

export default Banner;
