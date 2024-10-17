import React, {
  useState,
  useEffect,
  lazy,
  Suspense,
  useRef,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import btn_backtomap_desktop from "@/assets/btn_backtomap_desktop.png";
import museum_label_desktop from "@/assets/museum_label_desktop.png";
import museum_label_mobile from "@/assets/museum_label_mobile.png";
import btn_left from "@/assets/btn_left.png";
import btn_right from "@/assets/btn_right.png";
import img_mission_complete from "@/assets/img_mission_complete.png";
import styled from "styled-components";
import CustomModal from "@/components/CustomModal";
import popup_museum_mission from "@/assets/popup_museum_mission.png";

// Import all the picture assets
import picture00 from "@/assets/00.png";
import picture01 from "@/assets/01.png";
import picture02 from "@/assets/02.png";
import picture03 from "@/assets/03.png";
import picture04 from "@/assets/04.png";
import picture05 from "@/assets/05.png";
import picture06 from "@/assets/06.png";
import picture07 from "@/assets/07.png";

import picture10 from "@/assets/10.png";
import picture11 from "@/assets/11.png";
import picture12 from "@/assets/12.png";
import picture13 from "@/assets/13.png";
import picture14 from "@/assets/14.png";
import picture15 from "@/assets/15.png";
import picture16 from "@/assets/16.png";
import picture17 from "@/assets/17.png";

import picture20 from "@/assets/20.png";
import picture21 from "@/assets/21.png";
import picture22 from "@/assets/22.png";
import picture23 from "@/assets/23.png";
import picture24 from "@/assets/24.png";
import picture25 from "@/assets/25.png";
import picture26 from "@/assets/26.png";
import picture27 from "@/assets/27.png";

import picture30 from "@/assets/30.png";
import picture31 from "@/assets/31.png";
import picture32 from "@/assets/32.png";
import picture33 from "@/assets/33.png";
import picture34 from "@/assets/34.png";
import picture35 from "@/assets/35.png";
import picture36 from "@/assets/36.png";
import picture37 from "@/assets/37.png";

// LazyImage component
const LazyImage = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  const onLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      onLoad();
    }
  }, [onLoad]);

  return (
    <>
      {!isLoaded && <LoadingPlaceholder>Loading...</LoadingPlaceholder>}
      <StyledImage
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={onLoad}
        style={{ display: isLoaded ? "block" : "none" }}
      />
    </>
  );
};
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease-in-out;
`;

const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  /* min-height: 100vh; */
  width: 100%;
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
  background-image: ${({ src }) => `url(${src})`};
  /* margin-top: 45px; */
  margin-top: 20px;

  width: 270px;
  height: 80px;
  display: ${({ isLoading }) => (isLoading ? "none" : "block")};

  @media (max-width: 768px) {
    width: 260px;
    height: 80px;
  }

  @media (max-width: 480px) {
    width: 260px;
    height: 80px;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 90%;
  min-height: 82.5vh; // 改為 100vh 以確保全屏高度
  padding: 90px 20px 0px; // 增加頂部 padding 為 TitleImage 留出空間
  box-sizing: border-box;
  background-image: url(${museum_label_desktop});
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  @media (max-width: 768px) {
    padding: 50px 15px 30px;
  }

  @media (max-width: 480px) {
    padding: 80px 10px 20px;
    background-image: url(${museum_label_mobile});
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  /* background-color: #fff; */
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  @media (max-width: 480px) {
    width: 90%;
    height: 90%;
  }
`;

const CountdownText = styled.p`
  position: absolute;
  top: 10%;
  right: 5%;
  font-size: 30px;
  margin-bottom: 15px;
  text-align: center;
  align-self: flex-end;
  &.countD {
    top: 10%;
    right: 5%;
    @media (max-width: 480px) {
      top: 5%;
      right: 5%;
    }

    img {
      width: 70px;
      height: 70px;
      // 如果需要，可以在这里添加其他样式
    }
  }
  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    /* margin-bottom: 5px; */
    /* top: 5%;
    right: 5%; */
  }
`;

