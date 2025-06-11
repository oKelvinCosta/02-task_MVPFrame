import Img from "../components/Img";
import KingPoring from "../assets/imgs/KingPoring.gif";
import { MapPinCheck, CalendarClock, Banknote, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import MvpFrame from "@/components/MvpFrame";

export default function Checkout() {
  return (
    <div className="py-20 w-full">
      <div className="container">
        {/* GRID */}

        <div className="grid md:grid-cols-12 gap-6 ">
          {/* LEFT */}
          <div className="col-span-7">
            <h5>Complete seu pedido</h5>
            <div className="border-2 bg-white border-blue-200 rounded-md  p-10">
              <div className="flex gap-6">
                <MapPinCheck className="text-blue-600" />
                <div>
                  <p>Endereço de Entrega</p>
                  <p className="text-sm">Informe o endereço onde deseja receber seu pedido</p>
                </div>
              </div>

              <div>FORM</div>
            </div>

            <div className="mt-6 border-2 bg-white border-blue-200 rounded-md p-10">
              <div className="flex gap-6">
                <MapPinCheck className="text-blue-600" />
                <div>
                  <p>Pagamento</p>
                  <p className="text-sm">O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
                </div>
              </div>

              <div>FORM</div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-5 w-full flex flex-col ">
            <h5>MVPs selecionados</h5>

            {/* Card */}
            <div className="border-2 bg-white border-blue-200 rounded-md rounded-tr-3xl rounded-bl-3xl p-10">
              {/* Products */}
              <ul className="flex flex-col gap-6">
                <li className="flex flex-wrap gap-2 border-b border-blue-200 pb-4">
                  <MvpFrame className="!max-w-[60px] min-w-[50px]" />
                  <div className="flex flex-col gap-2 mt-1">
                    <p className="!m-0">Expresso Tradicional</p>
                    <div className="flex gap-2">
                      <span className="bg-gray-200 flex items-center gap-2 rounded-sm px-2">
                        <Button className="text-blue-600 text-md font-bold" variant="invisible" size="none">
                          -
                        </Button>
                        <span>1</span>
                        <Button className="text-blue-600 text-md font-bold" variant="invisible" size="none">
                          +
                        </Button>
                      </span>
                      <Button className="uppercase" variant="gray">
                        <Trash2 />
                        Remover
                      </Button>
                    </div>
                  </div>
                  <span className="text-right ml-auto">
                    <b>R$ 9,90</b>
                  </span>
                </li>
              </ul>

              <ul className="flex flex-col gap-2 mt-6">
                <li className="flex justify-between">
                  Total de itens <span>R$ 29,70</span>
                </li>
                <li className="flex justify-between">
                  Entrega <span>R$ 3,50</span>
                </li>
                <li className="flex justify-between font-bold text-xl">
                  Total <span>R$ 33,20</span>
                </li>
              </ul>

              <Button className="uppercase w-full mt-6" variant="secondary">
                Confirmar Pedido
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
