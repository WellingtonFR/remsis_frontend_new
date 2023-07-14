import React from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { Outlet } from "react-router";

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
  const isAuthenticated = () => token !== null && token !== "";

  const ProtectedRoute = ({ authenticated, children }) => {
    if (!authenticated) {
      return <Navigate to="login" replace />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          element={
            <>
              <Navbar />
              <Outlet />
            </>
          }
        >
          <Route
            path="/"
            element={
              <ProtectedRoute authenticated={isAuthenticated()}>
                <Home />
              </ProtectedRoute>
            }
          />

          {/*Filial*/}
          <Route
            path="filiais"
            element={
              <ProtectedRoute authenticated={isAuthenticated()}>
                <FiliaisIndex />
              </ProtectedRoute>
            }
          />
          <Route
            path="filiais/create"
            element={
              <ProtectedRoute authenticated={isAuthenticated()}>
                <FiliaisCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="filiais/update/:id"
            element={
              <ProtectedRoute authenticated={isAuthenticated()}>
                <FiliaisUpdate />
              </ProtectedRoute>
            }
          />

          {/*Saida */}
          <Route
            path="saida"
            element={
              <ProtectedRoute authenticated={isAuthenticated()}>
                <SaidaIndex />
              </ProtectedRoute>
            }
          />
          <Route
            path="saida/create"
            element={
              <ProtectedRoute authenticated={isAuthenticated()}>
                <SaidaCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="saida/update/:id"
            element={
              <ProtectedRoute authenticated={isAuthenticated()}>
                <SaidaUpdate />
              </ProtectedRoute>
            }
          />
          <Route
            path="saida/report/:id"
            element={
              <ProtectedRoute authenticated={isAuthenticated()}>
                <SaidaReport />
              </ProtectedRoute>
            }
          />

          {/*Entrada */}
          <Route
            path="entrada"
            element={
              <ProtectedRoute authenticated={isAuthenticated()}>
                <EntradaIndex />
              </ProtectedRoute>
            }
          />
          <Route
            path="entrada/create"
            element={
              <ProtectedRoute authenticated={isAuthenticated()}>
                <EntradaCreate />
              </ProtectedRoute>
            }
          />

          {/* Estoque */}
          <Route
            path="estoque"
            element={
              <ProtectedRoute authenticated={isAuthenticated()}>
                <EstoqueIndex />
              </ProtectedRoute>
            }
          />

          {/*Transportador*/}
          <Route
            path="transportador"
            element={
              <ProtectedRoute authenticated={isAuthenticated()}>
                <TransportadorIndex />
              </ProtectedRoute>
            }
          />
          <Route
            path="transportador/create"
            element={
              <ProtectedRoute authenticated={isAuthenticated()}>
                <TransportadorCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="transportador/update/:id"
            element={
              <ProtectedRoute authenticated={isAuthenticated()}>
                <TransportadorUpdate />
              </ProtectedRoute>
            }
          />

          {/*Conferente*/}
          <Route
            path="conferente"
            element={
              <ProtectedRoute authenticated={isAuthenticated()}>
                <ConferenteIndex />
              </ProtectedRoute>
            }
          />
          <Route
            path="conferente/create"
            element={
              <ProtectedRoute authenticated={isAuthenticated()}>
                <ConferenteCreate />
              </ProtectedRoute>
            }
          />

          {/* 404 error */}
          <Route
            path="*"
            element={
              <ProtectedRoute authenticated={isAuthenticated()}>
                <NotFoundPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
