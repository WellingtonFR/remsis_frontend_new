import React, { useState, useEffect } from "react";

// eslint-disable-next-line
import styles from "./styles.css";
import api from "../../services/api";
import Swal from "sweetalert2";
import { FiArrowUp } from "react-icons/fi";
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
      const data = {
        initialDate: new Date().toLocaleDateString("pt-br"),
        finalDate: new Date().toLocaleDateString("pt-br"),
        filialOrigem: filialOrigem,
        filialDestino: filialDestino,
      };

      try {
        await api.get("/estoque", data).then((response) => {
          setEstoque(response.data);
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
  }, [filialOrigem, filialDestino]);
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
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function (e) {
    let btnSubir = document.querySelector("#subirTopo");
    btnSubir.style.display = "none";

    document.addEventListener("DOMContentLoaded", function (e) {
      let btnSubir = document.querySelector("#subirTopo");
      btnSubir.style.display = "none";

      document.addEventListener("scroll", function (e) {
        if (document.scrollTop() > 100) {
          btnSubir.fadeIn();
        } else {
          btnSubir.fadeOut();
        }
      });
    });
  });

  function handleDate(_date) {
    let origin_date = new Date(_date);
    origin_date.setDate(origin_date.getDate() + 1);
    let return_date = origin_date.toLocaleDateString("pt-br");
    return return_date;
  }

  function btnSubir(e) {
    e.preventDefault();
    $("html").animate(
      {
        scrollTop: 0,
      },
      800
    );
    return false;
  }

  return (
    <div className="lista-estoque">
      <div className="top-search">
        <form onSubmit={handleSearch}>
          <div className="form-inline">
            <div className="input-group">
              <label htmlFor="initialDate" className="col-form-label ml-1 mr-2">
                Data inicial
              </label>
              <input type="date" name="initialDate" className="form-control" placeholder="dd/mm/aaaa" maxLength="10" onChange={(e) => setInitialDate(handleDate(e.target.value))} />
            </div>
            <div className="input-group">
              <label htmlFor="finalDate" className="ml-1 mr-2">
                Data final
              </label>
              <input type="date" name="finalDate" className="form-control" placeholder="dd/mm/aaaa" onChange={(e) => setFinalDate(handleDate(e.target.value))} />
            </div>
            <div className="input-group">
              <label htmlFor="filialOrigem" className="ml-1 mr-2">
                Filial origem
              </label>
              <input type="text" name="filialOrigem" className="form-control" onChange={(e) => setFilialOrigem(e.target.value)}></input>
            </div>
            <div className="input-group">
              <label htmlFor="filialDestino" className="ml-1 mr-2">
                Filial destino
              </label>
              <input type="text" name="filialDestino" className="form-control" onChange={(e) => setFilialDestino(e.target.value)}></input>
            </div>
            <button type="submit" className="btn btn-primary ml-3" id="btn-submit-search" onClick={() => handleSearch}>
              Pesquisar
            </button>
          </div>
        </form>
      </div>
      <table className="table table-hover table-dark">
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
              <td>Não há informações para exibir</td>
            </tr>
          ) : (
            estoque.map((estoque) => (
              <tr key={estoque.id}>
                <td>{estoque.data}</td>
                <td>{estoque.filialOrigem}</td>
                <td>{estoque.filialDestino}</td>
                <td>{estoque.codigo}</td>
                <td>{estoque.quantidadeProduto}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div id="subirTopo" onClick={btnSubir}>
        <FiArrowUp />
      </div>
      {loader}
    </div>
  );
}
