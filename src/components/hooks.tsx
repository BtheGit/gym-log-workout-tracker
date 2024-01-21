import { useState, useEffect } from "react";

/**
 *
 * @param key The querystring param identifier
 * @returns The associated value of the querystring param if found
 */
export const useQueryStringValue = (key: string) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const value = url.searchParams.get(key);
    setValue(value ?? "");
  }, [key]);

  return value;
};
