import { IoClose, IoCheckmark, IoWalletOutline } from "react-icons/io5";
import { useState, useContext, useCallback } from "react";
import { ordersContext } from "../Contexts/OrdersContext";
import ordersMock from "../Mocks/ordersMock";

import imageBurger from "../assets/images/hamb01.png";
import { productsContext } from "../Contexts/ProductsContext";
import axios from "axios";

export function OrderIz({
  order,
  isFinalized = false,
  handleClick,
  handleClose,
  finalizedClose,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const { products, isLoading } = useContext(productsContext);

  //flex flex-col items-center rounded-md bg-black-50/10 w-48 h-28  p-3 shadow-2xl shadow-black sm:mx-0 sm:w-52
  //border border-green-400 shadow-green-400 shadow-lg

  return (
    <div
      className={`flex flex-col items-center justify-between px-6 py-4 w-full shadow-md gap-6 rounded-lg bg-white max-w-40 ${
        isFinalized ? "border border-green-400 shadow-green-50 shadow-xl" : ""
      }`}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex w-16 h-16 shadow-md p-2 rounded">
          <img className="object-fit" src={imageBurger} alt={order.name} />
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold">
            {order.id} - {order.userName}
          </h3>
          {order.products.map((product, index) => {
            return (
              <p key={index} className="w-36 text-black-400 lg:w-52">
                {`${product.quantity}x ${product.name}`}{" "}
              </p>
            );
          })}
        </div>
        <div className="flex items-end gap-4">
          <button
            className="grid w-10 h-10 bg-red-100 rounded-lg place-items-center"
            onClick={() => {
              isFinalized ? finalizedClose(order.id) : handleClose(order.id);
            }}
          >
            <IoClose className="w-5 h-5 text-red-500" />
          </button>
          {!isFinalized ? (
            <button
              className="grid w-10 h-10 bg-green-100 rounded-lg place-items-center"
              onClick={() => handleClick(order.id)}
            >
              <IoCheckmark className="w-5 h-5 text-green-700" />
            </button>
          ) : (
            ""
          )}
        </div>
      </div>

      {order.observations ? (
        <div
          className={`max-h-32 w-full overflow-y-hidden transition-all duration-150 ease ${
            isOpen ? "h-32" : "h-0"
          } `}
        >
          <h3 className="font-medium text-zinc-50">Observações</h3>
          <div className="w-full h-24 border border-zinc-50 rounded-md p-2 overflow-y-auto truncate">
            {order.observations}
          </div>
        </div>
      ) : null}
    </div>
  );
}
