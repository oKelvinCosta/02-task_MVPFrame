import { HashRouter } from "react-router-dom";
import Router from "./Router";
import ProductsContextProvider from "./context/ProductsContext";
import CartContextProvider from "./context/CartContext";

function App() {
  return (
    <HashRouter>
      <ProductsContextProvider>
        <CartContextProvider>
          <Router />
        </CartContextProvider>
      </ProductsContextProvider>
    </HashRouter>
  );
}

export default App;
