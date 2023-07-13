import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate, Link } from "react-router-dom";
// eslint-disable-next-line
import styles from "./styles.css";
import api from "../../services/api";

export default function TransportadoUpdate() {
  const [transportador, setTransportador] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await api.get(`/transportador/findById/${id}`).then((response) => {
        setTransportador(response.data[0]);
      });
    })();
  }, [id]);
  const handleInputChange = (e) => {
    e.persist();
    setTransportador({
      ...transportador,
      [e.target.name]: e.target.value,
    });
  };

  async function handleUpdateTransportador(e) {
    e.preventDefault();

    const data = {
      nomeTransportador: transportador.nomeTransportador,
      placaVeiculo: transportador.placaVeiculo,
      filialAtendida: transportador.filialAtendida,
    };

    try {
      await api.put(`/transportador/update/${id}`, data).then(() => {
        Swal.fire({
          title: "Alterado com sucesso !",
          icon: "success",
          timer: 1100,
          showConfirmButton: false,
        });
      });
      navigate.push("/transportador");
    } catch (err) {
      const { data } = err.response;
      Swal.fire({
        title: "Erro ao alterar",
        text: data.message,
        icon: "error",
        confirmButtonText: "Voltar",
        confirmButtonColor: "#008aca",
      });
    }
  }

  return (
    <div className="form-create">
      <div className="form-custom">
        <p>Alteração de dados do transportador</p>
        <small>Modifique as informação e clique em alterar</small>
        <form onSubmit={handleUpdateTransportador} id="formCreateTransportador">
          <hr />
          <div className="form-group">
            <label htmlFor="nomeTransportador">Nome</label>
            <input type="text" name="nomeTransportador" className="form-control disabled" maxLength="6" value={transportador.nomeTransportador} disabled required onChange={handleInputChange}></input>
          </div>

          <div className="form-group">
            <label htmlFor="placaVeiculo">Placa do veículo</label>
            <input type="text" name="placaVeiculo" className="form-control" maxLength="8" required value={transportador.placaVeiculo} onChange={handleInputChange}></input>
          </div>

          <div className="form-group">
            <label htmlFor="filialAtendida">Filial atendida</label>
            <input type="text" name="filialAtendida" className="form-control" maxLength="30" value={transportador.filialAtendida} onChange={handleInputChange}></input>
          </div>

          <div className="row buttons-form-group">
            <button type="submit" className="btn btn-primary btn-submit">
              Alterar
            </button>
            <Link to="/transportador" className="btn btn-dark btn-cancel">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
