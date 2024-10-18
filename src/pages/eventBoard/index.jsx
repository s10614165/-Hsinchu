import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import btn_backtomap_desktop from "@/assets/btn_backtomap_desktop.png";
import guideline_label_desktop from "@/assets/guideline_label_desktop.png";
import guideline_label_mobile from "@/assets/guideline_label_mobile.png";
import guideline_logo_mobile from "@/assets/guideline_logo_mobile.png";
import btn_home_desktop from "@/assets/btn_home_desktop.png";

import AImg from "@/assets/A.svg";
import BImg from "@/assets/B.svg";
import CImg from "@/assets/C.svg";
import DImg from "@/assets/D.svg";
import GlobalStyle from "../../style/GlobalStyle.jsx";

import FImg from "@/assets/F.svg";
import img_mission_complete from "@/assets/img_mission_complete.png";
import styled from "styled-components";
import CustomModal from "@/components/CustomModal";
import popup_theater from "@/assets/popup_theater.png";

const CenteredWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* min-height: 100vh; */
  /* height: 100vh; */
  width: 100%;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 10px;
  /* background-color: red; */
  width: 90%;
  /* min-height: 80vh; // 改為 100vh 以確保全屏高度 */
  /* padding: 90px 60px 0px; // 增加頂部 padding 為 TitleImage 留出空間 */
  box-sizing: border-box;
  background-image: url(${guideline_label_desktop});

  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  @media (max-width: 768px) {
    padding: 50px 15px 30px;
  }

  @media (max-width: 480px) {
    padding: 80px 10px 20px;

    background-image: url(${guideline_label_mobile});
  }
`;
const StyledContainerII = styled.div`
  display: flex;

  justify-content: space-between;
  /* margin-top: 49px; */
  /* align-items: center; */
  width: 90%;
  gap: 26px;
  max-width: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    /* padding: 0px 20px; */
  }
`;

const StyledImage = styled.img`
  width: 200px;
  height: 82px;
  object-fit: contain;
  @media (max-width: 480px) {
    width: 120px;
    height: 31px;
  }
`;
const StyledTitleImage = styled.img`
  margin-top: 10px;
  width: 397px;
  height: 101px;
  object-fit: contain;
  @media (max-width: 480px) {
    width: 397px;
    height: 101px;
  }
`;

const StyledText = styled.div`
  width: 100%;
  text-align: left;
  padding: 10px 0;
  white-space: pre-wrap;
  word-break: break-all;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
  font-family: "Noto Sans CJK TC", sans-serif;

  @media (max-width: 480px) {
    font-size: 15px;
    text-align: ${({ index }) => (index === 0 ? `center` : `left`)};

    width: ${({ index }) => (index === 3 ? `100%` : ` 90%`)};
  }
`;

const FooterText = styled(StyledText)`
  margin-top: 20px;
  text-align: left;
  font-weight: bold;
`;

const CustomButton = styled.button`
  background-size: contain;
  background-repeat: no-repeat;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: transparent;
  font-size: 0;
  transition: transform 0.3s ease;
  background-image: ${({ src }) => `url(${src})`};
  width: 15%;
  height: 0;
  max-width: 167px;
  max-height: 168px;

  @media (max-width: 480px) {
    width: 55%;
    min-width: 103px;
    min-height: 94px;
  }
`;
const CustomButtonBack = styled(CustomButton)`
  /* bottom: 5%; */
  /* left: 50%; */
  width: 20%;
  height: 87px;
  max-width: 209px;
  max-height: 62px;

  @media (max-width: 480px) {
    width: 30%;
    padding-bottom: 0;
    min-width: 171px;
    min-height: 51px;
  }
`;

const StyledList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin: 0;
  /* background: #fff; */
  padding-top: ${({ index }) => (index === 4 ? `10px` : ` none`)};
  @media (max-width: 480px) {
    font-size: 20px;
    text-align: ${({ index }) => (index === 0 ? `center` : `left`)};
    /* width: 90%; */
    width: ${({ index }) => (index === 3 ? `100%` : ` 90%`)};
    background: #fff;
    box-sizing: border-box;
  }
`;
const StyledListItem = styled.li`
  /* margin-bottom: 10px; */
`;
const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* text-align:; */
  flex: 1;
  justify-content: end;
  @media (max-width: 480px) {
    font-size: 20px;
    text-align: ${({ index }) => (index === 0 ? `center` : `left`)};
    width: 90%;
    flex: none;

    /* background-color: #fff; */
  }
