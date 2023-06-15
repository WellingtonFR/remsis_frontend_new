import React, { useState } from "react";
import Swal from "sweetalert2";
// eslint-disable-next-line
import styles from "./styles.css";
import api from "../../services/api";
import UseLoader from "../../hooks/UseLoader";

export default function ConferenteCreate() {
  const [loader, showLoader, hideLoader] = UseLoader();
  const [nomeConferente, setNomeConferente] = useState("");
  const [idConferente, setIdConferente] = useState("");

  async function handleNewConferente(e) {
    e.preventDefault();

    const data = {
      nomeConferente,
      idConferente,
    };

    try {
      showLoader();
      await api.post("/conferente/create", data).then(() => {
        Swal.fire({
          title: "Cadastrado com sucesso !",
          icon: "success",
        });
        hideLoader();
      });
      document.querySelector("form").reset();
    } catch (err) {
      hideLoader();
      const { data } = err.response;
      Swal.fire({
        title: "Erro ao cadastrar",
        text: data.message,
        icon: "error",
        confirmButtonText: "Voltar",
      });
    }
  }

  return (
    <div className="form-create">
      <div className="form-custom">
        <h4 className="form-header">Cadastro de conferentes</h4>
        <form onSubmit={handleNewConferente} id="formCreateConferente">
          <hr />
          <div className="form-group">
            <label htmlFor="nomeConferente">Nome completo</label>
            <input
              type="text"
              name="nomeConferente"
              className="form-control"
              maxLength="50"
              pattern="^[A-Za-zÀ-ÿ]+(\s[A-Za-zÀ-ÿ]+){1,10}$"
              required
              onChange={(e) => setNomeConferente(e.target.value)}
            ></input>
          </div>

          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="idConferente">ID</label>
              <input
                type="number"
                name="idConferente"
                className="form-control"
                required
                max="99999999"
                onChange={(e) => setIdConferente(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="div-btn-form-submit">
            <button type="submit" className="btn btn-primary btn-form-submit">
              Cadastrar
            </button>
          </div>
        </form>
        {loader}
      </div>
    </div>
  );
}
