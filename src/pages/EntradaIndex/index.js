import React, { useState, useEffect } from "react";
import $ from "jquery";
// eslint-disable-next-line
import styles from "./styles.css";
import api from "../../services/api";
import Swal from "sweetalert2";
import { FiTrash2, FiArrowUp } from "react-icons/fi";
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
      const data = {
        initialDate: new Date().toLocaleDateString("pt-br"),
        finalDate: new Date().toLocaleDateString("pt-br"),
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
  }, [filialOrigem, filialDestino]);

  async function handleSearch(e) {
    e.preventDefault();

    console.log(filialOrigem);
    console.log(filialDestino);

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
        title: "Deseja excluir essa transferência ?",
        icon: "question",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Excluir",
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
    <div className="lista-entrada">
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
              <td>Não há informações para exibir</td>
            </tr>
          ) : (
            entrada.map((entrada) => (
              <tr key={entrada.id}>
                <td>{entrada.data}</td>
                <td>{entrada.filialOrigem}</td>
                <td>{entrada.filialDestino}</td>
                <td>{entrada.notaFiscal}</td>
                <td>{entrada.codigo}</td>
                <td>{entrada.quantidadeProduto}</td>
                <td>{entrada.observacao}</td>
                <td className="form-buttons">
                  <FiTrash2 className="btn-icon-custom btn-icon-excluir mt-2" onClick={() => excluirEntrada(entrada.id)} />
                </td>
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
