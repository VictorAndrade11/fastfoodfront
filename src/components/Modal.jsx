import imageBurger from "../assets/images/hamb01.png";
import Extras from "./Extras";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { OrderPrice } from "./OrderPrice";
import { useCart } from "../stores/useCart";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useProductModal } from "../stores/useProductModal";
import { getFetcher } from "../utils/AxiosFetcher";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";

/*const order = {
  id: 1,
  username: "Night",
  products: [
    {
      name: "X-Salada",
      observations: "Gostoso, mas tem veneno",
      price: 35.5,
      ingredients: [
        {
          icon: "🍔",
          name: "Pão",
        },
      ],
    },
  ],
  status: "WAITING",
  createdAt: new Date(),
};*/

export const Modal = () => {
  const [productQuantity, setProductQuantity] = useState(1);
  const [currentProduct, setCurrentProduct] = useState({});
  const [observations, setObservations] = useState("");

  const navigate = useNavigate();

  const {
    state: { productId },
    actions: { closeProductModal },
  } = useProductModal((x) => x);

  const {
    data: product,
    error,
    isLoading,
  } = useSWR(`http://20.226.76.133:3333/api/products/${productId}`, getFetcher);

  const {
    actions: { addToCart, removeProductFromCart },
  } = useCart((z) => z);

  const formatCurrency = (value) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleIncrement = () => {
    setProductQuantity((prevState) => prevState + 1);
  };

  const handleDecrement = () => {
    if (productQuantity > 1) {
      setProductQuantity((prevState) => prevState - 1);
    }
  };

  const addProductToCart = () => {
    const productObj = {
      productId,
      observations: observations,
      quantity: productQuantity,
    };

    setCurrentProduct(productObj);
    addToCart(productObj);
  };

  const stayAddProduct = () => {
    addProductToCart();
    closeProductModal();
  };

  const makeOrder = () => {
    addProductToCart();
    closeProductModal();
    navigate("/payment");
  };

  return (
    <div
      className="fixed z-40 w-full h-full bg-black-900/50 overflow-y-auto p-10 flex items-baseline justify-center"
      style={{ scrollbarWidth: "none" }}
    >
      {!isLoading && product ? (
        <div className="w-72 flex flex-col justify-center items-center p-6 font-roboto bg-white-100 rounded-xl sm:w-[28rem] sm:left-[calc(50%_-_14rem)] lg:w-[42rem] lg:left-[calc(50%_-_21rem)] lg:items-start lg:py-12 mt-12 gap-4">
          <div className="w-full flex justify-between items-center ">
            <h2 className="text-lg font-bold sm:text-xl">Revise seu pedido</h2>
            <button>
              <IoClose onClick={closeProductModal} className="w-6 h-6" />
            </button>
          </div>
          <div className="w-full flex flex-col items-center sm:items-start sm:flex-row ">
            <button className="w-48 h-32 overflow-hidden relative rounded-xl shadow-lg mb-6 sm:w-52 sm:mb-0 sm:mr-4">
              <div className="w-full h-full bg-red-400">
                <img
                  src={
                    product.image
                      ? `http://20.226.76.133:3333/uploads/${product.image.name}`
                      : ""
                  }
                  className="absolute z-20 top-[20px] left-[20%] w-3/5"
                />
              </div>
              <div className="absolute bottom-0 w-full h-2/4 flex flex-col justify-between items-center px-4 py-6 rounded-t-2xl bg-white-100 font-bold"></div>
            </button>
            <div className="w-full text-center sm:text-left">
              <h3 className="mb-2 font-bold">{product.observations}</h3>
              <p className="mb-6">{product.observations}</p>
              <div className="w-full flex justify-between items-center mx-auto">
                <div className="w-fit flex items-center gap-3 border-[1px] border-green-900 rounded-full">
                  <button
                    onClick={handleDecrement}
                    className="w-9 h-9 flex justify-center items-center text-white-50 bg-green-900 rounded-full"
                  >
                    <AiOutlineMinus />
                  </button>
                  <span className="text-green-900 font-bold">
                    {productQuantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="w-9 h-9 flex justify-center items-center text-white-50 bg-green-900 rounded-full"
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
                <small className="text-xl font-bold">
                  {formatCurrency(product.price)}
                </small>
              </div>
            </div>
          </div>

          <Extras />
          <div className="w-full flex flex-col">
            <h3 className="mb-2 font-bold ">Observações</h3>
            <textarea
              className="w-full h-24 p-2 border-[1px] border-green-900 rounded-xl"
              onChange={(e) => {
                setObservations(e.target.value);
              }}
            ></textarea>
          </div>
          <div
            className={`w-full flex flex-col items-center justify-center sm:w-full`}
          >
            <div className="px-8 py-6 mb-6 rounded-md border-black-50 border-[1px] sm:w-full">
              <ul className="mb-16">
                <li className="flex justify-between ">
                  <h4 className="text-lg font-normal">
                    {productQuantity}x {product.name}
                  </h4>
                  <small className="text-lg font-semibold">
                    {formatCurrency(product.price * productQuantity)}
                  </small>
                </li>
              </ul>
              <div className="py-4 border-t-[1px] border-dashed border-black-100">
                <h5 className="font-semibold">Total do pedido:</h5>
                <span className="text-2xl font-bold sm:text-3xl">
                  {formatCurrency(product.price * productQuantity)}
                </span>
              </div>
            </div>
            <div className="flex w-full justify-end items-center gap-6">
              <button
                className="p-2 font-bold text-green-900 rounded-2xl border-[1px] border-green-900 sm:w-36 lg:w-48"
                onClick={() => stayAddProduct()}
              >
                Continuar adicionando
              </button>
              <button
                className="p-2 font-bold text-white-100 bg-green-900 rounded-2xl border-[1px] border-green-900 sm:w-36 lg:w-48"
                onClick={() => makeOrder()}
              >
                Fazer pedido
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Carregando</div>
      )}
    </div>
  );
};

/*

<div className='text-center'>
  <h3 className='mb-2 font-bold'>{order.products.name}</h3>
  <p className='mb-6'>{order.products.observations}</p>
  <div className='w-full flex justify-between items-center mx-auto'>
    <div className='w-fit flex items-center gap-3 border-[1px] border-green-900 rounded-full'>
      <button onClick={handleDecrement} className='w-9 h-9 text-white-100 bg-green-900 rounded-full'>-</button>
      <span className='text-green-900 font-bold'>{test}</span>
      <button onClick={handleIncrement} className='w-9 h-9 text-white-100 bg-green-900 rounded-full'>+</button>
    </div>
    <small className='text-xl font-bold'>R${order.products.price}</small>
  </div>
</div>

*/
