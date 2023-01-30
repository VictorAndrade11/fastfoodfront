import React, { createContext } from "react";
import useSWR from "swr";
import { getFetcher } from "../utils/AxiosFetcher";

export const categoriesContext = createContext({});

export function CategoriesProvider({ children }) {
  const { data, isLoading, error } = useSWR(
    "http://20.226.76.133:3333/api/categories",
    getFetcher
  );

  return (
    <categoriesContext.Provider value={{ categories: data, isLoading, error }}>
      {children}
    </categoriesContext.Provider>
  );
}
