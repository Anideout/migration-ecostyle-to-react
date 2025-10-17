import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLayout } from "../hooks/useLayout";

function Navbar() {
  const { currentUser, cartCount, isAdmin, handleLogout, getUserDisplayName } =
    useLayout();
  const navigate = useNavigate();
  const location = useLocation();

  // Función para verificar si la ruta está activa
  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  // Manejar logout y redirigir
  const onLogout = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-leaf"></i> EcoStyle
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/")}`} to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/products")}`}
                to="/products"
              >
                Productos
              </Link>
            </li>

            {/* Mostrar solo si está autenticado */}
            {currentUser && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/carrito")}`}
                  to="/carrito"
                >
                  <i className="fas fa-shopping-cart"></i> Carrito
                  {cartCount > 0 && (
                    <span className="badge bg-danger ms-1" id="cartCount">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>
            )}

            {/* Mostrar solo si es admin */}
            {isAdmin() && (
              <li className="nav-item">
                <Link className={`nav-link ${isActive("/admin")}`} to="/admin">
                  <i className="fas fa-cog"></i> Administrar
                </Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <span className="nav-link" id="navUserName">
                <i className="fas fa-user"></i> {getUserDisplayName()}
              </span>
            </li>

            {currentUser ? (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={onLogout}
                  id="logout"
                >
                  <i className="fas fa-sign-out-alt"></i> Cerrar sesión
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className={`nav-link ${isActive("/login")}`} to="/login">
                  <i className="fas fa-sign-in-alt"></i> Iniciar sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
