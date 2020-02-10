import React, { useContext, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import proyectoContext from "../../context/proyectos/proyectoContext";
import AlertaContext from "../../context/alertas/alertaContext";

import Proyecto from "./Proyecto";

const ListadoProyectos = () => {
  // Importando proyectos desde el state inicial en proyectosState.js
  const proyectosContext = useContext(proyectoContext);
  const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlertas } = alertaContext;

  // Obtener proyectos cuando carga el componente
  useEffect(() => {
    // Si hay un error
    if (mensaje) {
      mostrarAlertas(mensaje.msg, mensaje.categoria);
    }
    obtenerProyectos();
    // eslint-disable-next-line
  }, [mensaje]);

  // Validando si hay rpoyectos
  if (proyectos.length === 0)
    return <p>No hay proyectos, comienza creando uno</p>;

  return (
    <ul className="listado-proyectos">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <TransitionGroup>
        {proyectos.map(proyecto => (
          <CSSTransition key={proyecto._id} timeout={200} classNames="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
