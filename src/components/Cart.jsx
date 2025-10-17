import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    cart,
    clearCart,
    updateQuantity,
    removeItem,
    findProductInfo,
    getDefaultImage,
  } = useCart();

  const fmt = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const prodInfo = findProductInfo(item.id) || {};
      const price =
        typeof item.price === "number" ? item.price : prodInfo.price || 0;
      const qty = Number(item.qty) || 1;
      return total + price * qty;
    }, 0);
  };

  const handleConfirm = () => {
    const total = calculateTotal();
    sessionStorage.setItem("LAST_ORDER_TOTAL", fmt.format(total));
    clearCart();
    navigate("/gracias");
  };

  const getItemDetails = (item) => {
    const prodInfo = findProductInfo(item.id) || {};
    const name = item.name || prodInfo.name || `Producto ${item.id}`;
    const price =
      typeof item.price === "number" ? item.price : prodInfo.price || 0;
    let img = item.img || prodInfo.img;
    if (!img) {
      img = getDefaultImage(name);
    }
    const qty = Number(item.qty) || 1;
    return { name, price, img, qty };
  };

  return (
    <>
      <div className="back-to-shop">
        <a href="/">&leftarrow;</a>
        <span className="text-muted">Volver a la tienda</span>
      </div>
      <div className="container-fluid">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>
              <i className="fas fa-shopping-cart"></i> Carrito de compras
            </span>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={clearCart}
            >
              Vaciar carrito
            </button>
          </div>
          <div className="card-body">
            {cart.length === 0 ? (
              <div className="alert alert-info">Tu carrito está vacío.</div>
            ) : null}
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Producto</th>
                    <th className="text-end">Precio</th>
                    <th className="text-center">Cantidad</th>
                    <th className="text-end">Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => {
                    const { name, price, img, qty } = getItemDetails(item);
                    const subtotal = price * qty;
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={img}
                              alt={name}
                              className="img-sm"
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                                borderRadius: "6px",
                              }}
                            />
                            <span>{name}</span>
                          </div>
                        </td>
                        <td className="text-end">{fmt.format(price)}</td>
                        <td className="text-center">
                          <div className="btn-group btn-group-sm" role="group">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              -
                            </button>
                            <span className="btn btn-light disabled px-3">
                              {qty}
                            </span>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="text-end">{fmt.format(subtotal)}</td>
                        <td className="text-end">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => removeItem(item.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan="4" className="text-end">
                      Total
                    </th>
                    <th className="text-end">{fmt.format(calculateTotal())}</th>
                    <th></th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <a className="btn btn-outline-secondary" href="/catalogo">
                Seguir comprando
              </a>
              <button
                className="btn btn-main"
                onClick={handleConfirm}
                disabled={cart.length === 0}
              >
                Confirmar compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
