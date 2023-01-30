import React from "react";
import { Product } from "./Product";

export const Products = ({
  openModal,
  setProductToModal,
  products,
  variant,
}) => {
  const handleOpenModal = () => {
    setProductToModal();
    openModal(true);
  };
  return (
    <section className="text-center sm:text-left gap-4">
      <div className="flex justify-center items-center flex-wrap gap-4 mx-auto sm:justify-start sm:gap-6 md:gap-10 lg:gap-12 ">
        {products.map((product) => (
          <Product
            key={product.id}
            openModal={handleOpenModal}
            data={product}
            variant={variant}
            setProductToModal={setProductToModal}
          />
        ))}
      </div>
    </section>
  );
};
