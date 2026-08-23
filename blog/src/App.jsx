import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { Footer, Header } from "./componants/index.js";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice.js";
import authService from "./appwrite/auth.js";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // wait until session check is done

  useEffect(() => {
    // On every page load, check if there is an active Appwrite session.
    // If yes → sync user into Redux. If no → ensure Redux is logged out.
    authService
      .getCurrentuser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    // Minimal splash while session resolves — prevents flash of wrong nav state
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "var(--color-bg)",
        color: "var(--color-text-muted)",
        fontSize: "var(--text-sm)",
        fontFamily: "var(--font-family)",
      }}>
        Loading…
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      background: "var(--color-bg)",
    }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