`;
const Theater = () => {
  const navigate = useNavigate();

  const ary = [
    {
      img: AImg,
      text: "113年10月21日起至113年12月9日止。",
    },
    {
      img: BImg,
      text: "學生組：（國小中低年級組、國小高年級組及國中組）：就讀新竹縣轄內之國民中學、國民小學在學學生。\n社會組：社會大眾（含高中職以上學生）。",
    },
    {
      img: FImg,
      text: "學生組：國小中低年級組及國小高年級組抽出110名得獎者、國中組70名，每名致贈300元超商禮物卡。\n社會組：抽出50 名得獎者，每名致贈300元超商禮物卡。",
    },
    {
      img: DImg,
      text: "選擇符合資格之組別進入，完成電影院、美術館及遊樂園3關卡後，抽獎趣會解鎖，即可進入填寫基本資料參加抽獎。\n電影院：觀看動畫或影片\n美術館：參觀線上藝廊\n遊樂園：完成租稅遊戲\n抽獎趣：填寫基本資料參加抽獎(每人限填答1次)",
    },
    {
      img: CImg,
      text: "活動結束後，由本局進行電腦隨機抽獎，得獎名單於活動結束1個月內公布於本局網站。\n社會組獎項以掛號寄發予得獎人，學生組獎項，委請獲獎學生之學校辦理領獎事宜。\n得獎者資料若不符合參加資格（學生組須就讀於新竹縣轄內之國中、小學在學學生），本局將取消領獎資格，中獎名額取消不再另行抽獎。\n若因得獎人之個人資料填寫不完整或不正確，導致得獎信件無法送達或退回者，視同得獎者自願放棄中獎資格，且獎項不另行補發，中獎名額取消不再另行抽獎。\n主辦單位保有一切修改或補充本活動辦法及注意事項規範之權利。如對本活動辦法及注意事項之規範有疑義或爭議時，主辦單位擁有最終解釋權及決定權。如有未盡事宜，主辦單位得隨時補充公告。",
    },
  ];
  return (
    <>
      <GlobalStyle />
      <CenteredWrapper>
        <StyledContainer>
          <StyledTitleImage src={guideline_logo_mobile} />
          {ary.map((item, index) => (
            <StyledContainerII key={index}>
              <StyledImage src={item.img} alt={`Image ${index + 1}`} />
              {index === 3 ? (
                <FlexContainer>
                  <StyledText index={index}>
                    {item.text.split("\n")[0]}
                  </StyledText>
                  <StyledList index={index}>
                    {item.text
                      .split("\n")
                      .slice(1)
                      .map((line, lineIndex) => (
                        <StyledListItem key={lineIndex}>
                          <StyledText as="span" index={index}>
                            {line}
                          </StyledText>
                        </StyledListItem>
                      ))}
                  </StyledList>
                </FlexContainer>
              ) : index === 4 ? (
                <StyledList index={index}>
                  {item.text.split("\n").map((line, lineIndex) => (
                    <StyledListItem index={index} key={lineIndex}>
                      <StyledText as="span" index={index}>
                        {line}
                      </StyledText>
                    </StyledListItem>
                  ))}
                </StyledList>
              ) : (
                <StyledText index={index}>{item.text}</StyledText>
              )}
            </StyledContainerII>
          ))}
          <StyledContainerII key={99999}>
            <StyledImage
              style={{ visibility: "hidden" }}
              src={ary[0].img}
              alt={`Image ${9999 + 1}`}
            />
            <StyledText>
              {"如對活動辦法有任何疑問，歡迎洽詢03-5518141轉221楊小姐。"}
            </StyledText>
          </StyledContainerII>
        </StyledContainer>
        <CustomButtonBack
          src={btn_home_desktop}
          onClick={() => navigate("/")}
        />
      </CenteredWrapper>
    </>
  );
};

export default Theater;

/* background-image: url(${guideline_label_mobile}); */
