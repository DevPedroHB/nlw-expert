import { ProductProps } from "@/utils/data/products";
import { TProductCard } from "../cart-store";

export function add(products: TProductCard[], newProduct: ProductProps) {
  const existingProduct = products.find(
    (product) => product.id === newProduct.id,
  );

  if (existingProduct) {
    return products.map((product) => {
      if (product.id === existingProduct.id) {
        return {
          ...existingProduct,
          quantity: existingProduct.quantity + 1,
        };
      }

      return product;
    });
  }

  return [...products, { ...newProduct, quantity: 1 }];
}
