import MvpFrame from "./MvpFrame";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

interface ProdutProps {
  name: string;
  price: string;
  description: string;
  size: string;
}

export default function Product({
  name = "MVP Eddga",
  price = "19,90",
  description = "Quadro grande",
  size = "21 cm x 29,7cm",
}: ProdutProps) {
  function handleAddProductToCart() {}

  function handleSubtractProductToCart() {}

  return (
    <div className="flex flex-col items-center">
      <MvpFrame />

      {/* Card */}
      <div className="flex flex-col gap-2 p-6 pt-16 rounded-md rounded-tr-3xl rounded-bl-3xl bg-white border-2 border-blue-100 -mt-16 text-center w-full gap-y-6">
        {/* Description */}
        <div>
          <h4 className="!mb-0">{name}</h4>
          <div className="text-stone-400">
            <div>{description}</div>
            <div>{size}</div>
          </div>
        </div>
        {/* Bottom */}
        <div className="flex justify-center items-center gap-x-6 gap-y-2 flex-wrap">
          {/* Price */}
          <span className="flex items-center">
            <span className="text-xs roboto mt-2 mr-1">R$</span> <h3 className="!mb-0">{price}</h3>
          </span>
          {/* Quantity */}
          <div className="flex gap-2">
            <span className="bg-blue-100 flex items-center gap-2 rounded-sm px-2">
              <Button
                onClick={() => {
                  handleSubtractProductToCart();
                }}
                className="text-blue-600 text-md font-bold"
                variant="invisible"
                size="none"
              >
                -
              </Button>
              <span>1</span>
              <Button
                onClick={() => {
                  handleAddProductToCart();
                }}
                className="text-blue-600 text-md font-bold"
                variant="invisible"
                size="none"
              >
                +
              </Button>
            </span>
            {/* Button */}
            <Button
              onClick={() => {
                handleAddProductToCart();
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
