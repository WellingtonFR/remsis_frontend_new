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
    <div className="container">
      <div className="form__single-collumn">
        <form onSubmit={handleNewTransportador}>
          <div className="form__title">
            <h4>Cadastro de transportador</h4>
            <hr />
          </div>

          <label htmlFor="nomeTransportador">Nome completo</label>
          <input type="text" name="nomeTransportador" maxLength="80" required onChange={(e) => setNomeTransportador(e.target.value)} />

          <label htmlFor="placaVeiculo">Placa do veículo</label>
          <input type="text" name="placaVeiculo" className="form-control" maxLength="8" required onChange={(e) => setPlacaVeiculo(e.target.value)} />

          <label htmlFor="filialAtendida">Filial atendida</label>
          <input type="number" name="filialAtendida" className="form-control" maxLength="10" required onChange={(e) => setFilialAtendida(e.target.value)} />

          <button type="submit" className="btn btn--primary btn--medium mt-2">
            Cadastrar
          </button>
        </form>
        {loader}
      </div>
    </div>
  );
}
