import React, { useContext, useEffect } from "react";

import proyectoContext from "../../context/proyectos/proyectoContext";

import Proyecto from "./Proyecto";

const ListadoProyectos = () => {
  // Importando proyectos desde el state inicial en proyectosState.js
  const proyectosContext = useContext(proyectoContext);
  const { proyectos, obtenerProyectos } = proyectosContext;

  // Obtener proyectos cuando carga el componente
  useEffect(() => {
    obtenerProyectos();
  }, []);

  // Validando si hay rpoyectos
  if (proyectos.length === 0)
    return <p>No hay proyectos, comienza creando uno</p>;

  return (
    <ul className="listado-proyectos">
      {proyectos.map(proyecto => (
        <Proyecto key={proyecto.id} proyecto={proyecto} />
      ))}
    </ul>
  );
};

export default ListadoProyectos;
