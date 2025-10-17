import { LayoutContext } from "./LayoutContext";
import { useAuth } from "../hooks/useAuth";
import { useProducts } from "../hooks/useProducts";

export function LayoutProvider({ children }) {
  const { currentUser, logout } = useAuth();
  const { getCartCount } = useProducts();

  // Obtener el conteo del carrito
  const cartCount = getCartCount();

  // Verificar si es admin
  const isAdmin = () => {
    return currentUser?.role === "admin";
  };

  // Verificar si está autenticado
  const isAuthenticated = () => {
    return currentUser !== null;
  };

  // Manejar logout
  const handleLogout = () => {
    logout();
    // Aquí puedes agregar navegación si usas react-router
    // navigate('/login');
  };

  // Obtener nombre del usuario
  const getUserDisplayName = () => {
    if (currentUser) {
      return `${currentUser.name} (${currentUser.role})`;
    }
    return "Invitado";
  };

  // Obtener año actual para el footer
  const currentYear = new Date().getFullYear();

  const value = {
    currentUser,
    cartCount,
    isAdmin,
    isAuthenticated,
    handleLogout,
    getUserDisplayName,
    currentYear,
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}
