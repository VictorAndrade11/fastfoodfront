import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const MenuMobile = ({ isOpened, handleClose }) => {
  const { pathname } = useLocation();
  return (
    <span
      className={`fixed right-0 z-30 h-full flex flex-col justify-center gap-4 p-8 text-white-100 bg-black-700 
    transition-all duration-500 ease-in-out ${
      isOpened ? "translate-x-0" : "translate-x-full"
    } sm:hidden`}
    >
      <IoClose
        className="absolute top-4 right-3"
        size="25"
        onClick={handleClose}
      />
      <NavLink
        to="/"
        className={`w-full py-2 px-8 rounded-sm  font-bold ${
          pathname === "/" && "text-green-700"
        }`}
        onClick={handleClose}
      >
        Pedidos
      </NavLink>
      <NavLink
        to="/cozinha"
        className={`w-full py-2 px-8 rounded-sm  font-bold ${
          pathname === "/cozinha" && "text-green-700"
        }`}
        onClick={handleClose}
      >
        Cozinha
      </NavLink>
      <NavLink
        to="/retirada"
        className={`w-full py-2 px-8 rounded-sm  font-bold ${
          pathname === "/retirada" && "text-green-700"
        }`}
        onClick={handleClose}
      >
        Retirada
      </NavLink>
    </span>
  );
};

export default MenuMobile;
