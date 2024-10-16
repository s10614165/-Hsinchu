import React from "react";
import styled from "styled-components";

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease-in-out;
`;

const LazyImage = ({ src, alt }) => {
  return <Image src={src} alt={alt} loading="lazy" />;
};

export default LazyImage;
