import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import UseLoader from "../../hooks/UseLoader";

export default function FiliaisUpdate() {
  const [loader, showLoader, hideLoader] = UseLoader();
  const [filial, setFilial] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await api.get(`/filiais/findById/${id}`).then((response) => {
        setFilial(response.data[0]);
      });
    })();
  }, [id]);

  const handleInputChange = (e) => {
    e.persist();
    setFilial({ ...filial, [e.target.name]: e.target.value });
  };

  async function handleUpdateFilial(e) {
    e.preventDefault();

    const data = {
      numeroFilial: filial.numeroFilial,
      endereco: filial.endereco,
      numeroEndereco: filial.numeroEndereco,
      complemento: filial.complemento,
      cidade: filial.cidade,
      estado: filial.estado,
      nomeFantasia: filial.nomeFantasia,
    };

    try {
      showLoader();
      await api.put(`/filiais/update/${id}`, data).then(() => {
        hideLoader();
        Swal.fire({
          title: "Alterado com sucesso !",
          icon: "success",
          timer: 1100,
          showConfirmButton: false,
        });
      });
      navigate("/filiais");
    } catch (err) {
      hideLoader();
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
    <div className="container">
      <div className="form__single-collumn">
        <div className="form__title">
          <p>Alteração de dados da Filial</p>
          <small>Modifique as informações e clique em alterar</small>
          <hr />
        </div>

        <form onSubmit={handleUpdateFilial}>
          <label htmlFor="numeroFilial">Número da filial</label>
          <input type="number" name="numeroFilial" className=" disabled" maxLength="6" value={filial.numeroFilial || ""} disabled required></input>

          <label htmlFor="endereco">Endereço</label>
          <input type="text" name="endereco" className="" required maxLength="50" value={filial.endereco || ""} onChange={handleInputChange}></input>

          <div className="row">
            <div className="col-5 mr-3">
              <label htmlFor="numeroEndereco">Número</label>
              <input type="number" name="numeroEndereco" className="" value={filial.numeroEndereco || ""} required onChange={handleInputChange}></input>
            </div>

            <div className="col">
              <label htmlFor="complemento">Complemento</label>
              <input type="text" name="complemento" className="" value={filial.complemento || ""} onChange={handleInputChange}></input>
            </div>
          </div>

          <label htmlFor="cidade">Cidade</label>
          <input type="text" name="cidade" className="" value={filial.cidade || ""} required onChange={handleInputChange}></input>

          <label htmlFor="estado">Estado</label>
          <select name="estado" className="" required value={filial.estado || ""} onChange={handleInputChange}>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>

          <label htmlFor="nomeFantasia">Nome Fantasia</label>
          <input type="text" name="nomeFantasia" className="" placeholder="Exemplo: LD182" maxLength="20" value={filial.nomeFantasia || ""} required onChange={handleInputChange}></input>

          <div className="flex-center mt-2">
            <button type="submit" className="btn btn--primary btn--medium mr-2">
              Alterar
            </button>
            <Link to="/filiais">
              <button className="btn btn--dark btn--medium">Cancelar</button>
            </Link>
          </div>
        </form>
        {loader}
      </div>
    </div>
  );
}
