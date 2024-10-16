import React from "react";
import styled from "styled-components";
import footer_desktop from "@/assets/footer_desktop.png";

const CustomFooter = styled.footer`
  /* background-color: red; */
  display: flex;
  justify-content: center;
  /* align-items: center; */
  /* padding: 10px 0px; */
`;
const FooterImage = styled.img`
  /* position: absolute; */
  /* top: 0px; */
  /* left: 50%; */
  /* transform: translateX(-50%); */
  width: 100%;
  /* height: 100%; */
  max-width: 324.5px;
  max-height: 57.5px;
  /* width: 30%; */
  /* height: auto; */
  /* z-index: 20; */
`;

const Footer = () => {
  return (
    <CustomFooter>
      <FooterImage src={footer_desktop} />
    </CustomFooter>
  );
};

export default Footer;
