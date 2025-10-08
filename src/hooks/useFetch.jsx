import React, { useCallback, useState } from 'react';

const useFetch = () => {
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (url, options) => {
    setLoading(true);
    let response;
    let json;
    try {
      response = await fetch(url, options);
      json = await response.json();
      if (!response.ok) throw new Error(json.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      return { response, json };
    }
  }, []);

  return { loading, request };
};

export default useFetch;
