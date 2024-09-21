import { useState } from "react";
import axios from "axios";
const useAddToGoogleSheet = (sheetName = "總表") => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addData = async (data) => {
    setLoading(true);
    setError(null);

    try {
      // const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
      // const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
      // const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}:append?valueInputOption=USER_ENTERED&key=${apiKey}`;
      const url = `https://script.google.com/macros/s/AKfycbxi0phq3tlKJS2CvtnvMHJL6Otb6fsod_slkFM0A03XsbqE6jH8MNRZPm77kFRCfOVzFw/exec`;

      // const response = await axios.post(url, {
      //   values: [[data.UUID, data.route, data.name]],
      // });

      const response = await axios.get(url, {
        params: {
          UUID: data.UUID,
          name: data.name,
          route: data.route,
          time: data.time,
        },
      });

      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { addData, loading, error };
};

export default useAddToGoogleSheet;
