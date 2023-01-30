import Order from "../components/Order";
import { OrderIz } from "../components/OrderIz";
import { ordersContext } from "../Contexts/OrdersContext";
// src/service/OrderService.ts
import { useContext } from "react";
import axios from "axios";

const Orders = () => {
  const { orders, isLoading, setOrders } = useContext(ordersContext);

  const handleClick = function (id) {
    return axios
      .put(`http://localhost:3333/api/orders/${id}`, {
        status: "FINISHED",
      })
      .then((r) => {
        const newOrders = orders.filter((order) => order.id !== id);

        setOrders([r.data, ...newOrders].sort((a, b) => a.id - b.id));
      });
  };

  const finalizedClose = function (id) {
    return axios
      .put(`http://localhost:3333/api/orders/${id}`, {
        status: "TODELIVERY",
      })
      .then((r) => {
        const newOrders = orders.filter((order) => order.id !== id);

        setOrders([...newOrders, r.data].sort((a, b) => a.id - b.id));
      });
  };

  const handleClose = function (id) {
    return axios.delete(`http://localhost:3333/api/orders/${id}`).then(() => {
      const newOrders = orders.filter((order) => order.id !== id);
      setOrders(newOrders.sort((a, b) => a.id - b.id));
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-center px-6 py-24  font-nunito sm:flex sm:gap-4 md:gap-16 w-full ">
      <div className="mb-12 ">
        <h2 className="text-black-900 font-bold text-lg mb-2 sm:text-xl md:text-2xl md:mb-4 lg:text-3xl">
          Preparando:
        </h2>

        <div className="flex flex-col gap-6 ">
          {/* <Order />
          <Order />
          <Order />
  <Order />*/}
          {!isLoading ? (
            orders
              .filter((order) => order.status === "PENDING")
              .map((order) => (
                <OrderIz
                  key={order.id}
                  order={order}
                  finalizedClose={finalizedClose}
                  handleClose={handleClose}
                  handleClick={handleClick}
                />
              ))
          ) : (
            <div>Carregando...</div>
          )}
        </div>
      </div>
      <div className="py-8 w-1 hidden md:block ">
        <div className="bg-black-500 w-full h-full rounded"></div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-black-900 font-bold text-lg mb-2 sm:text-xl md:text-2xl md:mb-4 lg:text-3xl">
          Pronto:
        </h2>
        <div className="flex flex-col gap-6 w-full">
          {!isLoading ? (
            orders
              .filter((order) => order.status === "FINISHED")
              .map((order) => (
                <OrderIz
                  key={order.id}
                  order={order}
                  isFinalized={true}
                  finalizedClose={finalizedClose}
                  handleClose={handleClose}
                  handleClick={handleClick}
                />
              ))
          ) : (
            <div>Carregando...</div>
          )}
        </div>
      </div>
      {}
    </div>
  );
};

export default Orders;
