import { useContext } from "react";
import { ordersContext } from "../Contexts/OrdersContext";

export function ToDelivery() {
  const { orders, isLoading } = useContext(ordersContext);
  console.log(orders);
  return (
    <div className="w-full h-100% flex justify-center py-32 px-4 sm:flex sm:gap-4 md:gap-16 font-nunito flex-col  md:flex-row text-center ">
      <div className="flex flex-col w-full gap-10">
        <h1 className="text-2xl font-black md:text-5xl">Preparando:</h1>
        <div className="flex flex-col justify-center gap-10">
          {!isLoading && orders ? (
            orders
              .filter((order) => {
                return order.status === "PENDING";
              })
              .map((orders) => (
                <h1 className=" text-3xl font-black text-black-400 capitalize md:text-7xl ">
                  {orders.userName}
                </h1>
              ))
          ) : (
            <div>Carregando...</div>
          )}
        </div>
      </div>
      <div className="py-10 w-100% md:w-3">
        <div className="bg-black-600 w-full h-2 rounded md:h-full"></div>
      </div>
      <div className="w-full flex flex-col  gap-10">
        <h1 className="text-2xl font-black md:text-5xl">Pronto:</h1>
        <div className="flex flex-col justify-center gap-10">
          {!isLoading &&
            orders
              .filter((order) => {
                return order.status === "FINISHED";
              })
              .map((orders) => (
                <h1 className=" text-3xl font-black text-green-800 capitalize md:text-7xl ">
                  {orders.userName}
                </h1>
              ))}
        </div>
      </div>
    </div>
  );
}
