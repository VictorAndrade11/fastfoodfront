import { createContext, useContext, useEffect, useState } from "react";
import { Categories } from "../components/Categories";
import { Products } from "../components/Products";
import { Product } from "../components/Product";
import { productsContext } from "../Contexts/ProductsContext";
import { categoriesContext } from "../Contexts/CategoriesContext";
import { Modal } from "../components/Modal";
import { useProductModal } from "../stores/useProductModal";

import { useCart } from "../stores/useCart";
import { useNavigate } from "react-router-dom";

export const modalContext = createContext({});

export const Home = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [ProductToModal, setProductToModal] = useState(null);
  const { isOpen, productId } = useProductModal((x) => x.state);
  const {
    actions: { clearCart },
    state: { cart },
  } = useCart((z) => z);
  const [searchText, setSearchText] = useState("");
  const [productsSearch, setProductsSearch] = useState([]);
  const navigate = useNavigate();

  // useState é um hook para gerenciar. Ele devolve um variavel e uma função
  // order é uma variavel normal e setOrder é uma função para mudar o valor dessa variavel

  // <> e </> são fragmentos do react, eles são usados pq no react só pode ser retornado um nó
  // então quando queremos retornar duas tags (duas divs, etc), utilizamos ele pra envolvê-las

  const { products, isLoading: productIsLoading } = useContext(productsContext);
  const { categories, isLoading: categoriesIsLoading } =
    useContext(categoriesContext);

  function arrayToChunk(array, chunkSize) {
    let chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const row = array.slice(i, i + chunkSize);
      chunks.push(row);
    }
    return chunks;
  }
  const formatCurrency = (value) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleSearchProduct = () => {
    if (productsSearch.length === 0) {
      const searchProducts = products.filter((p) => {
        console.log(">>>>>", p, searchText);
        return p.name?.toLowerCase().includes(searchText);
      });
      setProductsSearch(searchProducts);
      return;
    }
    setProductsSearch([]);
    setSearchText("");
  };

  return (
    <>
      {isOpen && <Modal />}
      <div className="flex flex-col gap-4 mx-auto w-fit py-4 px-6 font-nunito">
        <div className="w-fit mt-8 py-4 mx-auto mb-2 sm:py-12 sm:mx-0">
          <h2 className="text-black-900 font-bold text-lg mb-2 sm:text-xl md:text-2xl md:mb-4 lg:text-3xl text-center sm:text-left">
            Seja bem vindo!
          </h2>
          <div className="mb-4">
            <input
              className="px-2 py-1 rounded-sm bg-black-50/25 outline-0 lg:w-72"
              placeholder="O que você procura?"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              autoFocus={!searchText}
            />
            <button
              className="bg-green-400 p-1 text-white"
              onClick={() => handleSearchProduct()}
            >
              {productsSearch.length > 0 ? "Limpar" : "Buscar"}
            </button>
          </div>
          <div className="flex gap-10 flex-wrap">
            {productsSearch.map((product, index) => {
              return <Product key={product.id + "-" + index} data={product} />;
            })}
          </div>
        </div>
        {!categoriesIsLoading ? (
          <Categories categories={categories} />
        ) : (
          <div>Carregando...</div>
        )}
        <div className="mb-4">
          <h2 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
            Produtos
          </h2>
          <small className="text-sm text-black-600 mb-4 sm:text-md md:text-lg lg:text-xl">
            Selecione um produto para adicionar ao seu pedido
          </small>
        </div>
        <div className="flex flex-col gap-6">
          {!productIsLoading ? (() => {
            const chunks = arrayToChunk(products, 4)
            return chunks.map((chunks, index) => (
              <Products
                key={index}
                openModal={setIsOpened}
                products={chunks}
                variant={index}
                setProductToModal={setProductToModal}
              />
            ))
          })() : (
            <div>Carregando...</div>
          )}
        </div>
        {cart.length > 0 && (
          <div
            className={`w-full flex flex-col items-center justify-center sm:w-full`}
          >
            <div className="px-8 py-6 mb-6 rounded-md border-black-50 border-[1px] sm:w-full">
              <ul className="mb-16">
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
                        {formatCurrency(item.quantity * completeItem.price)}
                      </small>
                    </li>
                  );
                })}
              </ul>
              <div className="py-4 border-t-[1px] border-dashed border-black-100">
                <h5 className="font-semibold">Total do pedido:</h5>
                <span className="text-2xl font-bold sm:text-3xl">
                  {formatCurrency(
                    cart.reduce((acc, item) => {
                      const completeItem = products.find(
                        (p) => p.id === item.productId
                      );
                      return acc + item.quantity * completeItem.price;
                    }, 0)
                  )}
                </span>
              </div>
            </div>
            <div className="flex w-full justify-end items-center gap-6">
              <button
                className="p-2 font-bold text-green-900 rounded-2xl border-[1px] border-green-900 sm:w-36 lg:w-48"
                onClick={() => {
                  clearCart();
                }}
              >
                Limpar Carrinho
              </button>
              <button
                className="p-2 font-bold text-white-100 bg-green-900 rounded-2xl border-[1px] border-green-900 sm:w-36 lg:w-48"
                onClick={() => {
                  navigate("/payment");
                }}
              >
                Fazer pedido
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
