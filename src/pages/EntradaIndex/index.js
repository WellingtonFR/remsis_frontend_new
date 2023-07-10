import React, { useState, useEffect } from "react";

import api from "../../services/api";
import Swal from "sweetalert2";
import { FiMoreHorizontal } from "react-icons/fi";
import UseLoader from "../../hooks/UseLoader";

export default function EntradaIndex() {
  const [loader, showLoader, hideLoader] = UseLoader();
  const [entrada, setEntrada] = useState([]);
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [filialOrigem, setFilialOrigem] = useState("");
  const [filialDestino, setFilialDestino] = useState("");

  useEffect(() => {
    (async () => {
      let hoje = new Date().toJSON().slice(0, 10);

      const data = {
        initialDate: hoje,
        finalDate: hoje,
        filialOrigem: filialOrigem,
        filialDestino: filialDestino,
      };

      try {
        await api.post("/entrada/search", data).then((response) => {
          setEntrada(response.data);
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
      filialDestino: filialDestino,
      filialOrigem: filialOrigem,
    };

    if (initialDate === "" && finalDate === "") {
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
      await api.post("/entrada/search", data).then((response) => {
        setEntrada(response.data);
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

  async function excluirEntrada(id) {
    try {
      const { value: userConfirmAction } = await Swal.fire({
        title: "Deseja excluir ?",
        icon: "question",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#af0600",
      });

      if (userConfirmAction) {
        await api.delete(`/entrada/delete/${id}`).then(() => {
          Swal.fire({
            title: "Transferência excluída com sucesso",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
          });
        });

        const data = {
          initialDate: new Date().toLocaleDateString("pt-br"),
          finalDate: new Date().toLocaleDateString("pt-br"),
          filialOrigem: filialOrigem,
          filialDestino: filialDestino,
        };

        await api.post("/entrada/search", data).then((response) => {
          setEntrada(response.data);
        });

        hideLoader();
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
        <form onSubmit={handleSearch}>
          <label htmlFor="initialDate">Data inicial</label>
          <input type="date" name="initialDate" className="input--width-2 mr-3" placeholder="dd/mm/aaaa" maxLength="10" onChange={(e) => setInitialDate(e.target.value)} />

          <label htmlFor="finalDate" className="ml-1 mr-2">
            Data final
          </label>
          <input type="date" name="finalDate" className="input--width-2 mr-3" placeholder="dd/mm/aaaa" onChange={(e) => setFinalDate(e.target.value)} />

          <label htmlFor="filialOrigem" className="ml-1 mr-2">
            Filial origem
          </label>
          <input type="text" name="filialOrigem" className="input--width-1 mr-3" onChange={(e) => setFilialOrigem(e.target.value)}></input>

          <label htmlFor="filialDestino" className="ml-1 mr-2">
            Filial destino
          </label>
          <input type="text" name="filialDestino" className="input--width-1 mr-3" onChange={(e) => setFilialDestino(e.target.value)}></input>

          <button type="submit" className="btn btn--primary" onClick={() => handleSearch}>
            Pesquisar
          </button>
        </form>
      </div>
      <table className="table table--white table--freeze-header">
        <thead>
          <tr>
            <th>Data</th>
            <th>Filial origem</th>
            <th>Filial destino</th>
            <th>Nota fiscal</th>
            <th>Código</th>
            <th>Quantidade</th>
            <th>Observação</th>
            <th colSpan="2" style={{ textAlign: "center" }}>
              Opções
            </th>
          </tr>
        </thead>
        <tbody>
          {entrada.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                Não há informações para exibir hoje, para dias anteriores utilize a pesquisa
              </td>
            </tr>
          ) : (
            entrada.map((entrada) => (
              <tr key={entrada.id}>
                <td>{new Date(entrada.created_at).toLocaleDateString()}</td>
                <td>{entrada.filialOrigem}</td>
                <td>{entrada.filialDestino}</td>
                <td>{entrada.notaFiscal}</td>
                <td>{entrada.codigo}</td>
                <td>{entrada.quantidadeProduto}</td>
                <td>{entrada.observacao}</td>
                <td className="form-buttons">
                  <FiMoreHorizontal className="btn--icon_table" onClick={() => excluirEntrada(entrada.id)} />
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
