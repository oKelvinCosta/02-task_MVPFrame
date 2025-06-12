import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 flex flex-col items-center justify-center">
        {/* //TODO: ROUTES */}
        {/* <Home /> */}
        {/* <CheckoutSuccess /> */}
        <Checkout />
      </main>

      <Footer />
    </div>
  );
}

export default App;
