import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import api from "../../services/api";
import { FiMoreHorizontal } from "react-icons/fi";
import UseLoader from "../../hooks/UseLoader";

export default function TransportadorIndex() {
  const [loader, showLoader, hideLoader] = UseLoader();
  const [feedData, setFeedData] = useState([]);
  const [nomeTransportador, setNomeTransportador] = useState("");
  const [filialAtendida, setFilialAtendida] = useState("");

  useEffect(() => {
    (async () => {
      await api.get("transportador").then((response) => {
        setFeedData(response.data);
      });
    })();
  }, []);

  async function excluirTransportador(id) {
    try {
      const { value: userConfirmAction } = await Swal.fire({
        title: "Deseja excluir o transportador ?",
        icon: "question",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Excluir",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#af0600",
      });
      if (userConfirmAction) {
        showLoader();
        await api.delete(`/transportador/delete/${id}`).then(() => {});

        await api.get("transportador").then((response) => {
          setFeedData(response.data);
        });

        hideLoader();

        Swal.fire({
          title: "Transportador excluído com sucesso",
          icon: "success",
          showConfirmButton: false,
          timer: 1100,
        });
      }
    } catch (err) {
      hideLoader();
      const { data } = err.response;
      Swal.fire({
        title: "Erro ao excluir transportador",
        text: data.message,
        icon: "error",
        showConfirmButton: false,
        timer: 1100,
      });
    }
  }

  async function handleSearch(e) {
    e.preventDefault();

    const data = {
      nomeTransportador: nomeTransportador,
      filialAtendida: filialAtendida,
    };

    if (nomeTransportador === "" && filialAtendida === "") {
      Swal.fire({
        title: "Atenção",
        text: "É necessário algum campo da pesquisa",
        icon: "info",
        confirmButtonText: "Voltar",
      });
      return;
    }

    try {
      showLoader();
      await api.post("/transportador/search", data).then((response) => {
        setFeedData(response.data);
      });
      hideLoader();
    } catch (err) {
      hideLoader();
      const { data } = err.response;
      Swal.fire({
        title: "Atenção",
        text: data.message,
        icon: "info",
        confirmButtonText: "Voltar",
      });
    }
  }

  return (
    <div className="container">
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <label htmlFor="nomeTransportador" className="ml-1 mr-2">
            Nome
          </label>
          <input type="text" name="nomeTransportador" className="input--width-1 mr-3" onChange={(e) => setNomeTransportador(e.target.value)}></input>

          <label htmlFor="filialAtendida" className="ml-1 mr-2">
            Filial Atendida
          </label>
          <input type="text" name="filialAtendida" className="input--width-1 mr-3" onChange={(e) => setFilialAtendida(e.target.value)}></input>

          <button type="submit" className="btn btn--primary" onClick={() => handleSearch}>
            Pesquisar
          </button>
        </form>
      </div>
      <table className="table table--white">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Placa</th>
            <th className="text-center">Filial atendida</th>
            <th className="text-center">Opções</th>
          </tr>
        </thead>
        <tbody>
          {feedData.length === 0 ? (
            <tr>
              <td>Não há informações para exibir</td>
            </tr>
          ) : (
            feedData.map((transportador) => (
              <tr key={transportador.id}>
                <td>{transportador.nomeTransportador}</td>
                <td>{transportador.placaVeiculo}</td>
                <td className="text-center">{transportador.filialAtendida}</td>
                <td className="form-buttons">
                  <FiMoreHorizontal className="btn--icon_table" onClick={() => excluirTransportador(transportador.id)} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {loader}
    </div>
  );
}
