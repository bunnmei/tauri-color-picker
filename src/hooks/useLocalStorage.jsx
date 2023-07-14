import { useEffect, useState } from "react";

const useLocalStorage = (key, defaultVal) => {
  const [val, setVal] = useState(() => {
    const lclVal = window.localStorage.getItem(key);
    if (lclVal === null) {
      return defaultVal
    }

    return lclVal
  })

  useEffect(() => {
    window.localStorage.setItem(key, val)
  },[val, setVal])

  return [val, setVal];
}

export default useLocalStorage