import React from "react";
import styles from "./GameInterface.module.css";
import titleImg from "@/assets/Title.png";
import startContext from "@/assets/startContext.png";
import gameStartImage from "@/assets/gameStart.png";

const GameInterface = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={titleImg} alt="源大覺醒" className={styles.logoImage} />
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.characterImage}>
          <img
            src={startContext}
            alt="在開始任務前，要跟你說明一下，有很多組入馬一起行動，在越短的時間完成任務就能被排在任務排行榜的前20名喔！試著用最短的時間來完成任務吧！"
            className={styles.characterImageStyle}
          />
        </div>

        <div className={styles.startButton}>
          <button
            className={styles.customButton}
            style={{ backgroundImage: `url(${gameStartImage})` }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1.05)")}
          >
            <span className={styles.hiddenSpan}>遊戲計時開始</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default GameInterface;
