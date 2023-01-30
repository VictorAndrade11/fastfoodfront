import React, { useState, useContext } from "react";
import { IoWallet, IoCard } from "react-icons/io5";
import { FaMoneyBill } from "react-icons/fa";

import { RadioComponent } from "../components/radioComponent";
import { FinishOrderModal } from "../components/finishOrderModal";
import { useCart } from "../stores/useCart";
import axios from "axios";
import { ordersContext } from "../Contexts/OrdersContext";
import { useNavigate } from "react-router-dom";
import { productsContext } from "../Contexts/ProductsContext";

const radioOptions = [
  {
    icon: <IoCard className=" text-green-700" />,
    value: "crédito",
    name: "option_credit",
  },
  {
    icon: <IoCard className=" text-green-700" />,
    value: "débito",
    name: "option_debit",
  },
  {
    icon: <FaMoneyBill className=" text-green-700" />,
    value: "dinheiro",
    name: "option_money",
  },
];

export function Payment() {
  const [selectedOption, setSelectedOption] = useState(radioOptions[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);

  const { orders, setOrders } = useContext(ordersContext);
  const { products, isLoading: productIsLoading } = useContext(productsContext);

  const {
    state: { cart },
    actions: { clearCart },
  } = useCart((z) => z);

  const formatCurrency = (value) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  async function createOrder() {
    if (!cart.length) {
      alert("Adicione um produto ao carrinho");
      return;
    }
    if (username === "") {
      alert("Preencha o nome");
      return;
    }

    setButtonDisable(true);

    try {
      const payload = {
        products: cart,
        userName: username,
      };
      const { data: order } = await axios.post(
        "http://127.0.0.1:3333/api/orders",
        payload
      );

      if (order) {
        console.log([...orders, order]);
        setOrders([...orders, order]);
        setIsModalOpen(true);
        setButtonDisable(false);
        clearCart();
      }
    } catch (err) {
      setButtonDisable(false);
      throw new Error(err);
    }
  }
  const navigate = useNavigate();

  return (
    <>
      <FinishOrderModal isOpened={isModalOpen} />
      <div className="mx-auto w-fit px-6 py-16 font-roboto">
        {" "}
        {/* p-16 flex-col items-center justify-center // flex w-full p-16 font-roboto flex-col */}
        <div className="flex justify-start h-fit items-center gap-4 px-10 w-full ">
          <IoWallet className="w-6 h-6 text-green-800" />
          <h1 className="text-lg font-bold sm:text-xl md:text-3xl">
            Pagamento
          </h1>
        </div>
        <div className="flex justify-center w-full bg-white flex-col  md:flex-row">
          <div className="flex flex-col w-full p-0 gap-4 md:p-10">
            <h1 className="text-lg font-bold sm:text-xl md:text-1xl ">
              Resumo da compra
            </h1>

            {!productIsLoading && (
              <div className=" ">
                {/* w-full flex flex-col items-center justify-center */}
                <div className="w-full px-8 py-6 rounded-md border-black-50 border-[1px]  ">
                  <ul className=" ">
                    {cart.map((item) => {
                      const completeItem = products.find(
                        (p) => p.id === item.productId
                      );
                      return (
                        <li className="flex justify-between ">
                          <h4 className="text-lg font-normal">
                            {item.quantity}x {completeItem.name}
                          </h4>
                          <small className="text-lg font-semibold">
                            {formatCurrency(completeItem.price)}
                          </small>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="py-4 border-t-[1px] border-dashed border-black-100 flex justify-between ">
                    <h5 className="font-semibold">Total do pedido:</h5>
                    <span className="text-2xl font-bold sm:text-3xl">
                      {formatCurrency(
                        cart.reduce(
                          (acc, item) =>
                            acc +
                            products.find((p) => p.id === item.productId)
                              .price *
                              item.quantity,
                          0
                        )
                      )}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className="w-full flex gap-2">
              <div className="w-full flex flex-col">
                <label htmlFor="nome" className="font-bold text-xl">
                  Nome do cliente
                </label>
                <input
                  name="nome"
                  className="px-2 py-1 rounded-sm bg-black-50/25 outline-0 w-full "
                  placeholder="Primeiro nome"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-1/5">
                <label htmlFor="codigo" className="font-bold text-xl w-full">
                  Código
                </label>
                <input
                  disabled={true}
                  name="codigo"
                  type="number"
                  className="px-2 py-1 rounded-sm bg-black-50/25 outline-0 "
                  value={200}
                />
              </div>
            </div>
          </div>

          {/* lado direito da tela*/}

          <div className="w-full flex flex-col p-0 gap-4 md:p-10">
            <h1 className="text-lg font-bold sm:text-xl md:text-1xl">
              Selecione a forma de Pagamento:{" "}
            </h1>
            <div className=" flex flex-col w-full gap-4 ">
              {radioOptions.map((option) => {
                return (
                  <RadioComponent
                    icon={option.icon}
                    value={option.value}
                    name={option.name}
                    isChecked={selectedOption === option}
                    onChange={() => setSelectedOption(option)}
                  />
                );
              })}
            </div>
            <div className="w-full flex gap-3">
              <div className="flex flex-col w-1/2">
                <label htmlFor="valor" className="font-bold text-xl">
                  Valor Entregue
                </label>
                <input
                  name="valor"
                  type="number"
                  min="0"
                  className="px-2 py-1 rounded-sm bg-black-50/25 outline-0 w-full "
                  placeholder="R$ 30,50"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label htmlFor="troco" className="font-bold text-xl w-full">
                  Troco
                </label>
                <input
                  name="troco"
                  type="number"
                  min="0"
                  className="px-2 py-1 rounded-sm bg-black-50/25 outline-0 "
                  placeholder="R$ 0,00"
                />
              </div>
            </div>
            <div className="flex justify-end w-full gap-8 px-16 md:p-0 ">
              <button
                className="py-2 p-12 font-bold text-green-900 rounded-2xl border-[1px] border-green-900 w-fit"
                onClick={() => {
                  navigate("/");
                }}
              >
                Cancelar
              </button>
              <button
                disabled={buttonDisable}
                className="py-2 p-12 font-bold text-white-100 bg-green-900 rounded-2xl border-[1px] border-green-900 w-fit"
                onClick={createOrder}
              >
                Finalizar pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
