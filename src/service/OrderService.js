import { api } from "../utils/api";

export const getOrders = async () => {
  const orders = await api.get("/product")
  console.log(orders);
}