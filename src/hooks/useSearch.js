import { useEffect, useState } from "react";

const useSearch = (data, searchKeys = []) => {
  const [filteredData, setFilteredData] = useState([]);

  const filterItems = (e) => {
    const value = e.target.value;
    setFilteredData(
      data.filter((record) => {
        let searchKeysString = "";
        for (const key of searchKeys) {
          searchKeysString += ` ${
            typeof key === "string" ? record[key] : record[key[0]][key[1]]
          }`;
        }
        return searchKeysString
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      })
    );
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return {
    filteredData,
    filterItems,
  };
};

export default useSearch;
