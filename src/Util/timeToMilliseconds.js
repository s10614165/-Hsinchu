function timeToMilliseconds(timeString) {
  // 將時間字符串分割為小時、分鐘和秒
  const [hours, minutes, seconds] = timeString.split(":").map(Number);

  // 計算總毫秒數
  const totalMilliseconds = hours * 3600000 + minutes * 60000 + seconds * 1000;

  return totalMilliseconds;
}
