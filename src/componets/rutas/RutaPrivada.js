import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/autenticacion/authContext";

const RutaPrivada = ({ component: Component, ...props }) => {
  console.log(props);

  const autContext = useContext(AuthContext);
  const { autenticado, cargando, usuarioAutenticado } = autContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);
  return (
    <Route
      {...props}
      render={props =>
        !autenticado && !cargando ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RutaPrivada;
