import { create } from "zustand";

import produce from "immer";

export const useProductModal = create((set) => {
  const setState = (fn) => set(produce(fn));

  return {
    actions: {
      openProductModal: (item) => {
        setState(({ state }) => {
          state.productId = item;
          state.isOpen = true;
        });
      },

      closeProductModal: () => {
        setState(({ state }) => {
          state.productId = null;
          state.isOpen = false;
        });
      },
    },

    state: { productId: null, isOpen: false },
  };
});
