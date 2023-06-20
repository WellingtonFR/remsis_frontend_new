import React from "react";
// eslint-disable-next-line
import styles from "./styles.css";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

export default function Header() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const history = useHistory();

  async function handleLogout(e) {
    e.preventDefault();
    api.post("/auth/logout");
    localStorage.removeItem("token");
    localStorage.setItem("isLoggedIn", "false");
    window.location.replace("/login");
  }

  return (
    <div className="nav-color">
      {isLoggedIn === "true" && (
        <nav className="navbar navbar-expand-lg navbar-dark d-print-none navbar-custom">
          <a className="navbar-brand" href="/">
            RemSis
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {isLoggedIn === "true" && (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/entrada/create" className="nav-link">
                    ENTRADA <span className="sr-only">(current)</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/saida/create" className="nav-link">
                    SAÍDA <span className="sr-only"></span>
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <a href="!#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    VISUALIZAÇÃO
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link to="/estoque" className="dropdown-item">
                      Estoque
                    </Link>
                    <Link to="/entrada" className="dropdown-item">
                      Entrada
                    </Link>
                    <Link to="/saida" className="dropdown-item">
                      Saída
                    </Link>
                    <Link to="/filiais" className="dropdown-item">
                      Filiais
                    </Link>
                    <Link to="/transportador" className="dropdown-item">
                      Transportador
                    </Link>
                    <Link to="/conferente" className="dropdown-item">
                      Conferente
                    </Link>
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <a href="!#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    CADASTRO
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link to="/transportador/create" className="dropdown-item">
                      Transportador
                    </Link>
                    <Link to="/filiais/create" className="dropdown-item">
                      Filiais
                    </Link>
                    <Link to="/conferente/create" className="dropdown-item">
                      Conferente
                    </Link>
                  </div>
                </li>
              </ul>
            )}
            <button className="btn btn-primary btn-login" onClick={handleLogout}>
              SAIR
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
