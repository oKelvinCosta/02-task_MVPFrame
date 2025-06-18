import Img from "./Img";
import type { ProductItem } from "../assets/ProductsList";

export default function MvpFrame({ className, product, ...props }: { className?: string; product: ProductItem }) {
  const productStyles: Record<string, string> = {
    "MVP Lady Tanee": "max-w-[60%]",
    "MVP Boitatá": "max-w-[50%] !left-[52%]",
    "MVP Detardeurus": "max-w-[60%] !left-[52%]",
    "MVP Senhor das Trevas": "max-w-[60%] !left-[45%]",
  };

  return (
    <div className={`relative w-full max-w-[150px] ${className}`} {...props}>
      <Img src={`./imgs/${product.frameImg}`} className={`w-full`} />
      <Img
        src={`./imgs/${product.mvpImg}`}
        className={`max-w-[43%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
          
        ${productStyles[product.name]} || ""
        `}
      />
    </div>
  );
}
