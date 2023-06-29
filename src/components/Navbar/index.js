import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import api from "../../services/api";

import { FiChevronDown } from "react-icons/fi";

export default function Navbar() {
  async function handleLogout(e) {
    e.preventDefault();
    api.post("/auth/logout");
    localStorage.removeItem("token");
    localStorage.setItem("isLoggedIn", "false");
    window.location.replace("/login");
  }

  return (
    <div className="navbar">
      <div className="navbar__brand">
        <Link to="/" className="navbar__item">
          RemSis
        </Link>
      </div>
      <div className="navbar__item">
        <Link to="/entrada/create" className="nav-link">
          ENTRADA
        </Link>
      </div>

      <div className="navbar__item">
        <Link to="/saida/create" className="nav-link">
          SAÍDA
        </Link>
      </div>

      <div className="navbar__dropdown">
        <button className="navbar__dropdown-item">
          VISUALIZAÇÃO
          <FiChevronDown />
        </button>
        <div className="navbar__dropdown-content">
          <Link to="/estoque">Estoque</Link>
          <Link to="/entrada">Entrada</Link>
          <Link to="/saida">Saída</Link>
          <Link to="/filiais">Filiais</Link>
          <Link to="/transportador">Transportador</Link>
          <Link to="/conferente">Conferente</Link>
        </div>
      </div>

      <div className="navbar__dropdown">
        <button className="navbar__dropdown-item">
          CADASTRO <FiChevronDown />
        </button>
        <div className="navbar__dropdown-content">
          <Link to="/transportador/create">Transportador</Link>
          <Link to="/filiais/create">Filiais</Link>
          <Link to="/conferente/create">Conferente</Link>
        </div>
      </div>
      <div className="navbar__btn-logout">
        <button className="btn btn__primary btn--medium" onClick={handleLogout}>
          SAIR
        </button>
      </div>
    </div>
  );
}
