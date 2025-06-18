import { createContext, useContext, useEffect, useState } from "react";
import { productsList } from "../assets/ProductsList";

interface ProductsContextProps {
  products: ProductsContextItem[];
  setProductsList: (products: ProductsContextItem[]) => void;
}

export interface ProductsContextItem {
  name: string;
  price: string;
  description: string;
  size: string;
  stock: number;
  id: number;
  mvpImg: string;
  frameImg: string;
}

// More secure way to type the context
const ProductsContext = createContext<ProductsContextProps | undefined>(undefined);

const PRODUCTS_KEY = "@mvp-framer:products-v1.0.0";

export default function ProductsContextProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<ProductsContextItem[]>(productsList());

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
  function setProductsList(products: ProductsContextItem[]) {
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
