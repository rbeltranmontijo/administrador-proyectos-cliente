import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const Login = props => {
  // Extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlertas } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  // En caso de que un usuario no exista
  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }

    if (mensaje) {
      mostrarAlertas(mensaje.msg, mensaje.categoria);
    }
  }, [mensaje, autenticado, props.history]);

  // State para iniciar sesión
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: ""
  });

  // Extraer el usuario
  const { email, password } = usuario;

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
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlertas("Todos los campos son obligatorios", "alerta-error");
    }

    // Pasar al action
    iniciarSesion({ email, password });
  };

  return (
    <React.Fragment>
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="form-usuario">
        <div className="contenedor-form sombra-dark">
          <h1>Iniciar Sesión</h1>

          <form onSubmit={onSubmit}>
            <div className="campo-form">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Tu Email"
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
              <input
                type="submit"
                className="btn btn-primario btn-block"
                value="Iniciar Sesión"
              />
            </div>
          </form>
          <Link to={"/nueva-cuenta"} className="enlace-cuenta">
            Obtener Cuenta
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
