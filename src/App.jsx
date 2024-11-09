import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import NewsDetail from "./pages/NewsDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchResult from "./pages/SearchResult";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import { checkSession } from "./redux/actions/authActions";
import { useDispatch } from "react-redux";
import AdminPage from "./admin/AdminPage";
import JournalistPage from "./journalist/JournalistPage";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("token", token);

      dispatch(checkSession());

      queryParams.delete("token");
      const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
      window.history.pushState({ path: newUrl }, "", newUrl);

      window.location.reload();
    }
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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/journalist" element={<JournalistPage />} />
        </Routes>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
}
