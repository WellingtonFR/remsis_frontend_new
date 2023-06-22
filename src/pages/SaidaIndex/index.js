import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import api from "../../services/api";
import Swal from "sweetalert2";
import { FiTrash2, FiEdit, FiArrowUp, FiPrinter } from "react-icons/fi";
import UseLoader from "../../hooks/UseLoader";

export default function SaidaIndex() {
  const [loader, showLoader, hideLoader] = UseLoader();
  const [saidas, setSaidas] = useState([]);
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [numeroControle, setNumeroControle] = useState("");
  const [filialDestino, setFilialDestino] = useState("");

  useEffect(() => {
    showLoader();
    (async () => {
      const data = {
        initialDate: new Date().toLocaleDateString("pt-br"),
        finalDate: new Date().toLocaleDateString("pt-br"),
        numeroControle: numeroControle,
        filialDestino: filialDestino,
      };
      try {
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
    })();
  }, [showLoader, hideLoader, numeroControle, filialDestino]);

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

  async function excluirsaida(id) {
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
        await api.delete(`/saida/delete/${id}`).then((data) => {
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

  document.addEventListener("DOMContentLoaded", function (e) {
    let btnSubir = document.querySelector("#subirTopo");
    btnSubir.style.display = "none";

    document.addEventListener("scroll", function (e) {
      if (window.scrollY > 100) {
        btnSubir.style.display = "block";
      } else {
        btnSubir.style.display = "none";
      }
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
    <div className="lista-saidas">
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
              <label htmlFor="numeroControle" className="ml-1 mr-2">
                Nº controle
              </label>
              <input type="text" name="numeroControle" maxLength="10" className="form-control" onChange={(e) => setNumeroControle(e.target.value)}></input>
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
            <th>Nº Controle</th>
            <th>Filial destino</th>
            <th>Transportador</th>
            <th>Doca</th>
            <th colSpan="2" style={{ textAlign: "center" }}>
              Opções
            </th>
          </tr>
        </thead>
        <tbody>
          {saidas.length === 0 ? (
            <tr>
              <td>Não há informações para exibir</td>
            </tr>
          ) : (
            saidas.map((saida) => (
              <tr key={saida.id}>
                <td>{saida.data}</td>
                <td>{saida.numeroControle}</td>
                <td>{saida.filialDestino}</td>
                <td>{saida.transportador}</td>
                <td>{saida.doca}</td>
                <td className="form-buttons">
                  <Link to={`/saida/report/${saida.id}`}>
                    <FiPrinter className="btn-icon-custom btn-icon-imprimir mr-2 mt-2" />
                  </Link>
                  <Link to={`/saida/update/${saida.id}`}>
                    <FiEdit className="btn-icon-custom btn-icon-alterar mr-2 mt-2" />
                  </Link>
                  <FiTrash2 className="btn-icon-custom btn-icon-excluir mt-2" onClick={() => excluirsaida(saida.id)} />
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
