import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/home";

export default function App() {
  return (
    <>
      <header className="sticky top-0 z-50 shadow-md bg-white">
        <Navbar></Navbar>
      </header>
      <main className="bg-background-light">
        <Home></Home>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
}
