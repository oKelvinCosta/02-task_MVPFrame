import MvpFrame from "./MvpFrame";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import ProductIncrease, { handleAddProductToCart } from "./ProductIncrease";
import type { ProductItem } from "@/assets/ProductsList";
import { useProductsContext } from "@/context/ProductsContext";
import { useCartContext } from "@/context/CartContext";

export default function Product({ product }: { product: ProductItem }) {
  const productsContext = useProductsContext();
  const cartContext = useCartContext();

  return (
    <div className="flex flex-col items-center">
      <MvpFrame product={product} />

      {/* Card */}
      <div className="flex flex-col gap-2 p-6 pt-16 rounded-md rounded-tr-3xl rounded-bl-3xl bg-white border-2 border-blue-100 -mt-16 text-center w-full gap-y-6">
        {/* Description */}
        <div>
          <h4 className="!mb-0">{product.name}</h4>
          <div className="text-stone-400">
            <div>{product.description}</div>
            <div>{product.size}</div>
          </div>
        </div>
        {/* Bottom */}
        <div className="flex justify-center items-center gap-x-6 gap-y-2 flex-wrap">
          {/* Price */}
          <span className="flex items-center">
            <span className="text-xs roboto mt-2 mr-1">R$</span> <h3 className="!mb-0">{product.price}</h3>
          </span>
          {/* Quantity */}
          <div className="flex gap-2">
            <ProductIncrease product={product} />

            {/* Button */}
            <Button
              onClick={() => {
                handleAddProductToCart(product.id, productsContext, cartContext);
              }}
              variant="default"
              size="icon"
            >
              <ShoppingCart className="size-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
