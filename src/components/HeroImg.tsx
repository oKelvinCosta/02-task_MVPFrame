import Img from "./Img";

import HeroFrame from "/imgs/HeroFrame.png";
import Gopinich from "/imgs/Gopinich.gif";
import Samurai from "/imgs/Samurai.gif";
import Snake from "/imgs/Evil Snake Lord.gif";
import TaoGunka from "/imgs/Tao Gunka.gif";

export default function HeroImg() {
  return (
    <>
      <div className="relative w-full max-w-[550px]">
        <Img src={HeroFrame} className={`w-full`} />
        <Img src={Gopinich} className={`max-w-[25%] absolute top-[17%] left-[16%]`} />
        <Img src={Samurai} className={`max-w-[17%] absolute top-[13%] left-[64%]`} />
        <Img src={Snake} className={`max-w-[20%] absolute top-[58%] left-[18%]`} />
        <Img src={TaoGunka} className={`max-w-[20%] absolute top-[67%] left-[64%]`} />
      </div>
    </>
  );
}
