import React, { useState, useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
function Index() {
  const { products, addToCart, getCartCount } = useProducts();

  // Estado para el modal
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState({ text: "", type: "" });

  // Productos destacados (primeros 3 del catálogo)
  const featuredProducts = [
    {
      nombre: "Monstera",
      img: "images/monstera.jpg",
      img2: "images/monstera2.jpg",
      id: 1001,
      precio: 7990,
      descripcion:
        "La danza vegetal de la selva condensada en una hoja, regalando con su belleza, estragos de la constelacione",
    },
    {
      nombre: "Alocasia",
      img: "images/alocasia.jpg",
      img2: "images/alocasia-2.jpg",
      id: 1002,
      precio: 9990,
      descripcion:
        "El manto de eva con su grandeza, nos regala la eterna sombra de las tardes, un presente paradisiatico atenuante de sus hojas.",
    },
    {
      nombre: "Ficus",
      img: "images/ficus.jpg",
      img2: "images/ficus2.jpg",
      id: 1003,
      precio: 12990,
      descripcion:
        "la joya oculta de un universo aún no descubierto, un susurro carmesí de estrellas que danzan entre sí, reflejan la luz como si cada veta guardara el mapa de una dimensión auún no descubierta.",
    },
  ];

  // Abrir modal con producto seleccionado
  const openModal = (product) => {
    setSelectedProduct(product);
    setCantidad(1);
    setShowModal(true);
    setMensaje({ text: "", type: "" });
  };

  // Cerrar modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setCantidad(1);
    setMensaje({ text: "", type: "" });
  };

  // Agregar al carrito
  const handleAddToCart = () => {
    if (selectedProduct) {
      const result = addToCart(selectedProduct.id, cantidad);

      if (result.ok) {
        setMensaje({ text: result.message, type: "success" });
        setTimeout(() => {
          closeModal();
        }, 1500);
      } else {
        setMensaje({ text: result.message, type: "danger" });
      }
    }
  };

  // Inicializar Bootstrap carousel al montar el componente
  useEffect(() => {
    // Bootstrap carousel se inicializa automáticamente
    // pero puedes agregar configuración personalizada aquí si es necesario
  }, []);

  return (
    <div>
      {/* Carousel */}
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="images/1.jpg" className="d-block w-100" alt="Oferta 1" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="fw-bold">
                Tus plantitas favoritas al mejor precio.
              </h2>
              <p>Encuentra tus favoritas en tu lugar favorito.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="images/arbol-bosque-naturaleza-viejo-wallpaper-preview.jpg"
              className="d-block w-100"
              alt="Oferta 2"
            />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="fw-bold">Ofertas Imperdibles</h2>
              <p>Stock limitado. ¡Aprovecha!</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="images/4.jpg" className="d-block w-100" alt="Oferta 3" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="fw-bold">¡¡Oferta Especial!!</h2>
              <p>Encuentra tus favoritas en tu lugar favorito.</p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Productos */}
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="mb-0">Productos destacados</h3>
          <a className="btn btn-outline-primary btn-sm" href="/carrito">
            Ver carrito ({getCartCount()})
          </a>
        </div>

        {/* Fila de 3 tarjetas animadas */}
        <div className="d-flex justify-content-center gap-4 mb-4 flex-wrap tarjetas-animadas">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="card card-menu"
              onClick={() => openModal(product)}
              style={{ cursor: "pointer" }}
            >
              <div className="first-content">
                <span>
                  <img
                    src={product.img}
                    alt={product.nombre}
                    width="190"
                    height="254"
                  />
                </span>
              </div>
              <div className="second-content">
                <span>
                  <img
                    src={product.img2}
                    alt={`${product.nombre} 2`}
                    width="190"
                    height="254"
                  />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal para agregar al carrito */}
        {showModal && selectedProduct && (
          <div
            className="modal fade show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            tabIndex="-1"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Agregar al carrito</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body text-center">
                  <img
                    src={selectedProduct.img}
                    alt={selectedProduct.nombre}
                    style={{
                      maxWidth: "180px",
                      maxHeight: "180px",
                      borderRadius: "10px",
                    }}
                  />
                  <h5 className="mt-3">{selectedProduct.nombre}</h5>
                  <p className="mb-2">{selectedProduct.descripcion}</p>
                  <p className="mb-2 fw-bold">
                    ${selectedProduct.precio.toLocaleString("es-CL")}
                  </p>

                  {mensaje.text && (
                    <div className={`alert alert-${mensaje.type} mt-3`}>
                      {mensaje.text}
                    </div>
                  )}

                  <div className="input-group mb-3 w-50 mx-auto">
                    <span className="input-group-text">Cantidad</span>
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      value={cantidad}
                      onChange={(e) =>
                        setCantidad(parseInt(e.target.value) || 1)
                      }
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddToCart}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lista completa de productos */}
        <div className="row g-4" id="destacados">
          {products.map((product) => (
            <div key={product.id} className="col-md-4">
              <div className="card h-100">
                <img
                  src={product.img}
                  className="card-img-top"
                  alt={product.nombre}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.nombre}</h5>
                  <p className="card-text">{product.descripcion}</p>
                  <p className="fw-bold">
                    ${product.precio.toLocaleString("es-CL")}
                  </p>
                  <p className="text-muted">Stock: {product.stock}</p>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => openModal(product)}
                    disabled={product.stock === 0}
                  >
                    {product.stock > 0 ? "Agregar al carrito" : "Sin stock"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Index;
