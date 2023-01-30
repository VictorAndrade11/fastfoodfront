import { createContext, useEffect, useState } from "react";
import useSWR from "swr";
import { getFetcher } from "../utils/AxiosFetcher";

export const ordersContext = createContext({});

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const { data, error, isLoading } = useSWR(
    `http://127.0.0.1:3333/api/orders`,
    getFetcher
  );

  useEffect(() => {
    if (!isLoading) setOrders(data);
  }, [data]);

  return (
    <ordersContext.Provider value={{ orders, error, isLoading, setOrders }}>
      {children}
    </ordersContext.Provider>
  );
}
