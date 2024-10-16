import React, { useState, useEffect } from "react";

const Map = () => {
  const [s_currentGroup, set_s_CurrentGroup] = useState("");
  const [s_groupActivities, set_s_GroupActivities] = useState({});

  useEffect(() => {
    // 1. 在初始化時從 localStorage 中找尋 currentGroup
    const storedCurrentGroup = localStorage.getItem("currentGroup");
    console.log(storedCurrentGroup);
    if (storedCurrentGroup) {
      set_s_CurrentGroup(storedCurrentGroup);

      // 2. 根據 currentGroup 找尋對應的值並進行 JSON 解析
      const storedGroupActivities = localStorage.getItem(storedCurrentGroup);
      if (storedGroupActivities) {
        try {
          const parsedGroupActivities = JSON.parse(storedGroupActivities);
          set_s_GroupActivities(parsedGroupActivities);
        } catch (error) {
          console.error("Error parsing group activities:", error);
        }
      }
    }
  }, []);

  return <div></div>;
};

export default Map;
