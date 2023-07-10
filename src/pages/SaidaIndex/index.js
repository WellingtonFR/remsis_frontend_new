import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";
import Swal from "sweetalert2";
import { FiMoreHorizontal } from "react-icons/fi";
import UseLoader from "../../hooks/UseLoader";

export default function SaidaIndex() {
  const [loader, showLoader, hideLoader] = UseLoader();
  const [saidas, setSaidas] = useState([]);
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [numeroControle, setNumeroControle] = useState("");
  const [filialDestino, setFilialDestino] = useState("");
  const [idToRemove, setIdToRemove] = useState("");

  useEffect(() => {
    (async () => {
      let hoje = new Date().toJSON().slice(0, 10);

      const data = {
        initialDate: hoje,
        finalDate: hoje,
        numeroControle: numeroControle,
        filialDestino: filialDestino,
      };
      try {
        await api.post("/saida/search", data).then((response) => {
          setSaidas(response.data);
        });
      } catch (err) {
        const { data } = err.response;
        Swal.fire({
          title: "Atenção",
          text: data.message,
          icon: "info",
          confirmButtonText: "Voltar",
        });
      }
    })();
  }, []);

  async function handleSearch(e) {
    e.preventDefault();

    const data = {
      initialDate: initialDate,
      finalDate: finalDate,
      numeroControle: numeroControle,
      filialDestino: filialDestino,
    };

    if (initialDate === "" && numeroControle === "") {
      Swal.fire({
        title: "Atenção",
        text: "É necessário preencher a data inicial e final",
        icon: "info",
        confirmButtonText: "Voltar",
      });
      return;
    }

    if (numeroControle !== "" && initialDate === "" && numeroControle === "") {
      Swal.fire({
        title: "Atenção",
        text: "É necessário preencher a data inicial e final",
        icon: "info",
        confirmButtonText: "Voltar",
      });
      return;
    }

    try {
      showLoader();
      await api.post("/saida/search", data).then((response) => {
        setSaidas(response.data);
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

  const showModal = (id) => {
    const modal = document.querySelector("#modal__saida");
    const overlay = document.querySelector(".overlay");

    modal.style.visibility = "visible";
    overlay.style.visibility = "visible";

    setIdToRemove(id);
  };

  const hideModal = () => {
    const modal = document.querySelector("#modal__saida");
    const overlay = document.querySelector(".overlay");

    modal.style.visibility = "hidden";
    overlay.style.visibility = "hidden";
  };

  async function excluirItemSaida(id) {
    hideModal();

    try {
      const { value: userConfirmAction } = await Swal.fire({
        title: "Deseja excluir essa transferência ?",
        icon: "question",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Excluir",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#af0600",
      });
      if (userConfirmAction) {
        await api.delete(`/saida/delete/${id}`).then(() => {
          Swal.fire({
            title: "Transferência excluída com sucesso",
            icon: "success",
            showConfirmButton: false,
            timer: 1100,
          });
        });

        const data = {
          initialDate: new Date().toLocaleDateString("pt-br"),
          finalDate: new Date().toLocaleDateString("pt-br"),
          numeroControle: numeroControle,
          filialDestino: filialDestino,
        };

        await api.post("/saida/search", data).then((response) => {
          setSaidas(response.data);
        });
      }
    } catch (err) {
      const { data } = err.response;
      Swal.fire({
        title: "Erro ao excluir transferência",
        text: data.message,
        icon: "error",
        showConfirmButton: false,
        timer: 1100,
      });
    }
  }

  return (
    <div className="container">
      <div className="search-bar">
        <form onSubmit={handleSearch} className="form">
          <label htmlFor="initialDate">Data inicial</label>
          <input type="date" name="initialDate" className="input--width-2 mr-3" placeholder="dd/mm/aaaa" maxLength="10" onChange={(e) => setInitialDate(e.target.value)} />
          <label htmlFor="finalDate" className="ml-1 mr-2">
            Data final
          </label>
          <input type="date" name="finalDate" className="input--width-2 mr-3" placeholder="dd/mm/aaaa" onChange={(e) => setFinalDate(e.target.value)} />
          <label htmlFor="numeroControle">Nº controle</label>
          <input type="text" name="numeroControle" maxLength="10" className="input--width-2 mr-3" onChange={(e) => setNumeroControle(e.target.value)}></input>
          <label htmlFor="filialDestino" className="ml-1 mr-2">
            Filial destino
          </label>
          <input type="text" name="filialDestino" className="input--width-2 mr-3" onChange={(e) => setFilialDestino(e.target.value)}></input>
          <button type="submit" className="btn btn--primary" id="btn-submit-search" onClick={() => handleSearch}>
            Pesquisar
          </button>
        </form>
      </div>
      <table className="table table--white table--freeze-header">
        <thead>
          <tr>
            <th>Data</th>
            <th>Nº Controle</th>
            <th>Filial destino</th>
            <th>Transportador</th>
            <th>Doca</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {saidas.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                Não há informações para exibir hoje, para dias anteriores utilize a pesquisa
              </td>
            </tr>
          ) : (
            saidas.map((saida) => (
              <tr key={saida.id}>
                <td>{new Date(saida.created_at).toLocaleDateString()}</td>
                <td>{saida.numeroControle}</td>
                <td>{saida.filialDestino}</td>
                <td>{saida.transportador}</td>
                <td>{saida.doca}</td>
                <td>
                  <FiMoreHorizontal className="btn--icon_table" onClick={() => showModal(saida.id)} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {loader}

      <div className="overlay">
        <div id="modal__saida" className="modal" style={{ backgroundColor: "transparent", width: "fit-content", height: "fit-content" }}>
          <div className="modal__body">
            <Link to={`/saida/update/${idToRemove}`}>
              <button className="btn btn--primary btn--medium mr-3">Alterar</button>
            </Link>
            <Link to={`/saida/report/${idToRemove}`}>
              <button className="btn btn--primary btn--medium mr-3">Relatório</button>
            </Link>
            <input type="button" value="Excluir" className="btn btn--danger btn--medium mr-3" onClick={() => excluirItemSaida(idToRemove)} />
            <input type="button" className="btn btn--dark btn--medium" value="Fechar" onClick={hideModal} />
          </div>
        </div>
      </div>
    </div>
  );
}
