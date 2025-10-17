import React from "react";
import { useLayout } from "../hooks/useLayout";

function Footer() {
  const { currentYear } = useLayout();

  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>
              <i className="fas fa-leaf"></i> EcoStyle
            </h5>
            <p>Tu tienda de plantas favorita</p>
            <p className="small">Riega tus plantas, ama tus rosas</p>
          </div>

          <div className="col-md-4">
            <h5>Enlaces rápidos</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white-50">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/products" className="text-white-50">
                  Productos
                </a>
              </li>
              <li>
                <a href="/carrito" className="text-white-50">
                  Carrito
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5>Síguenos</h5>
            <div className="social-links">
              <a href="#" className="text-white me-3">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="bg-white" />

        <div className="row">
          <div className="col text-center">
            <p className="mb-0">
              &copy; <span id="año">{currentYear}</span> EcoStyle. Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
