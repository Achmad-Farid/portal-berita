import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";
import NewsDetail from "./pages/NewsDetail";

export default function App() {
  return (
    <>
      <header className="sticky top-0 z-50 shadow-md bg-white">
        <Navbar></Navbar>
      </header>
      <main className="bg-background-light">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail" element={<NewsDetail />} />
        </Routes>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
}
