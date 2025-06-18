import HeroCall from "../components/HeroCall";
import Product from "../components/Product";
import { useProductsContext } from "../context/ProductsContext";

export default function Home() {
  const products = useProductsContext();
  const productsList = products.products;

  return (
    <>
      <HeroCall />
      <div className="container">
        <div className="mt-16">
          <h3>Nossos MVPs</h3>

          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10 items-end">
            {productsList.map((productItem, index) => (
              <li key={index}>
                <Product product={productItem} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
