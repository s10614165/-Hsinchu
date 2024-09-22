import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SpinnerCircle = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(83, 249, 239, 0.3);
  border-top: 5px solid #53f9ef;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingSpinner = () => (
  <SpinnerWrapper>
    <SpinnerCircle />
  </SpinnerWrapper>
);

export default LoadingSpinner;
