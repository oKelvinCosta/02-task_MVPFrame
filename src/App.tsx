import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Navigation />

      <main>
        {/* //TODO: ROUTES */}
        <Home />
      </main>

      <Footer />
    </>
  );
}

export default App;
