import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFetch = (fetchHandler, stateName, params) => {
  const data = useSelector((state) => state[stateName]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(fetchHandler(params))
      .unwrap()
      .then(() => {
        setError(null);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, fetchHandler, params]);

  return {
    data,
    error,
    loading,
  };
};

export default useFetch;
