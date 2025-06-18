import { Button } from "./ui/button";
import { useProductsContext } from "@/context/ProductsContext";
import { useCartContext } from "@/context/CartContext";
import type { ProductsContextItem } from "@/context/ProductsContext";

export function handleAddProductToCart(productId: string, productsContext, cartContext) {
  const productsFromContext = productsContext.products;
  const { cart, setCartList } = cartContext;

  // find product in products
  const currentProduct = productsFromContext.find((product) => product.id === productId);

  // find product in cart
  const productInCart = cart.find((item) => item.id === productId);

  // verify if product is already in cart and if stock is less than current product stock
  if (productInCart && productInCart.stock < currentProduct.stock) {
    // update stock
    const newProductInCart = cart.map((productItem) =>
      productItem.id === productId ? { ...productItem, stock: productItem.stock + 1 } : productItem
    );

    setCartList(newProductInCart);
    // verify if product is not in cart or if stock is less than current product stock
  } else if (!productInCart || productInCart.stock < currentProduct.stock) {
    setCartList([...cart, { ...currentProduct, stock: 1 }]);
  }
}

export default function ProductIncrease({ product, className }: { product: ProductsContextItem }) {
  const productsContext = useProductsContext();

  const cartContext = useCartContext();
  const { cart, setCartList } = cartContext;

  function handleSubtractProductFromCart(productId: string) {
    // If product is in Cart and stock >= 1
    const newCart = cart
      .map((cartItem) => (cartItem.id === productId ? { ...cartItem, stock: cartItem.stock - 1 } : cartItem))
      .filter((cartItem) => cartItem.stock > 0);

    setCartList(newCart);

    // Or could be this way:
    // setCartList(prevCart =>
    //   prevCart
    //     .map(item =>
    //       item.id === productId
    //         ? { ...item, stock: item.stock - 1 }
    //         : item
    //     )
    //     .filter(item => item.id !== productId || item.stock > 0)
    // );
  }

  const stockProductInCart = cart.find((item) => item.id === product.id)?.stock || 0;

  return (
    <span className={`bg-blue-100 flex items-center gap-2 rounded-sm px-2 ${className}`}>
      <Button
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          handleSubtractProductFromCart(product.id);
        }}
        className="text-blue-600 text-md font-bold"
        variant="invisible"
        size="none"
      >
        -
      </Button>
      <span>{stockProductInCart}</span>
      <Button
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          handleAddProductToCart(product.id, productsContext, cartContext);
        }}
        className="text-blue-600 text-md font-bold"
        variant="invisible"
        size="none"
      >
        +
      </Button>
    </span>
  );
}
