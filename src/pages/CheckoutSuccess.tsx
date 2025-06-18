import { MapPinCheck, CalendarClock, Banknote } from "lucide-react";
import Img from "../components/Img";
import KingPoring from "/imgs/KingPoring.gif";
import { useCartContext } from "../context/CartContext";

export default function CheckoutSuccess() {
  const cartContext = useCartContext();
  const { currentCheckout } = cartContext;
  const payment = {
    credito: "Cartão de Crédito",
    debito: "Cartão de Débito",
    dinheiro: "Dinheiro",
  };
  return (
    <div className="py-10 lg:py-20">
      <div className="container">
        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-6 items-center ">
          {/* LEFT */}
          <div className="border-2 border-blue-200 rounded-md rounded-tr-3xl rounded-bl-3xl p-10">
            <h2>Uhu! Pedido confirmado</h2>
            <p>Agora é só aguardar que entregaremos sua caixa de MVPs.</p>
            <ul className="mt-6 flex flex-col gap-y-3">
              <li className="flex items-center gap-2">
                <span className="rounded-full bg-blue-600 min-w-10 h-10 flex items-center justify-center text-white">
                  <MapPinCheck />
                </span>
                <span>
                  Entrega em <b>{currentCheckout?.form.rua}</b> - Centro, Belo Horizonte - MG
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="rounded-full bg-amber-400 min-w-10 h-10 flex items-center justify-center text-white">
                  <CalendarClock />
                </span>
                <div>
                  <div>Previsão de entrega</div>
                  <div>
                    <b>4 dias</b>
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <span className="rounded-full bg-rose-500 min-w-10 h-10 flex items-center justify-center text-white">
                  <Banknote />
                </span>
                <div>
                  <div>Pagamento na entrega</div>
                  <div>
                    <b>{currentCheckout ? payment[currentCheckout.form.paymentType] : ""}</b>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center">
            <Img src={KingPoring} className={`max-w-[360px]`} />
          </div>
        </div>
      </div>
    </div>
  );
}
