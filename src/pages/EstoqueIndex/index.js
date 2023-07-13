import React, { useState, useEffect } from "react";

import api from "../../services/api";
import Swal from "sweetalert2";
import UseLoader from "../../hooks/UseLoader";

export default function EstoqueIndex() {
  const [loader, showLoader, hideLoader] = UseLoader();
  const [estoque, setEstoque] = useState([]);
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [filialOrigem, setFilialOrigem] = useState("");
  const [filialDestino, setFilialDestino] = useState("");

  useEffect(() => {
    (async () => {
      try {
        await api.get("/estoque").then((response) => {
          setEstoque(response.data);
        });
      } catch (err) {
        const { data } = err.response;
        Swal.fire({
          title: "Atenção",
          text: data.message,
          icon: "info",
          confirmButtonText: "Voltar",
          confirmButtonColor: "#008aca",
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
        confirmButtonColor: "#008aca",
      });
      return;
    }

    try {
      showLoader();
      await api.post("/estoque/search", data).then((response) => {
        setEstoque(response.data);
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
        confirmButtonColor: "#008aca",
      });
    }
  }

  return (
    <div className="container">
      <div className="search-bar">
        <form onSubmit={handleSearch} className="form">
          <div className="row">
            <div className="col-2 mr-2">
              <label htmlFor="initialDate">Data inicial</label>
              <input type="date" name="initialDate" placeholder="dd/mm/aaaa" maxLength="10" onChange={(e) => setInitialDate(e.target.value)} />
            </div>

            <div className="col-2 mr-2">
              <label htmlFor="finalDate">Data final</label>
              <input type="date" name="finalDate" placeholder="dd/mm/aaaa" onChange={(e) => setFinalDate(e.target.value)} />
            </div>

            <div className="col-2 mr-2">
              <label htmlFor="filialOrigem">Filial origem</label>
              <input type="text" name="filialOrigem" onChange={(e) => setFilialOrigem(e.target.value)}></input>
            </div>

            <div className="col-2 mr-2">
              <label htmlFor="filialDestino">Filial destino</label>
              <input type="text" name="filialDestino" onChange={(e) => setFilialDestino(e.target.value)}></input>
            </div>

            <div className="col-1 mr-3 mt-2">
              <button type="submit" className="btn btn--primary btn--small " onClick={() => handleSearch}>
                Pesquisar
              </button>
            </div>
          </div>
        </form>
      </div>

      <table className="table table--white table--freeze-header">
        <thead>
          <tr>
            <th>Data Entrada</th>
            <th>Filial origem</th>
            <th>Filial destino</th>
            <th>Código</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {estoque.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                Não há informações para exibir
              </td>
            </tr>
          ) : (
            estoque.map((estoque) => (
              <tr key={estoque.id}>
                <td>{new Date(estoque.created_at).toLocaleDateString()}</td>
                <td>{estoque.filialOrigem}</td>
                <td>{estoque.filialDestino}</td>
                <td>{estoque.codigo}</td>
                <td>{estoque.quantidadeProduto}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {loader}
    </div>
  );
}
