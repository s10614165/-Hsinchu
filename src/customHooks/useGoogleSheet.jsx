import { useState, useEffect } from "react";
import axios from "axios";

const useGoogleSheet = (range = "總表!A1:Z10") => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
        const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
        // const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`;
        // const url = `https://sheets.googleapis.com/v4/spreadsheets/1nqnQV1dAl9oui0v5X_p-1WgDouPHCiwLBFlH1WHTM8w/values/總表!A1:D21?key=AIzaSyAuZVVtZpRqaF20impBdsELzuNNXqD8Xo8`;
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

        const response = await axios.get(url);
        setData(response.data.values);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [range]);

  return { data, loading, error };
};

export default useGoogleSheet;
