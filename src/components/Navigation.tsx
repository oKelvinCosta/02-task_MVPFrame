import Logo from "/imgs/MVP-Frame_Logo-Animated.webp";
import Img from "./Img";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartContext } from "@/context/CartContext";

export default function Navigation() {
  const cartContext = useCartContext();
  const cartQtd = cartContext.cart.length;

  return (
    <nav className="sticky top-0 z-50  bg-linear-to-t from-background/0 via-background to-background">
      <div className="container ">
        <div className="py-6 flex flex-row justify-between items-center">
          <Link to="/">
            <Img src={Logo} className={`max-w-[130px]`} />
          </Link>
          <ul className="flex gap-4 items-center">
            {/* <li className="bg-gray-200 px-4 py-2 rounded-md text-blue-700 text-sm flex items-center gap-2">
              <MapPinCheck className="text-blue-600" />
              <span>Belo Horizonte, MG</span>
            </li> */}
            <li>
              <Link to="/checkout" className={`${cartQtd < 1 ? "pointer-events-none" : ""}`}>
                <Button className="relative" variant="secondary" size="icon" disabled={cartQtd < 1}>
                  <ShoppingCart className="size-6" />
                  <span className="absolute top-[-10px] right-[-10px] bg-red-500 w-5 h-5 flex items-center justify-center  rounded-full text-xs">
                    <span className="mt-[2px] text-white">{cartQtd}</span>
                  </span>
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
