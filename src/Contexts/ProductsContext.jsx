import { createContext } from "react";
import useSWR from "swr";
import { getFetcher } from "../utils/AxiosFetcher";

export const productsContext = createContext({});

export function ProductsProvider({ children }) {
  const { data, error, isLoading } = useSWR(
    `http://20.226.76.133:3333/api/products`,
    getFetcher
  );

  return (
    <productsContext.Provider value={{ products: data, error, isLoading }}>
      {children}
    </productsContext.Provider>
  );
}
