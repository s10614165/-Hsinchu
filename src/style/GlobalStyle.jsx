import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Noto Sans CJK TC';
    src: url('/path/to/NotoSansCJKtc-Bold.otf') format('opentype');
    font-weight: bold;
    font-style: normal;
  }
`;

export default GlobalStyle;
