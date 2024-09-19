function calculateTimeDifference(time1, time2) {
  // 將ISO 8601格式的時間字符串轉換為Date對象
  const date1 = new Date(time1);
  const date2 = new Date(time2);

  // 計算差異（毫秒）
  let diff = Math.abs(date2 - date1);

  // 轉換為小時、分鐘和秒
  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;
  const minutes = Math.floor(diff / 60000);
  diff %= 60000;
  const seconds = Math.floor(diff / 1000);

  // 格式化輸出
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
  export default calculateTimeDifference