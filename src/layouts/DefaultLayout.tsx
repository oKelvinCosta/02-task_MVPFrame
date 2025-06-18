import Navigation from "../components/Navigation";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function DefaultLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 flex flex-col items-center justify-center">
        {/* Space to add content from react-router-dom */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
