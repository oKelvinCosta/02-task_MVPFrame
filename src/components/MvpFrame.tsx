import Img from "./Img";
import frame from "../assets/imgs/Frame-black.png";
import OrcHero from "../assets/imgs/Orc Hero.gif";

export default function MvpFrame({ className, frameImg = frame, mvpImg = OrcHero, ...props }) {
  return (
    <div className={`relative w-full max-w-[150px] ${className}`} {...props}>
      <Img src={frameImg} className={`w-full`} />
      <Img src={mvpImg} className={`max-w-[43%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`} />
    </div>
  );
}
