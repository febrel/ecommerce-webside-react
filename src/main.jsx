import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProviderWrapper } from "./contexts/AuthContext";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <AuthProviderWrapper>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProviderWrapper>
  // </StrictMode>,
)
