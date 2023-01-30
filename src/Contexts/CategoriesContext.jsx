import React, { createContext } from "react";
import useSWR from "swr";
import { getFetcher } from "../utils/AxiosFetcher";

export const categoriesContext = createContext({});

export function CategoriesProvider({ children }) {
  const { data, isLoading, error } = useSWR(
    "http://127.0.0.1:3333/api/categories",
    getFetcher
  );

  return (
    <categoriesContext.Provider value={{ categories: data, isLoading, error }}>
      {children}
    </categoriesContext.Provider>
  );
}
