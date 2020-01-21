import React, { useReducer } from "react";
import uuid from "uuid";

import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO
} from "../../types";

const ProyectoState = props => {
  const initialState = {
    proyectos: [],
    formulario: false,
    errorformulario: false,
    proyecto: null
  };

  const proyectos = [
    { id: 1, nombre: "Tienda Virtual" },
    { id: 2, nombre: "Intranet" },
    { id: 3, nombre: "Blog" },
    { id: 4, nombre: "MERN" }
  ];

  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  // Serie de funciones para el CRUD
  // Funcion que va a mostrar el formulario del boton Nuevo Proyecto
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO
    });
  };

  const obtenerProyectos = () => {
    dispatch({
      type: OBTENER_PROYECTOS,
      payload: proyectos
    });
  };

  // Agregar nuevo proyecto
  const agregarProyecto = proyecto => {
    proyecto.id = uuid.v4();

    // Agregar al state con un dispatch
    dispatch({
      type: AGREGAR_PROYECTO,
      payload: proyecto
    });
  };

  // Validar formulario por error de agregar proyecto
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO
    });
  };

  // Selecciona el proyecto que el usuario dio click
  const proyectoActual = proyectoID => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoID
    });
  };

  // Eliminar proyecto
  const eliminarProyecto = proyectoID => {
    dispatch({
      type: ELIMINAR_PROYECTO,
      payload: proyectoID
    });
  };

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
