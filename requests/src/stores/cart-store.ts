import { ProductProps } from "@/utils/data/products";
import { create } from "zustand";
import * as cartInMemory from "./helpers/cart-in-memory";

export type TProductCard = ProductProps & {
  quantity: number;
};

interface IState {
  products: TProductCard[];
  add: (product: ProductProps) => void;
}

export const useCartStore = create<IState>((set) => ({
  products: [],
  add: (product: ProductProps) =>
    set((state) => ({
      products: cartInMemory.add(state.products, product),
    })),
}));