const CarouselContainer = styled.div`
  /* background: red; */
  position: relative;
  width: 100%;
  max-width: 740px;
  height: 490px;
  overflow: hidden;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: scale-down;
  transition: opacity 0.5s ease-in-out;
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 121px;
  height: 121px;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  cursor: pointer;
  z-index: 10;

  @media (max-width: 768px) {
    width: 64px;
    height: 64px;
  }
`;

const LeftButton = styled(CarouselButton)`
  left: 10px;
  background-image: url(${btn_left});
`;

const RightButton = styled(CarouselButton)`
  right: 10px;
  background-image: url(${btn_right});
`;

const LoadingPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  color: #666;
  font-size: 18px;
`;

const imageUrl = {
  0: [
    picture00,
    picture01,
    picture02,
    picture03,
    picture04,
    picture05,
    picture06,
    picture07,
  ],
  1: [
    picture10,
    picture11,
    picture12,
    picture13,
    picture14,
    picture15,
    picture16,
    picture17,
  ],
  2: [
    picture20,
    picture21,
    picture22,
    picture23,
    picture24,
    picture25,
    picture26,
    picture27,
  ],
  3: [
    picture30,
    picture31,
    picture32,
    picture33,
    picture34,
    picture35,
    picture36,
    picture37,
  ],
};

const Museum = () => {
  const [countdown, setCountdown] = useState(30);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [s_isOpen, set_s_isOpen] = useState(false);

  const storedCurrentGroup = JSON.parse(
    localStorage.getItem("currentGroup") || "{}"
  );

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    } else {
      setIsTimeUp(true);
      set_s_isOpen(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (Object.keys(storedCurrentGroup).length > 0) {
      const groupImages = imageUrl[storedCurrentGroup.group];
      if (groupImages) {
        setImages([groupImages[0]]);
        Promise.all(
          groupImages.slice(1).map((src) => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = () => resolve(src);
              img.onerror = reject;
              img.src = src;
            });
          })
        ).then((loadedImages) => {
          setImages((prevImages) => [...prevImages, ...loadedImages]);
        });
      }
    }
  }, [storedCurrentGroup.group]);

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const handleButtonClick = useCallback(() => {
    if (isTimeUp) {
      const parse = { ...storedCurrentGroup };
      if (Object.keys(parse).length > 0) {
        const newStage = parse.gameStage.map((item, index) =>
          index === parse.group ? { ...item, artGallery: 1 } : item
        );
        localStorage.setItem(
          "currentGroup",
          JSON.stringify({ ...parse, gameStage: newStage })
        );
      }
    }
    navigate("/map");
  }, [isTimeUp, navigate, storedCurrentGroup]);
  return (
    <CenteredWrapper>
      <StyledContainer>
        {/* 你的現有內容 */}
        <CountdownText className={isTimeUp ? "countD" : ""}>
          {isTimeUp ? (
            <img
              style={{ width: "70px", height: "70px" }}
              src={img_mission_complete}
            />
          ) : (
            countdown
          )}
        </CountdownText>
        <p>瀏覽作品30秒即可完成任務</p>
        <ContentWrapper>
          <LeftButton onClick={goToPrevious} />
          <CarouselContainer>
            {images.length > 0 && (
              <CarouselImage
                src={images[currentImageIndex]}
                alt={`Image ${currentImageIndex + 1}`}
              />
            )}
          </CarouselContainer>
          <RightButton onClick={goToNext} />
        </ContentWrapper>
        <CustomButton src={btn_backtomap_desktop} onClick={handleButtonClick} />
      </StyledContainer>
      <CustomModal
        isOpen={s_isOpen}
        onClose={() => {
          set_s_isOpen(false);
        }}
        imageSrc={popup_museum_mission}
        useType="map"
      />
    </CenteredWrapper>
  );
};

export default Museum;
