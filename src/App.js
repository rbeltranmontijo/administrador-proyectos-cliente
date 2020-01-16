import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./componets/auth/Login";
import NuevaCuenta from "./componets/auth/NuevaCuenta";
import Proyectos from "./componets/proyectos/Proyectos";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
        <Route exact path="/proyectos" component={Proyectos} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
