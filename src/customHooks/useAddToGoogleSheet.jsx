import { useState } from "react";
import axios from "axios";

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

const useAddToGoogleSheet = (sheetName = "總表") => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuc, setIsSuc] = useState(false);

  const addData = async (data) => {
    setLoading(true);
    setError(null);
    setIsSuc(false);
    try {
      if (!GOOGLE_SCRIPT_URL) {
        throw new Error("Google Script URL is not defined");
      }

      const response = await axios.get(GOOGLE_SCRIPT_URL, {
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