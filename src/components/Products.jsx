import React, { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useAuth } from "../hooks/useAuth";

function Products() {
  const { products, addToCart } = useProducts();
  const { currentUser } = useAuth();

  // Estado para filtros
  const [filter, setFilter] = useState("todas"); // 'todas', 'disponibles', 'ofertas'
  const [mensaje, setMensaje] = useState({ text: "", type: "" });

  // Verificar si el usuario es admin
  const isAdmin = currentUser?.role === "admin";

  // Función para agregar al carrito
  const handleAddToCart = (productId, productName) => {
    const result = addToCart(productId, 1);

    if (result.ok) {
      setMensaje({
        text: `${productName} agregado al carrito`,
        type: "success",
      });

      // Limpiar mensaje después de 3 segundos
      setTimeout(() => {
        setMensaje({ text: "", type: "" });
      }, 3000);
    } else {
      setMensaje({
        text: result.message,
        type: "danger",
      });
    }
  };

  // Filtrar productos según el filtro activo
  const filteredProducts = products.filter((product) => {
    if (filter === "disponibles") {
      return product.stock > 0;
    }
    if (filter === "ofertas") {
      // Asumiendo que productos con descuento tienen una propiedad discount
      // o precio original diferente
      return product.discount || false;
    }
    return true; // 'todas'
  });

  // Determinar clase de disponibilidad
  const getAvailabilityClass = (stock) => {
    if (stock === 0) return "agotado";
    if (stock <= 5) return "disponible"; // últimas unidades
    return "disponible";
  };

  // Determinar badge de disponibilidad
  const getAvailabilityBadge = (stock) => {
    if (stock === 0) {
      return (
        <span className="availability-badge badge bg-danger">Agotado</span>
      );
    }
    if (stock <= 5) {
      return (
        <span className="availability-badge badge bg-warning text-dark">
          Últimas unidades
        </span>
      );
    }
    return (
      <span className="availability-badge badge bg-success">Disponible</span>
    );
  };

  return (
    <div>
      {/* Header del catálogo */}
      <div className="header-catalogo">
        <div className="container">
          <h1 className="display-5 fw-bold mb-2">Catálogo de Plantas</h1>
          <p className="lead fs-5">Elige la planta perfecta</p>
        </div>
      </div>

      <div className="container">
        {/* Mensaje de feedback */}
        {mensaje.text && (
          <div
            className={`alert alert-${mensaje.type} alert-dismissible fade show mt-3`}
          >
            {mensaje.text}
            <button
              type="button"
              className="btn-close"
              onClick={() => setMensaje({ text: "", type: "" })}
            ></button>
          </div>
        )}

        {/* Sección de filtros */}
        <div className="row mb-4 mt-4">
          <div className="col-12">
            <div className="filter-section">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h5 className="mb-0">Filtrar plantas:</h5>
                </div>
                <div className="col-md-6 text-end">
                  <div className="btn-group">
                    <button
                      className={`btn btn-outline-success ${
                        filter === "todas" ? "active" : ""
                      }`}
                      onClick={() => setFilter("todas")}
                    >
                      Todas
                    </button>
                    <button
                      className={`btn btn-outline-success ${
                        filter === "disponibles" ? "active" : ""
                      }`}
                      onClick={() => setFilter("disponibles")}
                    >
                      Disponibles
                    </button>
                    <button
                      className={`btn btn-outline-success ${
                        filter === "ofertas" ? "active" : ""
                      }`}
                      onClick={() => setFilter("ofertas")}
                    >
                      Ofertas
                    </button>
                    {isAdmin && (
                      <button className="btn btn-success">
                        <i className="fas fa-plus"></i> Agregar Producto
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-12 col-md-6 col-lg-4">
              <div
                className={`card plant-card h-100 ${getAvailabilityClass(
                  product.stock
                )}`}
              >
                {getAvailabilityBadge(product.stock)}
                <img
                  src={product.img}
                  className="card-img-top plant-image"
                  alt={product.nombre}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.nombre}</h5>
                  <p className="text-muted">{product.descripcion}</p>

                  {/* Características de la planta */}
                  <ul className="plant-features">
                    <li>
                      <i className="fas fa-sun"></i>{" "}
                      {product.luz || "Luz indirecta"}
                    </li>
                    <li>
                      <i className="fas fa-tint"></i>{" "}
                      {product.riego || "Riego moderado"}
                    </li>
                    <li>
                      <i className="fas fa-ruler-combined"></i>{" "}
                      {product.altura || "Altura variable"}
                    </li>
                  </ul>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                      {product.precioOriginal && (
                        <>
                          <span className="price-tag text-decoration-line-through text-muted">
                            ${product.precioOriginal.toLocaleString("es-CL")}
                          </span>
                          <br />
                        </>
                      )}
                      <span
                        className={`price-tag ${
                          product.precioOriginal ? "text-success" : ""
                        }`}
                      >
                        ${product.precio.toLocaleString("es-CL")}
                      </span>
                      {product.discount && (
                        <span className="badge bg-danger ms-2">
                          -{product.discount}%
                        </span>
                      )}
                    </div>
                    <button
                      className="btn btn-plant"
                      onClick={() =>
                        handleAddToCart(
                          product.id,
                          product.nombre,
                          product.precio
                        )
                      }
                      disabled={product.stock === 0}
                    >
                      <i className="fas fa-cart-plus"></i>
                      {product.stock === 0 ? " Agotado" : " Agregar"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje si no hay productos */}
        {filteredProducts.length === 0 && (
          <div className="alert alert-info text-center mt-4">
            No se encontraron productos con el filtro seleccionado.
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
