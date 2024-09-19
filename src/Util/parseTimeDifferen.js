function parseTimeDifference(timeDiff) {
    // 將時間字符串分割為小時、分鐘和秒
    const [hours, minutes, seconds] = timeDiff.split(':').map(Number);
  
    // 將每個時間單位轉換為單獨的數字
    const result = [
      Math.floor(hours / 10),  // 小時十位
      hours % 10,              // 小時個位
      Math.floor(minutes / 10), // 分鐘十位
      minutes % 10,            // 分鐘個位
      Math.floor(seconds / 10), // 秒十位
      seconds % 10             // 秒個位
    ];
  
    return result;
  }

  export default parseTimeDifference