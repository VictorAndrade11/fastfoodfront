import { create } from "zustand";

import produce from "immer";

export const useCart = create((set) => {
  const setState = (fn) => set(produce(fn));

  return {
    actions: {
      addToCart: (item) => {
        setState(({ state }) => {
          state.cart.push(item);
        });
      },
      removeFromCart: (id) => {
        setState(({ state }) => {
          state.cart.filter((cartItem) => cartItem.productId !== id);
        });
      },
      clearCart: () => {
        setState(({ state }) => {
          state.cart = [];
        });
      },
    },

    state: { cart: [] },
  };
});
