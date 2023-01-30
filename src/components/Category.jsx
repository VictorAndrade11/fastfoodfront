import React from "react";

export const Category = ({ data }) => {
  return (
    <div className="flex flex-col items-center rounded-md bg-black-50/10 w-48 h-28  p-3 shadow-2xl shadow-black sm:mx-0 sm:w-52">
      <img
        src={data.image ? data.image.name : ""}
        alt="Imagem de Burgao"
        className="h-16"
      />
      <h3 className="font-semibold">{data.name}</h3>
    </div>
  );
};
