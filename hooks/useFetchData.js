const { default: axios } = require("axios");
const { useState, useEffect } = require("react");

function useFetchData(apiEndPoint) {
  const [alldata, setAlldata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    const fetchAllData = async () => {
      try {
        const res = await axios.get(apiEndPoint);
        const allData = res.data;
        setAlldata(allData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog data", error);
        setLoading(false);
      }
    };
    if (apiEndPoint) {
      fetchAllData();
    }
  }, [initialLoad, apiEndPoint]);
  return [alldata, loading];
}

export default useFetchData;
