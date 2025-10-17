import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts debe ser usado dentro de un ProductsProvider");
  }

  return context;
}
