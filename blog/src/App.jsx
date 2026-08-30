import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { Footer, Header } from "./componants/index.js";
import { useDispatch } from "react-redux";
import { login, logout, setInitialized } from "./store/authSlice.js";
import authService from "./appwrite/auth.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for an existing Appwrite session once on startup.
    // Always dispatch setInitialized at the end so AuthLayout stops waiting.
    authService
      .getCurrentuser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));   // also sets initialized = true
        } else {
          dispatch(logout());          // also sets initialized = true
        }
      })
      .catch(() => {
        dispatch(setInitialized());    // error path — still unblock AuthLayout
      });
  }, [dispatch]);

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
