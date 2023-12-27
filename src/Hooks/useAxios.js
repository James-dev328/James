import { useState, useEffect } from "react";
import axios from "axios";

//for interaction with the backend
const useAxios = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    if (!url) return;

    const source = axios.CancelToken.source();

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios({
          url,
          ...defaultOptions,
          ...options,
          cancelToken: source.token,
        });
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else if (error.response) {
          console.log(error.request);
        } else {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, [url]);

  return { data, error, loading };
};

export default useAxios;
