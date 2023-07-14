import { useEffect, useState } from "react";

const useLocalStorageArr = (key, defaultVal) => {
  const [val, setVal] = useState(() => {
    const lclVal = window.localStorage.getItem(key);
    const lclData = JSON.parse(lclVal)
    if (lclData === null) {
      return defaultVal;
    }
    return lclData;
  });

  useEffect(() => {
    let json = JSON.stringify(val)
    window.localStorage.setItem(key, json);
  }, [val, setVal]);

  return [val, setVal];
};

export default useLocalStorageArr;
