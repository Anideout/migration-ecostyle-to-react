import { useState } from "react";
import { AuthContext } from "./AuthContext";

// Expresión regular para validar dominios permitidos
const ALLOWED_DOMAINS_RE = /@(?:duocuc\.cl|duoc\.cl|gmail\.com)$/i;

// Configuración: si se registra, loguea automáticamente
const AUTO_LOGIN_AFTER_REGISTER = true;

export function AuthProvider({ children }) {
  // Estado para usuarios registrados
  const [users, setUsers] = useState(() => {
    return [
      { name: "Admin", email: "admin@gmail.com", pass: "1234", role: "admin" },
      { name: "Usuario", email: "user@gmail.com", pass: "1234", role: "user" },
    ];
  });

  // Estado para el usuario actual
  const [currentUser, setCurrentUser] = useState(null);

  // Validar dominio del email
  const emailDomainOk = (email) => {
    return ALLOWED_DOMAINS_RE.test((email || "").trim());
  };

  // Buscar usuario por email
  const findUserByEmail = (email) => {
    return (
      users.find(
        (u) => u.email.toLowerCase() === (email || "").toLowerCase()
      ) || null
    );
  };

  // Registrar un nuevo usuario
  const registerUser = ({ name, email, pass }) => {
    if (!name?.trim() || !email?.trim() || !pass?.trim()) {
      return {
        ok: false,
        code: "missing_fields",
        message: "Todos los campos son obligatorios",
      };
    }

    if (!emailDomainOk(email)) {
      return {
        ok: false,
        code: "bad_domain",
        message: "El correo no es válido, usa duocuc.cl, duoc.cl o gmail.com",
      };
    }

    if (findUserByEmail(email)) {
      return {
        ok: false,
        code: "already_exists",
        message: "El correo ya existe.",
      };
    }

    const newUser = {
      name: name.trim(),
      email: email.trim(),
      pass: pass.trim(),
      role: "user",
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);

    if (AUTO_LOGIN_AFTER_REGISTER) {
      setCurrentUser({
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      });
      return {
        ok: true,
        code: "registered_and_logged",
        message: "Usuario registrado y logueado correctamente",
      };
    }

    return { ok: true, code: "registered", user: newUser };
  };

  // Loguear usuario
  const loginUser = (email, pass) => {
    if (!email?.trim() || !pass?.trim()) {
      return {
        ok: false,
        code: "missing_fields",
        message: "Correo y contraseña son obligatorios",
      };
    }

    if (!emailDomainOk(email)) {
      return {
        ok: false,
        code: "bad_domain",
        message: "Dominio no válido",
      };
    }

    const user = findUserByEmail(email);
    if (!user) {
      return {
        ok: false,
        code: "not_found",
        message: "Este correo no está registrado.",
      };
    }

    if (user.pass !== pass) {
      return {
        ok: false,
        code: "bad_credentials",
        message: "Usuario o contraseña no válidos.",
      };
    }

    setCurrentUser({
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return { ok: true, code: "logged_in", user };
  };

  // Cerrar sesión
  const logout = () => {
    setCurrentUser(null);
  };

  // Verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return currentUser !== null;
  };

  // Verificar si el usuario es admin
  const isAdmin = () => {
    return currentUser?.role === "admin";
  };

  const value = {
    currentUser,
    users,
    registerUser,
    loginUser,
    logout,
    isAuthenticated,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
