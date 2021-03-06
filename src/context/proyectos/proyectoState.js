import React, { useReducer } from "react";

import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR
} from "../../types";

import clienteAxios from "../../config/axios";

const ProyectoState = props => {
  const initialState = {
    proyectos: [],
    formulario: false,
    errorformulario: false,
    proyecto: null,
    mensaje: null
  };

  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  // Serie de funciones para el CRUD
  // Funcion que va a mostrar el formulario del boton Nuevo Proyecto
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO
    });
  };

  const obtenerProyectos = async () => {
    try {
      const resultado = await clienteAxios.get("api/proyectos");

      dispatch({
        type: OBTENER_PROYECTOS,
        payload: resultado.data.proyectos
      });
    } catch (error) {
      const alerta = { msg: "Hubo un error", categoria: "alerta-error" };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      });
    }
  };

  // Agregar nuevo proyecto
  const agregarProyecto = async proyecto => {
    // Agregar al state con un dispatch
    try {
      const resultado = await clienteAxios.post("/api/proyectos", proyecto);
      // console.log(resultado);
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data
      });
    } catch (error) {
      const alerta = { msg: "Hubo un error", categoria: "alerta-error" };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      });
    }
  };

  // Validar formulario por error de agregar proyecto
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO
    });
  };

  // Selecciona el proyecto que el usuario dio click
  const proyectoActual = proyectoID => {
    // console.log(proyectoID);
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoID
    });
  };

  // Eliminar proyecto
  const eliminarProyecto = async proyectoID => {
    try {
      const url = `/api/proyectos/${proyectoID}`;
      // console.log(url);
      await clienteAxios.delete(url);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoID
      });
    } catch (error) {
      const alerta = { msg: "Hubo un error", categoria: "alerta-error" };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      });
    }
  };

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
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
