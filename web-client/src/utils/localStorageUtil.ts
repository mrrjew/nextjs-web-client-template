export const setLocalStorageItem = (key: string, value: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export const getLocalStorageItem = (key: string): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};

export const removeLocalStorageItem = (key: string): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const getStoredCurrency = (): string => {
  if (typeof window !== "undefined") {
    const storedCurrency = localStorage.getItem("currency");
    return storedCurrency ?? "USD";
  }
  return "USD";
};
