import React, { createContext, useState } from "react";

export const cartContext = createContext({});

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ products: [] });

  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
}
