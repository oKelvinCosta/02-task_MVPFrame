import HeroImg from "./HeroImg";
import bgBlur from "../assets/imgs/bg-blur.webp";
import { Swords, Award, ImagePlay, Usb } from "lucide-react";

export default function HeroCall() {
  return (
    <header className={`relative bg-[url(${bgBlur})]`}>
      {/* <div className={`bg-[url(${bgBlur})] bg-cover bg-center w-full h-full absolute  -z-20`} /> */}
      {/* <Img src={bgBlur} className={`w-full h-full absolute -z-20`} /> */}

      <div className="container grid  md:grid-cols-2 items-center">
        <div className="order-2 md:order-1">
          <h1>Traga os MVPs de Ragnarok Online para sua estante!</h1>
          <p>Porta-retratos animados com os icônicos gifs dos chefes lendários que marcaram uma geração.</p>
          <p>Perfeitos para decorar seu setup gamer ou coleção!</p>
          <ul className="mt-6 grid grid-cols-2 gap-y-3">
            <li className="flex items-center gap-2">
              <span className="rounded-full bg-blue-600 min-w-10 h-10 flex items-center justify-center text-white">
                <Swords />
              </span>
              <span>Feitos para fãs de Ragnarok Online</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="rounded-full bg-rose-500 min-w-10 h-10 flex items-center justify-center text-white">
                <ImagePlay />
              </span>
              <span>Porta-retratos com animações em looping</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="rounded-full bg-amber-400 min-w-10 h-10 flex items-center justify-center text-white">
                <Award />
              </span>
              <span>Produto artesanal + tecnologia digital</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="rounded-full bg-green-400 min-w-10 h-10 flex items-center justify-center text-white">
                <Usb />
              </span>
              <span>Alimentação USB, plug & play</span>
            </li>
          </ul>
        </div>
        <div className="order-1 md:order-2">
          <HeroImg />
        </div>
      </div>
    </header>
  );
}
