import { createContext, useContext, useEffect, useState } from "react";
import { productsList } from "../assets/ProductsList";
import type { ProductItem } from "../assets/ProductsList";

export interface ProductsContextProps {
  products: ProductItem[];
  setProductsList: (products: ProductItem[]) => void;
}

// More secure way to type the context
const ProductsContext = createContext<ProductsContextProps | undefined>(undefined);

const PRODUCTS_KEY = "@mvp-framer:products-v1.0.0";

export default function ProductsContextProvider({ children }: { children: React.ReactNode }) {
  // Load list from extern file
  const [products, setProducts] = useState<ProductItem[]>(productsList());

  // Get products from localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem(PRODUCTS_KEY);
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  // Every change in products, save them in LS
  useEffect(() => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  // Simplify setProducts type
  function setProductsList(products: ProductItem[]) {
    setProducts(products);
  }

  return <ProductsContext.Provider value={{ products, setProductsList }}>{children}</ProductsContext.Provider>;
}

// Hook to use the context and avoid errors
export function useProductsContext() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProductsContext must be used inside an ProductsContextProvider");
  }
  return context;
}
