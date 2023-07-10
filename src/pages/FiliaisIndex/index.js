import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../services/api";
import { FiMoreHorizontal } from "react-icons/fi";
import UseLoader from "../../hooks/UseLoader";

export default function FiliaisIndex() {
  const [loader, showLoader, hideLoader] = UseLoader();
  const [filiais, setFiliais] = useState([]);
  const [numeroFilial, setNumeroFilial] = useState("");
  const [cidade, setCidade] = useState("");

  useEffect(() => {
    (async () => {
      await api.get("filiais").then((response) => {
        setFiliais(response.data);
      });
    })();
  }, []);

  async function excluirFilial(id) {
    try {
      const { value: userConfirmAction } = await Swal.fire({
        title: "Deseja excluir essa filial ?",
        icon: "question",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Excluir",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#af0600",
      });
      if (userConfirmAction) {
        showLoader();
        await api.delete(`/filiais/delete/${id}`).then(() => {});

        await api.get("filiais").then((response) => {
          setFiliais(response.data);
        });

        hideLoader();

        Swal.fire({
          title: "Filial excluída com sucesso",
          icon: "success",
          showConfirmButton: false,
          timer: 1100,
        });
      }
    } catch (err) {
      hideLoader();
      const { data } = err.response;
      Swal.fire({
        title: "Erro ao excluir filial",
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
      numeroFilial: numeroFilial,
      cidade: cidade,
    };

    if (numeroFilial === "" && cidade === "") {
      Swal.fire({
        title: "Atenção",
        text: "É necessário preencher algum campo da pesquisa",
        icon: "info",
        confirmButtonText: "Voltar",
      });
      return;
    }

    try {
      showLoader();

      await api.post("/filiais/search", data).then((response) => {
        setFiliais(response.data);
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
        <form onSubmit={handleSearch} className="form">
          <label htmlFor="numeroFilial">Filial</label>
          <input type="text" name="numeroFilial" maxLength="10" className="input--width-2 mr-3" onChange={(e) => setNumeroFilial(e.target.value)}></input>
          <label htmlFor="cidade" className="ml-1 mr-2">
            Cidade
          </label>
          <input type="text" name="cidade" className="input--width-2 mr-3" onChange={(e) => setCidade(e.target.value)}></input>
          <button type="submit" className="btn btn--primary" onClick={() => handleSearch}>
            Pesquisar
          </button>
        </form>
      </div>

      <table className="table table--white table--freeze-header">
        <thead>
          <tr>
            <th>Filial</th>
            <th>Endereço</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Nome fantasia</th>
            <th className="text-center">Opções</th>
          </tr>
        </thead>
        <tbody>
          {filiais.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                Não há informações para exibir
              </td>
            </tr>
          ) : (
            filiais.map((filial) => (
              <tr key={filial.id}>
                <td>{filial.numeroFilial}</td>
                <td>
                  {filial.endereco}, {filial.numeroEndereco} {filial.complemento}
                </td>
                <td>{filial.cidade}</td>
                <td>{filial.estado}</td>
                <td>{filial.nomeFantasia}</td>
                <td>
                  <FiMoreHorizontal className="btn--icon_table" onClick={() => excluirFilial(filial.id)} />
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
