function calculateTimeDifference(time1, time2) {
  // 解析ISO 8601格式的時間字符串
  const parseISOString = (s) => {
    const b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  };

  const date1 = parseISOString(time1);
  const date2 = parseISOString(time2);

  // 計算差異（毫秒）
  let diff = Math.abs(date2 - date1);

  // 轉換為小時、分鐘和秒
  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;
  const minutes = Math.floor(diff / 60000);
  diff %= 60000;
  const seconds = Math.floor(diff / 1000);

  // 格式化輸出
  const result = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;

  // 添加控制台輸出
  // console.log(`時間差異: ${hours}時${minutes}分${seconds}秒`);

  return result;
}

export default calculateTimeDifference;
