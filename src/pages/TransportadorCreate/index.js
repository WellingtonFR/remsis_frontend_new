import React, { useState } from "react";
import Swal from "sweetalert2";
import api from "../../services/api";
import UseLoader from "../../hooks/UseLoader";

export default function TransportadorCreate() {
  const [loader, showLoader, hideLoader] = UseLoader();
  const [nomeTransportador, setNomeTransportador] = useState("");
  const [placaVeiculo, setPlacaVeiculo] = useState("");
  const [filialAtendida, setFilialAtendida] = useState("");

  async function handleNewTransportador(e) {
    e.preventDefault();

    const data = {
      nomeTransportador,
      placaVeiculo,
      filialAtendida,
    };

    try {
      showLoader();
      await api.post("/transportador/create", data).then(() => {
        hideLoader();
        Swal.fire({
          title: "Cadastrado com sucesso",
          icon: "success",
        });
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
        <h4 className="form-header">Cadastro de transportador</h4>
        <form onSubmit={handleNewTransportador}>
          <hr />
          <div className="form-group">
            <label htmlFor="nomeTransportador">Nome</label>
            <input
              type="text"
              name="nomeTransportador"
              className="form-control"
              maxLength="50"
              required
              onChange={(e) => setNomeTransportador(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="placaVeiculo">Placa do veículo</label>
            <input
              type="text"
              name="placaVeiculo"
              className="form-control"
              maxLength="8"
              required
              onChange={(e) => setPlacaVeiculo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="filialAtendida">Filial atendida</label>
            <input
              type="text"
              name="filialAtendida"
              className="form-control"
              maxLength="30"
              onChange={(e) => setFilialAtendida(e.target.value)}
            />
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
