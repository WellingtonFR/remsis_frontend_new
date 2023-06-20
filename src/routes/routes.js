import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Header from "../components/Header";

import Home from "../pages/Home";
import FiliaisCreate from "../pages/FiliaisCreate";
import FiliaisIndex from "../pages/FiliaisIndex";
import FiliaisUpdate from "../pages/FiliaisUpdate";
import SaidaIndex from "../pages/SaidaIndex";
import SaidaCreate from "../pages/SaidaCreate";
import SaidaUpdate from "../pages/SaidaUpdate";
import SaidaReport from "../pages/SaidaReport";
import TransportadorCreate from "../pages/TransportadorCreate";
import TransportadorIndex from "../pages/TransportadorIndex";
import TransportadorUpdate from "../pages/TransportadorUpdate";
import ConferenteIndex from "../pages/ConferenteIndex";
import ConferenteCreate from "../pages/ConferenteCreate";
import Login from "../pages/Login";
import NotFoundPage from "../pages/NotFoundPage";
import EntradaCreate from "../pages/EntradaCreate";
import EntradaIndex from "../pages/EntradaIndex";
import EstoqueIndex from "../pages/EstoqueIndex";

export default function Routes() {
  const token = localStorage.getItem("token");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isAuthenticated = () => token !== "" && isLoggedIn === "true";

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (isAuthenticated() ? <Component {...props} /> : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />)} />
  );

  return (
    <BrowserRouter>
      <Header />
      <div>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />

          {/*Filial*/}
          <PrivateRoute exact path="/filiais" component={FiliaisIndex} />
          <PrivateRoute path="/filiais/create" component={FiliaisCreate} />
          <PrivateRoute path="/filiais/update/:id" component={FiliaisUpdate} />

          {/*Saida */}
          <PrivateRoute exact path="/saida" component={SaidaIndex} />
          <PrivateRoute path="/saida/create" component={SaidaCreate} />
          <PrivateRoute path="/saida/update/:id" component={SaidaUpdate} />
          <PrivateRoute path="/saida/report/:id" component={SaidaReport} />

          {/*Entrada */}
          <PrivateRoute exact path="/entrada" component={EntradaIndex} />
          <PrivateRoute path="/entrada/create" component={EntradaCreate} />
          {/* <PrivateRoute path="/saida/update/:id" component={SaidaUpdate} /> */}
          {/* <PrivateRoute path="/saida/report/:id" component={SaidaReport} /> */}

          {/* Estoque */}
          <PrivateRoute exact path="/estoque" component={EstoqueIndex} />

          {/*Transportador*/}
          <PrivateRoute exact path="/transportador" component={TransportadorIndex} />
          <PrivateRoute path="/transportador/create" component={TransportadorCreate} />
          <PrivateRoute path="/transportador/update/:id" component={TransportadorUpdate} />

          {/*Conferente*/}
          <PrivateRoute exact path="/conferente" component={ConferenteIndex} />
          <PrivateRoute path="/conferente/create" component={ConferenteCreate} />

          {/*Login*/}
          <Route exact path="/login" component={Login} />

          {/* 404 error */}
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
