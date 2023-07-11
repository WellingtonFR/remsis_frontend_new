import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../services/api";
import { FiMoreHorizontal } from "react-icons/fi";
import UseLoader from "../../hooks/UseLoader";

export default function FiliaisIndex() {
  const [loader, showLoader, hideLoader] = UseLoader();
  const [conferente, setConferente] = useState([]);

  useEffect(() => {
    (async () => {
      await api.get("conferente").then((response) => {
        setConferente(response.data);
      });
    })();
  }, []);

  async function excluirConferente(id) {
    try {
      const { value: userConfirmAction } = await Swal.fire({
        title: "Deseja excluir o conferente ?",
        icon: "question",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Excluir",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#af0600",
      });

      if (userConfirmAction) {
        showLoader();

        await api.delete(`/conferente/delete/${id}`).then(() => {});

        await api.get("conferente").then((response) => {
          hideLoader();
          setConferente(response.data);
        });

        hideLoader();

        Swal.fire({
          title: "Conferente excluído com sucesso",
          icon: "success",
          showConfirmButton: false,
          timer: 1100,
        });
      }
    } catch (err) {
      hideLoader();
      const { data } = err.response;
      Swal.fire({
        title: "Erro ao excluir conferente",
        text: data.message,
        icon: "error",
        showConfirmButton: false,
        timer: 1100,
      });
    }
  }

  return (
    <div className="container">
      <table className="table table--white mt-3">
        <thead>
          <tr>
            <th>Nome</th>
            <th>ID</th>
            <th className="text-center">Opções</th>
          </tr>
        </thead>
        <tbody>
          {conferente.length === 0 ? (
            <tr>
              <td>Não há informações para exibir</td>
            </tr>
          ) : (
            conferente.map((conferente) => (
              <tr key={conferente.id}>
                <td>{conferente.nomeConferente}</td>
                <td>{conferente.idConferente}</td>
                <td className="form-buttons">
                  <FiMoreHorizontal className="btn--icon_table" onClick={() => excluirConferente(conferente.id)} />
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
