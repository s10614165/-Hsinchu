import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import styled from "styled-components";

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
    padding: 50px 15px 90px;
  }

  @media (max-width: 480px) {
    padding: 80px 10px 50px;

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
    /* background: #fff; */
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
      text: "114年10月28日起至114年12月5日止 。",
    },
    {
      img: BImg,
      text: "學生組（國小中低年級組、國小高年級組、國中組）：就讀新竹縣轄內之國民中學、國民小學在學學生。\n社會組：社會大眾（含高中職以上學生）。",
    },
    {
      img: FImg,
      text: "(一)分為三階段抽獎：\n1.第一階段：114年10月28日起至114年11月9日。\n2.第二階段：114年11月10日起至114年11月22日。\n3.第三階段：114年11月23日起至114年12月5日。\n(二)各組別獎項：\n1.國小組（含國小中低年級組及國小高年級組）活動闖關獎：\n第一、二階段每階段各抽出500元禮券6名、300元禮券35名；第三階段抽出500元禮券8名、300元禮券40名（總獎項為500元禮券共20名；300元禮券共110名）。\n2.國中組活動闖關獎：\n第一、二階段每階段各抽出500元禮券3名、300元禮券15名；第三階段抽出500元禮券4名、300元禮券20名（總獎項為500元禮券共10名；300元禮券共50名）。\n3.社會組：\n(1)活動闖關獎：第一、二階段每階段各抽出500元禮券3名、300元禮券30名；第三階段抽出500元禮券4名、300元禮券40名（總獎項為500元禮券共10名；300元禮券共100名）。\n(2)AI達人挑戰獎：500元禮券10名。",
    },
    {
      img: DImg,
      text: "選擇符合資格之組別進入，完成電影院及美術館關卡後，問答挑戰趣/ AI達人挑戰趣會解鎖，即可進入回答租稅問答，並填寫基本資料參加抽獎，每人每階段限填答1次。\n※社會組於「AI達人挑戰趣」關卡內可加碼參加AI挑戰，運用生成式AI工具（如：Copilot、ChatGPT、Gemini等）發想20字以內之宣導標語，須與地方稅節稅資訊、房屋稅2.0、雲端發票及統一發票兌獎APP、納稅者權利保護法、稅籍異動即時通等稅務知識相關，並上傳1-3張使用上述生成式AI工具生成標語之指令截圖畫面佐證。\n學生組：\n電影院(觀看動畫)→美術館(參觀線上藝廊)→問答挑戰趣(完成租稅問答，並填寫基本資料參加抽獎，每人每階段限填答1次)\n社會組：\n電影院(觀看影片)→美術館(參觀線上藝廊)→AI達人挑戰趣(可加碼參加AI挑戰，也可僅完成租稅問答並填寫基本資料後，參加活動闖關獎之抽獎，每人每階段限填答1次)",
    },
    {
      img: CImg,
      text: "活動闖關獎：活動結束後，擇期由本局實體抽獎，抽獎過程將以本局官方臉書粉絲專頁直播，得獎名單將於各階段活動結束後2個星期內公布於本局網站，惟每人限得獎1次。\nAI達人挑戰獎：將於活動結束後進行評選，依「租稅主題及內容完整性」與「創意及趣味性」評選出10位優勝者，每位獲得500元禮券，每人限得獎1次。\n社會組獎項以掛號寄發予得獎人；學生組獎項，委請獲獎學生之學校辦理領獎事宜\n得獎者資料若不符合參加資格（如學生組須就讀於新竹縣轄內之國中、小學在學學生等），本局將取消領獎資格，中獎名額取消不再另行抽獎。\n若因得獎人之個人資料填寫不完整或不正確，導致得獎信件無法送達或退回者，視同得獎者自願放棄中獎資格，且獎項不另行補發，中獎名額取消不再另行抽獎。\n主辦單位保有一切修改或補充本活動辦法及注意事項規範之權利。如對本活動辦法及注意事項之規範有疑義或爭議時，主辦單位擁有最終解釋權及決定權。如有未盡事宜，主辦單位得隨時補充公告。",
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
                    <StyledText index={index}>
                    {item.text.split("\n")[1]}
                  </StyledText>
                  <StyledList index={index}>
                    {item.text
                      .split("\n")
                      .slice(2)
                      .map((line, lineIndex) => 
                        lineIndex % 2 === 1 ? (
                          <StyledText as="span" index={index} key={lineIndex}>
                            {line}
                          </StyledText>
                        ) : (
                          <StyledListItem key={lineIndex}>
                            <StyledText as="span" index={index}>
                              {line}
                            </StyledText>
                          </StyledListItem>
                        )
                      )}
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
