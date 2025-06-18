import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Checkout from "./pages/Checkout";
import DefaultLayout from "./layouts/DefaultLayout";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
      </Route>
    </Routes>
  );
}
