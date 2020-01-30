import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const NuevaCuenta = () => {
  // Extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlertas } = alertaContext;

  const authContext = useContext(AuthContext);
  const { registrarUsuario } = authContext;

  // State para iniciar sesión
  const [usuario, guardarUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: ""
  });

  // Extraer el usuario
  const { nombre, email, password, confirmar } = usuario;

  const onChange = e => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  // Cuando el usuario quiere iniciar sesion
  const onSubmit = e => {
    e.preventDefault();

    // Validar que no haya campos vacios
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlertas("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    // Password minimo 6 caracteres
    if (password.length < 6) {
      mostrarAlertas(
        "El password debe ser minimo 6 caracteres",
        "alerta-error"
      );
      return;
    }

    // Los dos password iguales
    if (password !== confirmar) {
      mostrarAlertas("Los passwords no son iguales", "alerta-error");
      return;
    }

    // Pasar al action
    registrarUsuario({
      nombre,
      email,
      password
    });
  };

  return (
    <React.Fragment>
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="form-usuario">
        <div className="contenedor-form sombra-dark">
          <h1>Crear cuenta</h1>

          <form onSubmit={onSubmit}>
            <div className="campo-form">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Tu nombre"
                value={nombre}
                onChange={onChange}
              />
            </div>
            <div className="campo-form">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Tu email"
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="campo-form">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Tu Password"
                value={password}
                onChange={onChange}
              />
            </div>
            <div className="campo-form">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="confirmar"
                name="confirmar"
                placeholder="Tu Password"
                value={confirmar}
                onChange={onChange}
              />
            </div>

            <div className="campo-form">
              <input
                type="submit"
                className="btn btn-primario btn-block"
                value="Registrarme"
              />
            </div>
          </form>
          <Link to={"/"} className="enlace-cuenta">
            Volver a iniciar sesión
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NuevaCuenta;
