import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Tarea = ({ tarea }) => {
  // OBtener la funcion del context de tarea
  const tareasContext = useContext(tareaContext);
  const {
    eliminarTarea,
    obtenerTareas,
    actualizarTarea,
    guardarTareaActual
  } = tareasContext;

  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  // Funcion que se ejecuta cuando el usuario presiona el boton de eliminar tarea
  const tareaEliminar = id => {
    eliminarTarea(id, proyecto[0]._id);
    obtenerTareas(proyecto[0].id);
  };

  // Funcion que modifica el estado de las tareas
  const cambiarEstado = tarea => {
    if (tarea.estado === true) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }

    actualizarTarea(tarea);
  };

  // Agrega una tarea actual cuando se edita
  const seleccionarTarea = tarea => {
    guardarTareaActual(tarea);
  };

  return (
    <li className="tarea combra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button
            type="button"
            className="completo"
            onClick={() => cambiarEstado(tarea)}
          >
            Completo
          </button>
        ) : (
          <button
            type="button"
            className="incompleto"
            onClick={() => cambiarEstado(tarea)}
          >
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => seleccionarTarea(tarea)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => tareaEliminar(tarea._id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
