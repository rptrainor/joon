import React from "react";

export const useDebounce = (callback: (...args: any) => void, delay: number) => {
  const debounceTimeout = React.useRef<NodeJS.Timeout | undefined>(undefined);
  return React.useCallback((...args: any) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};