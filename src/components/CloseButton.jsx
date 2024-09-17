import React from "react";
import closeIcon from "@/assets/close.png";
const CloseIframeButton = () => {
  const handleClick = () => {
    const isInIframe = window.self !== window.top;

    if (isInIframe) {
      console.log(first);
      try {
        // 嘗試通知父窗口關閉 iframe
        window.parent.postMessage("closeIframe", "*");

        // 立即隱藏 iframe 內容
        document.body.style.display = "none";

        // 如果是 iframe，嘗試將自身設置為 display: none
        if (window.frameElement) {
          window.frameElement.style.display = "none";
        }

        // 清空內容以釋放資源
        setTimeout(() => {
          document.body.innerHTML = "";
        }, 100);
      } catch (error) {
        console.error("無法完全隱藏或關閉 iframe:", error);
      }
    } else {
      // 非 iframe 的情況保持不變
      const closeMethodsToTry = [
        () => window.close(),
        () => window.open("", "_self").close(),
        // () => window.open("about:blank", "_self").close(),
      ];

      for (const closeMethod of closeMethodsToTry) {
        try {
          closeMethod();
        } catch (error) {
          console.warn("關閉窗口的嘗試失敗:", error);
        }
      }

      // 如果所有方法都失敗，清空並隱藏頁面內容
      document.body.innerHTML = "<h1>窗口已關閉，請手動關閉此標籤頁。</h1>";
      document.body.style.display = "none";
    }
  };

  const buttonStyle = {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
  };

  const imgStyle = {
    width: "32px",
    height: "32px",
    backgroundColor: "black",
    transition: "transform 0.2s ease-in-out",
  };

  const handleMouseEnter = (e) => {
    e.target.style.transform = "scale(1.1)";
  };

  const handleMouseLeave = (e) => {
    e.target.style.transform = "scale(1)";
  };

  return (
    <button onClick={handleClick} style={buttonStyle}>
      <img
        src={closeIcon}
        alt="Close"
        style={imgStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </button>
  );
};

export default CloseIframeButton;
