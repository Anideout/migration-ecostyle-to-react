import { useState } from "react";
import { ProductsContext } from "./ProductsContext";

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([
    {
      id: 1001,
      nombre: "Monstera Deliciosa",
      precio: 24990,
      stock: 10,
      img: "images/monstera2.jpg",
      descripcion: "Planta tropical de hojas perforadas",
    },
    {
      id: 1002,
      nombre: "Sansevieria Trifasciata",
      precio: 15725,
      stock: 15,
      img: "images/sansevieria-trifasciata.jpg",
      descripcion: "Lengua de tigre - Purificadora de aire",
    },
    {
      id: 1003,
      nombre: "Poto Dorado",
      precio: 13590,
      stock: 5,
      img: "images/Poto-dorado.jpg",
      descripcion: "Planta colgante de fácil cuidado",
    },
    {
      id: 1004,
      nombre: "Alocasia Polly",
      precio: 32500,
      stock: 8,
      img: "images/alocasia-polly.jpg",
      descripcion: "Planta ornamental de hojas grandes",
    },
    {
      id: 1005,
      nombre: "Schlumbergera Truncata",
      precio: 21990,
      stock: 0,
      img: "images/schlumbergera-truncata.jpg",
      descripcion: "Una planta muy apreciada por su belleza",
    },
  ]);

  const [cart, setCart] = useState([]);

  const getAllProducts = () => products;

  const getProductById = (id) => {
    return products.find((p) => p.id === parseInt(id));
  };

  const addProduct = (producto) => {
    const newProduct = {
      ...producto,
      id: Date.now(),
    };
    setProducts((prev) => [...prev, newProduct]);
    return { ok: true, product: newProduct };
  };

  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === parseInt(id) ? { ...p, ...updatedData } : p))
    );
    return { ok: true };
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== parseInt(id)));
    return { ok: true };
  };

  const addToCart = (productId, cantidad = 1) => {
    const product = getProductById(productId);

    if (!product) {
      return { ok: false, message: "Producto no encontrado" };
    }

    if (product.stock < cantidad) {
      return { ok: false, message: "Stock insuficiente" };
    }

    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === productId);

      if (existingItem) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }

      return [...prev, { ...product, cantidad }];
    });

    updateProduct(productId, { stock: product.stock - cantidad });
    return { ok: true, message: "Producto agregado al carrito" };
  };

  const removeFromCart = (productId) => {
    const cartItem = cart.find((item) => item.id === productId);

    if (cartItem) {
      const product = getProductById(productId);
      if (product) {
        updateProduct(productId, { stock: product.stock + cartItem.cantidad });
      }
    }

    setCart((prev) => prev.filter((item) => item.id !== productId));
    return { ok: true };
  };

  const updateCartQuantity = (productId, nuevaCantidad) => {
    const cartItem = cart.find((item) => item.id === productId);
    const product = getProductById(productId);

    if (!cartItem || !product) return { ok: false };

    const diferencia = nuevaCantidad - cartItem.cantidad;

    if (product.stock < diferencia) {
      return { ok: false, message: "Stock insuficiente" };
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, cantidad: nuevaCantidad } : item
      )
    );

    updateProduct(productId, { stock: product.stock - diferencia });
    return { ok: true };
  };

  const clearCart = () => {
    cart.forEach((item) => {
      const product = getProductById(item.id);
      if (product) {
        updateProduct(item.id, { stock: product.stock + item.cantidad });
      }
    });

    setCart([]);
    return { ok: true };
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.cantidad, 0);
  };

  const value = {
    products,
    cart,
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}
