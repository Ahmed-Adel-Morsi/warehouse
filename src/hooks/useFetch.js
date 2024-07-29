import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFetch = (fetchHandler, stateName, params) => {
  const [loading, setLoading] = useState(false);
  const data = useSelector((state) => state[stateName]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const filterItems = (e) => {
    const value = e.target.value;
    setFilteredData(
      data.filter((record) => {
        const codeAndName = `${record.name} ${record.code ? record.code : ""} ${
          record.invoiceNumber ? record.invoiceNumber : ""
        }`.toLowerCase();
        return codeAndName.includes(value.toString().toLowerCase());
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (params) {
          await dispatch(fetchHandler(params)).unwrap();
        } else {
          await dispatch(fetchHandler()).unwrap();
        }
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, fetchHandler, params]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return {
    filteredData,
    error,
    loading,
    filterItems,
  };
};

export default useFetch;
