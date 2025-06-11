import Logo from "../assets/imgs/Logo_MVP-Frame.svg";
import Img from "./Img";
import { Button } from "./ui/button";
import { MapPinCheck, ShoppingCart } from "lucide-react";

export default function Navigation() {
  return (
    <nav>
      <div className="container">
        <div className="py-6 flex flex-row justify-between items-center">
          <Img src={Logo} className={`max-w-[130px]`} />
          <ul className="flex gap-4 items-center">
            <li className="bg-gray-200 px-4 py-2 rounded-md text-blue-700 text-sm flex items-center gap-2">
              <MapPinCheck className="text-blue-600" />
              <span>Belo Horizonte, MG</span>
            </li>
            <li>
              <Button className="relative" variant="secondary" size="icon">
                <ShoppingCart className="size-6" />
                <span className="absolute top-[-10px] right-[-10px] bg-red-500 w-5 h-5 flex items-center justify-center  rounded-full text-xs">
                  <span className="mt-[2px] text-white">3</span>
                </span>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
