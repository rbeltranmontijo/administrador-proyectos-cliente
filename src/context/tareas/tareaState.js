import React, { useReducer } from "react";

import TareaContext from "./tareaContext";
import TareaReucer from "./tareaReducer";
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  ESTADO_TAREA
} from "../../types";

const TareaState = props => {
  const initialState = {
    tareas: [
      { id: 1, nombre: "Elegir Plataforma", estado: true, proyectoId: 1 },
      { id: 2, nombre: "Elegir Colores", estado: false, proyectoId: 2 },
      {
        id: 3,
        nombre: "Elegir Plataforma de pago",
        estado: false,
        proyectoId: 3
      },
      { id: 4, nombre: "Elegir Hosting", estado: true, proyectoId: 4 },
      { id: 5, nombre: "Elegir Plataforma", estado: true, proyectoId: 1 },
      { id: 6, nombre: "Elegir Colores", estado: false, proyectoId: 2 },
      {
        id: 7,
        nombre: "Elegir Plataforma de pago",
        estado: false,
        proyectoId: 3
      },
      { id: 8, nombre: "Elegir Plataforma", estado: true, proyectoId: 4 },
      { id: 9, nombre: "Elegir Colores", estado: false, proyectoId: 1 },
      {
        id: 10,
        nombre: "Elegir Plataforma de pago",
        estado: false,
        proyectoId: 2
      },
      { id: 11, nombre: "Elegir Plataforma", estado: true, proyectoId: 3 },
      { id: 12, nombre: "Elegir Colores", estado: false, proyectoId: 4 },
      {
        id: 13,
        nombre: "Elegir Plataforma de pago",
        estado: false,
        proyectoId: 3
      }
    ],
    tareasproyecto: null,
    errortarea: false
  };

  // Crear el dispatch y state
  const [state, dispatch] = useReducer(TareaReucer, initialState);

  // Crear las funciones

  // Obtener las tareas de un proyecto
  const obtenerTareas = proyectoId => {
    dispatch({
      type: TAREAS_PROYECTO,
      payload: proyectoId
    });
  };

  // Agregar una tarea al proyecto
  const agregarTarea = tarea => {
    dispatch({
      type: AGREGAR_TAREA,
      payload: tarea
    });
  };

  // Validar y muestra un error
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA
    });
  };

  // Eliminar tarea por id
  const eliminarTarea = id => {
    dispatch({
      type: ELIMINAR_TAREA,
      payload: id
    });
  };

  // Cambia el estado de cada tarea
  const estadoTarea = tarea => {
    dispatch({
      type: ESTADO_TAREA,
      payload: tarea
    });
  };

  return (
    <TareaContext.Provider
      value={{
        tareas: state.tareas,
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        estadoTarea
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
