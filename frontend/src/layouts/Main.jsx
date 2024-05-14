import { Outlet } from "react-router-dom";
import Navbar from "../pages/NaveBar/NavBar";
import Footer from "../pages/Footer/Footer"
export default function Main() {
  return (
    <div className="root-layout">
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}