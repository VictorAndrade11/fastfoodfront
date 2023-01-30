import { useState } from "react";
import "./Header.css";
import ToggleMenu from "../toggle-menu/ToggleMenu";
import { FaHamburger } from "react-icons/fa";
import { NavLink, Link, useLocation } from "react-router-dom";

export const Header = ({ isMenuOpened, openMenu }) => {
  const { pathname } = useLocation();

  return (
    <header className="fixed z-1 w-full flex justify-between bg-green-800 text-green-50 py-4 px-8 z-50">
      <div className="flex items-center">
        <FaHamburger className="bg-green-50 text-green-900 p-0.5 rounded-lg mr-2" />
        <Link to="/">
          <h1 className="font-bold font-found">Fastfood</h1>
        </Link>
      </div>
      <nav className="hidden items-center gap-8 sm:flex">
        <NavLink to="/" className={pathname === "/" && "active"}>
          Pedidos
        </NavLink>
        <NavLink to="/cozinha" className={pathname === "/cozinha" && "active"}>
          Cozinha
        </NavLink>
        <NavLink
          to="/retirada"
          className={pathname === "/retirada" && "active"}
        >
          Retirada
        </NavLink>
      </nav>
      <ToggleMenu isActive={isMenuOpened} onToggle={openMenu} />
    </header>
  );
};
