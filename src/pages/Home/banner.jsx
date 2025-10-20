import React from "react";
import banner_desk from "@/assets/banner_desk.png";
import banner_mobile from "@/assets/banner_mobile.png";
import styled from "styled-components";
import logo from "@/assets/logo2.svg";
import baanerIII from "@/assets/416610.jpg";

const Img_filmExcludeII = styled.div`
  position: absolute;
  /* background-color: red; */
  /* background-color: blue; */
  /* width: 837px; */
  width: 100%;
  max-width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  background-image: url(${banner_desk});
  @media (max-width: 768px) {
    max-height: 60vh;
  }

  @media (max-width: 480px) {
    background-image: url(${banner_mobile});
    background-position: top;
    width: 100%;
    /* flex: -1; */
    max-width: 100% !important;
    max-height: 100vh;
    /* width: 150%; */
    /* display: none; */
    /* background-color: orange; */
  }
`;

const ImgfilmExcludeImageStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const ImgfilmExcludeImageStyleII = styled.img`
  width: 65%;
  height: 65%;
  object-fit: contain;
`;

const Banner = () => {
  return (
    <>
      {/* <Img_filmExclude> */}
      {/* <ImgfilmExcludeImageStyle src={bannerImg} alt="Banner" /> */}
      {/* <ImgfilmExcludeImageStyleII src={logo} alt="Banner" /> */}
      {/* </Img_filmExclude> */}
      <Img_filmExcludeII>
        <ImgfilmExcludeImageStyleII src={logo} alt="Banner" />
      </Img_filmExcludeII>
    </>
  );
};

export default Banner;
