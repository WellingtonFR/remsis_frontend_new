import React, { Fragment } from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";

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
import Navbar from "../components/Navbar";

export default function App() {
  const token = localStorage.getItem("token");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isAuthenticated = () => token !== "" && isLoggedIn === "true";

  const PrivateRoute = ({ element: Element, ...rest }) => (
    <Route {...rest} render={(props) => (isAuthenticated() ? <Element {...props} /> : <Navigate to={{ pathname: "/login", state: { from: props.location } }} />)} />
  );

  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/*Filial*/}
          <Route path="/filiais" element={<FiliaisIndex />} />
          <Route path="/filiais/create" element={<FiliaisCreate />} />
          <Route path="/filiais/update/:id" element={<FiliaisUpdate />} />

          {/*Saida */}
          <Route path="/saida" element={<SaidaIndex />} />
          <Route path="/saida/create" element={<SaidaCreate />} />
          <Route path="/saida/update/:id" element={<SaidaUpdate />} />
          <Route path="/saida/report/:id" element={<SaidaReport />} />

          {/*Entrada */}
          <Route path="/entrada" element={<EntradaIndex />} />
          <Route path="/entrada/create" element={<EntradaCreate />} />
          {/* <Route path="/saida/update/:id" element={<SaidaUpdate} /> */}
          {/* <Route path="/saida/report/:id" element={<SaidaReport} /> */}

          {/* Estoque */}
          <Route path="/estoque" element={<EstoqueIndex />} />

          {/*Transportador*/}
          <Route path="/transportador" element={<TransportadorIndex />} />
          <Route path="/transportador/create" element={<TransportadorCreate />} />
          <Route path="/transportador/update/:id" element={<TransportadorUpdate />} />

          {/*Conferente*/}
          <Route path="/conferente" element={<ConferenteIndex />} />
          <Route path="/conferente/create" element={<ConferenteCreate />} />

          {/* 404 error */}
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
}
