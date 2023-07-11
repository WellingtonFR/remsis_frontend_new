import React, { useState } from "react";
import Swal from "sweetalert2";
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
    <div className="container">
      <div className="form__single-collumn">
        <div className="form__title">
          <h4 className="form-header">Cadastro de conferentes</h4>
          <hr />
        </div>
        <form onSubmit={handleNewConferente} id="formCreateConferente">
          <label htmlFor="nomeConferente">Nome completo</label>
          <input type="text" name="nomeConferente" maxLength="50" pattern="^[A-Za-zÀ-ÿ]+(\s[A-Za-zÀ-ÿ]+){1,10}$" required onChange={(e) => setNomeConferente(e.target.value)}></input>

          <label htmlFor="idConferente">ID</label>
          <input type="number" name="idConferente" required max="99999999" onChange={(e) => setIdConferente(e.target.value)}></input>
          <button type="submit" className="btn btn--primary btn--medium mt-2">
            Cadastrar
          </button>
        </form>
      </div>
      {loader}
    </div>
  );
}
