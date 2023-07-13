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
  const [item_ID, setItem_ID] = useState("");

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
        confirmButtonColor: "#008aca",
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
        confirmButtonColor: "#008aca",
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
        confirmButtonColor: "#008aca",
      });
    }
  }

  const showModal = (id) => {
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");

    modal.style.visibility = "visible";
    overlay.style.visibility = "visible";

    setItem_ID(id);
  };

  const hideModal = () => {
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");

    modal.style.visibility = "hidden";
    overlay.style.visibility = "hidden";
  };

  return (
    <div className="container">
      <div className="search-bar">
        <form onSubmit={handleSearch} className="form">
          <div className="row">
            <div className="col-6 mr-2">
              <label htmlFor="numeroFilial">Filial</label>
              <input type="text" name="numeroFilial" maxLength="10" onChange={(e) => setNumeroFilial(e.target.value)}></input>
            </div>
            <div className="col-6 mr-2">
              <label htmlFor="cidade">Cidade</label>
              <input type="text" name="cidade" onChange={(e) => setCidade(e.target.value)}></input>
            </div>
            <div className="col-3 mt-2">
              <button type="submit" className="btn btn--primary btn--small" onClick={() => handleSearch}>
                Pesquisar
              </button>
            </div>
          </div>
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
                  <FiMoreHorizontal className="btn--icon_table" onClick={() => showModal(filial.id)} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="overlay">
        <div className="modal" style={{ backgroundColor: "transparent", width: "fit-content", height: "fit-content" }}>
          <div className="modal__body">
            <Link to={`/filiais/update/${item_ID}`}>
              <button className="btn btn--primary btn--medium mr-3">Alterar</button>
            </Link>
            <input type="button" value="Excluir" className="btn btn--danger btn--medium mr-3" onClick={() => excluirFilial(item_ID)} />
            <input type="button" className="btn btn--dark btn--medium" value="Fechar" onClick={hideModal} />
          </div>
        </div>
      </div>

      {loader}
    </div>
  );
}
