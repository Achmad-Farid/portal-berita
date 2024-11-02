import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import NewsDetail from "./pages/NewsDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchResult from "./pages/SearchResult";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkSession } from "./redux/actions/authActions";
import Profile from "./pages/Profile";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  return (
    <>
      <header className="sticky top-0 z-50 shadow-md bg-white">
        <Navbar></Navbar>
      </header>
      <main className="bg-background-light">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail" element={<NewsDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
}
