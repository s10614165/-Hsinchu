import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import btn_backtomap_desktop from "@/assets/btn_backtomap_desktop.png";
import theater_label_desktop from "@/assets/theater_label_desktop.png";
import theater_label_mobile from "@/assets/theater_label_mobile.png";
import img_mission_complete from "@/assets/img_mission_complete.png";
import styled from "styled-components";
import CustomModal from "@/components/CustomModal";
import popup_theater from "@/assets/popup_theater.png";
import GlobalStyle from "../../style/GlobalStyle.jsx";

const videioUrl = {
  0: "https://youtu.be/hiv6V2M4L0k?si=Yad_zYY45TYaqJuu",
  1: "https://youtu.be/V1au0_PziQ8?si=8xt9Guiah_5mWI7f",
  2: "https://youtu.be/BH9LUGuz2u4?si=4FkerEgdIqPa-yiz",
  3: "https://youtu.be/gCKNGVYrIHE?si=sHbGTJ_8bAUBjkzh",
};

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
  margin-top: 20px;
  width: 270px;
  height: 80px;
  display: ${({ isLoading }) => (isLoading ? "none" : "block")};

  @media (max-width: 768px) {
    width: 260px;
    height: 80px;
  }

  @media (max-width: 480px) {
    margin-top: 20px;

    width: 260px;
    height: 80px;
  }
`;

const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  /* min-height: 100vh; */
  width: 100%;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  /* background-color: red; */
  width: 90%;
  min-height: 82.5vh; // 改為 100vh 以確保全屏高度
  padding: 90px 20px 0px; // 增加頂部 padding 為 TitleImage 留出空間
  box-sizing: border-box;
  background-image: url(${theater_label_desktop});
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  @media (max-width: 768px) {
    padding: 50px 15px 30px;
  }

  @media (max-width: 480px) {
    padding: 80px 10px 20px;
    background-image: url(${theater_label_mobile});
  }
`;



const ContentWrapper = styled.div`
  display: flex;
  /* background-color: #fff; */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  max-width: 876px;
  max-height: 561px;
  margin: 0 auto;
  @media (max-width: 480px) {
    width: 90%;
    /* height: 90%; */
    justify-content: start;
  }
`;

const WarringText = styled.p`
  color: #727171;
  font-family: "Noto Sans CJK TC", sans-serif; // 使用新字體
  @media (max-width: 480px) {
    font-size: 20px;
    margin-top: 30px;
  }
`;
const CountdownText = styled.p`
  position: absolute;
  top: 10%;
  right: 5%;
  font-size: 24px;
  margin-bottom: 15px;
  text-align: center;
  align-self: flex-end;
  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

const VideoBox = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  /* background-color: red; */

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Theater = () => {
  const [countdown, setCountdown] = useState(30);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const navigate = useNavigate();
  const storedCurrentGroup = JSON.parse(localStorage.getItem("currentGroup"));
  const [s_isOpen, set_s_isOpen] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsTimeUp(true);
      set_s_isOpen(true);
      const storedCurrentGroup = localStorage.getItem("currentGroup");
      const parse = JSON.parse(storedCurrentGroup);

      console.log(parse);
      if (Object.keys(parse).length > 0) {
        const newStage = parse.gameStage.map((item, index) => {
          return index === parse.group ? { ...item, theater: 1 } : { ...item };
        });
        localStorage.setItem(
          `currentGroup`,
          JSON.stringify({ ...parse, gameStage: newStage })
        );
      }
    }
  }, [countdown]);

  const handleButtonClick = () => {
    if (isTimeUp) {
      navigate("/map");
    } else {
      navigate("/map");
    }
  };
  const getYouTubeEmbedUrl = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }

    return url;
  };

  return (
    <>
      <GlobalStyle />
      <CenteredWrapper>
        <StyledContainer>
          {/* <TitleImage src={theater_logo_desktop} alt="竹視電影院" /> */}
          <CountdownText>
            {isTimeUp ||
            storedCurrentGroup.gameStage[storedCurrentGroup.group].theater ===
              1 ? (
              <img
                style={{ width: "70px", height: "70px" }}
                src={img_mission_complete}
              />
            ) : (
              countdown
            )}
          </CountdownText>
          <WarringText>瀏覽作品30秒即可完成任務</WarringText>
          <ContentWrapper>
            <VideoBox>
              <iframe
                src={getYouTubeEmbedUrl(videioUrl[storedCurrentGroup.group])}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              />
            </VideoBox>
          </ContentWrapper>
          <CustomButton
            src={btn_backtomap_desktop}
            onClick={handleButtonClick}
          />
        </StyledContainer>
        <CustomModal
          isOpen={s_isOpen}
          onClose={() => {
            set_s_isOpen(false);
          }}
          imageSrc={popup_theater}
          useType="map"
        />
      </CenteredWrapper>
    </>
  );
};

export default Theater;
