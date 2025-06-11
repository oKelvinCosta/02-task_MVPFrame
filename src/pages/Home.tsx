import React from "react";
import HeroCall from "../components/HeroCall";
import Product from "../components/Product";

export default function Home() {
  return (
    <>
      <HeroCall />
      <div className="container">
        <div className="mt-16">
          <h3>Nossos MVPs</h3>

          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
            {Array.from({ length: 10 }).map((_, index) => (
              <li key={index}>
                <Product />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
