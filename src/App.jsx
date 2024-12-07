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
import { useDispatch, useSelector } from "react-redux";
import AdminPage from "./admin/AdminPage";
import JournalistPage from "./journalist/JournalistPage";
import EditArticle from "./journalist/EditArticle";
import Theme from "./pages/Theme";
import ProtectedRoute from "./protectedRoute";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiration", expirationTime);

      dispatch(checkSession());

      queryParams.delete("token");
      const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
      window.history.pushState({ path: newUrl }, "", newUrl);

      window.location.reload();
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <header className="sticky top-0 z-50 shadow-md bg-white dark:bg-neutral-dark">
        <Navbar />
      </header>

      <main className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<NewsDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tema/:categoryOrTag" element={<Theme />} />
          {/* route proteksi */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin" user={user}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/journalist"
            element={
              <ProtectedRoute role="journalist" user={user}>
                <JournalistPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-article/:id"
            element={
              <ProtectedRoute role="journalist" user={user}>
                <EditArticle />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <footer className="bg-white dark:bg-neutral-dark">
        <Footer />
      </footer>
    </>
  );
}
