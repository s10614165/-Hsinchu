import { useState } from "react";
import axios from "axios";

const useAddToGoogleSheet = (sheetName = "總表") => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuc, setIsSuc] = useState(false);

  const addData = async (data) => {
    setLoading(true);
    setError(null);
    setIsSuc(false);
    try {
      //我的
      const url = `https://script.google.com/macros/s/AKfycbxi0phq3tlKJS2CvtnvMHJL6Otb6fsod_slkFM0A03XsbqE6jH8MNRZPm77kFRCfOVzFw/exec`;
      //公司
      // const url = `https://script.google.com/macros/s/AKfycbz2DpDSG10YTHMy6F2FlPTyXxpxO_awHqMizMXHF_ULW-5TYcgVw_4eUxOJogPhZSvl/exec`;

      const response = await axios.get(url, {
        params: {
          UUID: data.UUID,
          name: data.name,
          route: data.route,
          time: data.time,
        },
      });

      setLoading(false);
      setIsSuc(true);
      return response.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      setIsSuc(false);
      throw err;
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setIsSuc(false);
  };

  return { addData, loading, error, isSuc, reset };
};

export default useAddToGoogleSheet;
