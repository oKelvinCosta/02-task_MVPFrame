import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import type { ProductItem } from "../assets/ProductsList";
import { z } from "zod";
import { formSchema } from "../pages/Checkout";

export interface CartContextProps {
  cart: ProductItem[];
  setCartList: (cart: ProductItem[]) => void;
  checkoutSuccess: checkoutSuccessProps[] | [];
  setCheckoutSuccessList: (value: checkoutSuccessProps[]) => void;
  currentCheckout: currentCheckoutProps | null;
  setCurrentCheckoutHelper: (value: currentCheckoutProps) => void;
}

interface checkoutSuccessProps {
  purchase: ProductItem[];
  form: z.infer<typeof formSchema>;
}

interface currentCheckoutProps {
  purchase: ProductItem[];
  form: z.infer<typeof formSchema>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const CART_KEY = "@mvp-framer:cart-v1.0.0";
const CHECKOUT_SUCCESS_KEY = "@mvp-framer:checkout-success-v1.0.0";

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ProductItem[]>(() => {
    // Get cart from localStorage
    const storedCart = localStorage.getItem(CART_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save all the transactions/purchases
  const [checkoutSuccess, setCheckoutSuccess] = useState<checkoutSuccessProps[] | []>(() => {
    // Get from localStorage
    const storedCheckoutSuccess = localStorage.getItem(CHECKOUT_SUCCESS_KEY);
    return storedCheckoutSuccess ? JSON.parse(storedCheckoutSuccess) : [];
  });

  // To show infos in checkout sucess page
  const [currentCheckout, setCurrentCheckout] = useState<currentCheckoutProps | null>(null);

  // IT GIVES ERROR!
  // useEffect(() => {
  //   const storedCart = localStorage.getItem(CART_KEY);
  //   if (storedCart) {
  //     setCart(JSON.parse(storedCart));
  //   }
  // }, []);

  // Every change in cart, save them in LS
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(CHECKOUT_SUCCESS_KEY, JSON.stringify(checkoutSuccess));
  }, [checkoutSuccess]);

  // Helpers to simplify the type TS
  function setCartList(cart: ProductItem[]) {
    setCart(cart);
  }

  function setCheckoutSuccessList(value: checkoutSuccessProps[] | []) {
    setCheckoutSuccess(value);
  }

  function setCurrentCheckoutHelper(value: currentCheckoutProps | null) {
    setCurrentCheckout(value);
  }

  return (
    <CartContext.Provider
      value={{ cart, setCartList, currentCheckout, setCurrentCheckoutHelper, checkoutSuccess, setCheckoutSuccessList }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook to use the context and avoid errors
export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used inside an CartContextProvider");
  }
  return context;
}
