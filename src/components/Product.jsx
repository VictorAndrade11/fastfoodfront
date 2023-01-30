import React, { useContext, useEffect, useState } from "react";
import { modalContext } from "../pages/Home";
import imagemHamburguer from "../assets/images/hamb01.png";
import { useProductModal } from "../stores/useProductModal";
import { useCart } from "../stores/useCart";
import { IoClose, IoCheckmark } from "react-icons/io5";

// bg-[url('https://static.vecteezy.com/ti/vetor-gratis/t2/5891677-resumo-setas-fitas-coroas-coracoes-explosoes-e-outros-elementos-em-estilo-desenhado-a-mao-para-conceito-design-doodle-ilustracao-modelo-para-decoracao-gratis-vetor.jpg')]

const variants = ["bg-red-400", "bg-green-700", "bg-yellow-200"];

export function Product({ data, variant = 0 }) {
  const processedIngredients = data.description.split(",");
  const { openProductModal } = useProductModal((x) => x.actions);
  const { cart } = useCart((z) => z.state);

  console.log(data);
  return (
    <div className="relative h-64 ">
      <button
        onClick={() => openProductModal(data.id)}
        className="w-48 h-64 overflow-hidden rounded-xl shadow-lg sm:w-52 relative"
      >
        <div className={`w-full h-full ${variants[variant]}`}>
          {
            <img
              src={
                data.image
                  ? `http://20.226.76.133:3333/uploads/${data.image.name}`
                  : ""
              }
              className="absolute z-20 top-[30px] left-[20%] w-3/5"
            />
          }
        </div>

        <div className="absolute bottom-0 w-full h-2/3 flex flex-col justify-between items-center px-4 py-6 rounded-t-2xl bg-white-100 font-bold">
          <div className="pt-8">
            <h3>{data.name}</h3>
            <small className="text-black-400 font-medium truncate p-4">
              {processedIngredients[0]}
            </small>
          </div>
          <span className="font-lg font-bold">R${data.price}</span>
        </div>
      </button>
      {cart.map((item) => item.productId).includes(data.id) && (
        <div className="flex w-full h-full bg-green-300/90 rounded-xl absolute top-0 left-0 items-center justify-center z-30">
          <div className="flex w-14 h-14 rounded-full bg-green-50 items-center justify-center">
            <IoCheckmark className="text-green-800 text-2xl" />
          </div>
        </div>
      )}
    </div>
  );
}
