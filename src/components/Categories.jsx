import React from "react";
import { Category } from "./Category";

export const Categories = ({ categories }) => {
  return (
    <section className="text-center mb-12 sm:text-left">
      <div className="mb-4">
        <h2 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
          Categorias
        </h2>
        <small className="text-sm text-black-600 mb-4 sm:text-md md:text-lg lg:text-xl">
          Navegue por categoria
        </small>
      </div>
      <div className="flex justify-center items-center flex-wrap gap-4 mx-auto sm:justify-start sm:gap-6 md:gap-10 lg:gap-12">
        {categories.map((category) => (
          <Category key={category.id} data={category} />
        ))}
      </div>
    </section>
  );
};
