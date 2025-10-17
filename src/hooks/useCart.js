import { useState, useEffect } from "react";

const CART_KEY = "APP_CART";
const PROD_KEY = "APP_PRODS";

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadCart();
    loadProducts();

    const handleCartUpdate = () => loadCart();
    window.addEventListener("cart:updated", handleCartUpdate);
    return () => window.removeEventListener("cart:updated", handleCartUpdate);
  }, []);

  const loadCart = () => {
    try {
      const data = JSON.parse(localStorage.getItem(CART_KEY)) || [];
      setCart(data);
    } catch {
      setCart([]);
    }
  };

  const loadProducts = () => {
    try {
      const data = JSON.parse(localStorage.getItem(PROD_KEY)) || [];
      setProducts(data);
    } catch {
      setProducts([]);
    }
  };

  const saveCart = (newCart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(newCart));
    setCart(newCart);
    window.dispatchEvent(new CustomEvent("cart:updated"));
  };

  const clearCart = () => saveCart([]);

  const updateQuantity = (id, delta) => {
    const item = cart.find((x) => String(x.id) === String(id));
    if (!item) return;

    const newQty = (Number(item.qty) || 1) + delta;
    if (newQty <= 0) {
      removeItem(id);
    } else {
      const updatedCart = cart.map((x) =>
        String(x.id) === String(id) ? { ...x, qty: newQty } : x
      );
      saveCart(updatedCart);
    }
  };

  const removeItem = (id) => {
    const newCart = cart.filter((x) => String(x.id) !== String(id));
    saveCart(newCart);
  };

  const findProductInfo = (id) => {
    const p = products.find((x) => String(x.id) === String(id));
    if (p) return { name: p.nombre, price: Number(p.precio) || 0, img: p.img };
    return null;
  };

  const getDefaultImage = (name) => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes("monstera")) return "images/monstera.jpg";
    if (nameLower.includes("ficus")) return "images/ficus.jpg";
    if (nameLower.includes("alocasia-polly"))
      return "images/alocasia-polly.jpg";
    if (nameLower.includes("alocasia")) return "images/alocasia.jpg";
    if (nameLower.includes("sansevieria"))
      return "images/sansevieria-trifasciata.jpg";
    if (nameLower.includes("poto")) return "images/Poto-dorado.jpg";
    return "images/1.jpg";
  };

  return {
    cart,
    products,
    clearCart,
    updateQuantity,
    removeItem,
    findProductInfo,
    getDefaultImage,
  };
};
