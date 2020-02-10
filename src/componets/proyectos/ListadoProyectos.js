import React, { useContext, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import proyectoContext from "../../context/proyectos/proyectoContext";

import Proyecto from "./Proyecto";

const ListadoProyectos = () => {
  // Importando proyectos desde el state inicial en proyectosState.js
  const proyectosContext = useContext(proyectoContext);
  const { proyectos, obtenerProyectos } = proyectosContext;

  // Obtener proyectos cuando carga el componente
  useEffect(() => {
    obtenerProyectos();
    // eslint-disable-next-line
  }, []);

  // Validando si hay rpoyectos
  if (proyectos.length === 0)
    return <p>No hay proyectos, comienza creando uno</p>;

  return (
    <ul className="listado-proyectos">
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
