import { ProductProps } from "@/utils/data/products";
import { TProductCart } from "../cart-store";

export function add(products: TProductCart[], newProduct: ProductProps) {
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

export function remove(products: TProductCart[], productRemovedId: string) {
  const updatedProducts = products.map((product) => {
    if (product.id === productRemovedId) {
      return {
        ...product,
        quantity: product.quantity > 1 ? product.quantity - 1 : 0,
      };
    }

    return product;
  });

  return updatedProducts.filter((product) => product.quantity > 0);
}
