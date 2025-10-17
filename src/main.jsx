import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Importar estilos en orden
import "./styles/layout.css";
import "./styles/navbar.css";
import "./styles/carrito.css";
import "./styles/login.css";
import "./styles/catalogo.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
