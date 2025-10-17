import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const { loginUser, registerUser } = useAuth();
  const navigate = useNavigate();

  // Estado para controlar qué formulario mostrar
  const [showRegister, setShowRegister] = useState(false);

  // Estado para los campos del login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado para los campos del registro
  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // Estado para mensajes
  const [loginMsg, setLoginMsg] = useState({ text: "", type: "" });
  const [registerMsg, setRegisterMsg] = useState({ text: "", type: "" });

  // Manejar login
  const handleLogin = (e) => {
    e.preventDefault();
    const result = loginUser(email, password);

    if (result.ok) {
      setLoginMsg({ text: "¡Inicio de sesión exitoso!", type: "success" });
      // Redirigir al usuario después del login exitoso
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setLoginMsg({ text: result.message, type: "danger" });
    }
  };

  // Manejar registro
  const handleRegister = (e) => {
    e.preventDefault();
    const result = registerUser({ name, email: regEmail, pass: regPassword });

    if (result.ok) {
      setRegisterMsg({ text: result.message, type: "success" });
      // Si AUTO_LOGIN_AFTER_REGISTER está en true, ya está logueado
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setRegisterMsg({ text: result.message, type: "danger" });
    }
  };

  // Alternar entre login y registro
  const toggleForm = () => {
    setShowRegister(!showRegister);
    setLoginMsg({ text: "", type: "" });
    setRegisterMsg({ text: "", type: "" });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-11 mt-60 mx-md-auto">
          <div className="login-box bg-white pl-lg-5 pl-0">
            <div className="row no-gutters align-items-center">
              <div className="col-md-6">
                {/* LOGIN FORM */}
                <div
                  className={`form-wrap bg-white ${
                    showRegister ? "d-none" : ""
                  }`}
                >
                  <h4 className="btm-sep pb-3 mb-5">Iniciar Sesión</h4>
                  <form onSubmit={handleLogin}>
                    {loginMsg.text && (
                      <div className={`alert alert-${loginMsg.type}`}>
                        {loginMsg.text}
                      </div>
                    )}
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3 text-end">
                      <a href="#" className="c-black">
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-dark btn-block w-100"
                    >
                      Iniciar
                    </button>
                  </form>
                  <p className="mt-3 text-center">
                    ¿No tienes cuenta?{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleForm();
                      }}
                    >
                      Registrarse
                    </a>
                  </p>
                </div>

                {/* REGISTER FORM */}
                <div
                  className={`form-wrap bg-white ${
                    !showRegister ? "d-none" : ""
                  }`}
                >
                  <h4 className="btm-sep pb-3 mb-5">Registrarse</h4>
                  <form onSubmit={handleRegister}>
                    {registerMsg.text && (
                      <div className={`alert alert-${registerMsg.type}`}>
                        {registerMsg.text}
                      </div>
                    )}
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Correo electrónico"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success btn-block w-100"
                    >
                      Crear cuenta
                    </button>
                  </form>
                  <p className="mt-3 text-center">
                    ¿Ya tienes cuenta?{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleForm();
                      }}
                    >
                      Inicia sesión
                    </a>
                  </p>
                </div>
              </div>

              <div className="col-md-6 text-center">
                <h3>EcoStyle</h3>
                <p>Riega tus plantas, ama tus rosas</p>
                <p>El resto es la sombra de árboles ajenos.</p>
                <h5 className="mt-4">También con</h5>
                <div className="socials mt-2">
                  <a href="#" className="zmdi zmdi-facebook mx-1"></a>
                  <a href="#" className="zmdi zmdi-google mx-1"></a>
                  <a href="#" className="zmdi zmdi-instagram mx-1"></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
