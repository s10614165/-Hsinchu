function millisecondsToTime(milliseconds) {
  // 確保輸入是一個非負數
  milliseconds = Math.max(milliseconds, 0);

  // 計算小時、分鐘和秒
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);

  // 將數字轉換為兩位數的字符串
  const padZero = (num) => num.toString().padStart(2, "0");

  // 返回格式化的時間字符串
  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}
export default millisecondsToTime;
