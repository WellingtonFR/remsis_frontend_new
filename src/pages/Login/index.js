import React, { useState } from "react";
import Swal from "sweetalert2";
import "./styles.scss";
import api from "../../services/api";
import UseLoader from "../../hooks/UseLoader";
import { FiKey, FiUser } from "react-icons/fi";
import logoMagalu from "../../img/logoMagalu.png";

export default function Login() {
  const [loader, showLoader, hideLoader] = UseLoader();
  const [nomeUsuario, setNomeusuario] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const data = { nomeUsuario, senha };
    try {
      showLoader();
      await api.post("/auth/login", data).then((response) => {
        hideLoader();
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLoggedIn", true);
        window.location.replace("/");
      });
    } catch (err) {
      hideLoader();
      const { data } = err.response;
      Swal.fire({
        title: "Atenção",
        text: data.message,
        icon: "info",
        showConfirmButton: false,
      });
    }
  }

  return (
    <div className="login">
      <div className="login__background">
        <div className="login__form">
          <img src={logoMagalu} className="login__logo" alt="logoMagalu" />

          <form onSubmit={handleLogin}>
            <div className="form__row mt-2 flex-center">
              <FiUser className="login__icons" />
              <input type="text" className="login__input" placeholder="USUÁRIO" required onChange={(e) => setNomeusuario(e.target.value)} />
            </div>

            <div className="form__row mt-1 flex-center">
              <FiKey className="login__icons" />
              <input type="password" className="login__input" placeholder="SENHA" required onChange={(e) => setSenha(e.target.value)} />
            </div>

            <div className="form__row mt-3 flex-center">
              <button className="btn btn__primary btn--large">Entrar</button>
            </div>
          </form>
        </div>
        {loader}
      </div>
    </div>
  );
}
