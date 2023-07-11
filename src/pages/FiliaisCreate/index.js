import React, { useState } from "react";
import Swal from "sweetalert2";
import api from "../../services/api";
import UseLoader from "../../hooks/UseLoader";

export default function FiliaisCreate() {
  const [loader, showLoader, hideLoader] = UseLoader();

  const [values, setValues] = useState({
    numeroFilial: "",
    endereco: "",
    numeroEndereco: "",
    complemento: "",
    cidade: "",
    estado: "",
    nomeFantasia: "",
  });

  const handleChange = (event) => {
    const value = event.target.value;
    setValues({
      ...values,
      [event.target.name]: value,
    });
  };

  async function handleNewFilial(e) {
    e.preventDefault();

    const data = {
      numeroFilial: values.numeroFilial,
      endereco: values.endereco,
      numeroEndereco: values.numeroEndereco,
      complemento: values.complemento,
      cidade: values.cidade,
      estado: values.estado,
      nomeFantasia: values.nomeFantasia,
    };

    try {
      showLoader();
      await api.post("/filiais/create", data).then(() => {
        hideLoader();
        Swal.fire({
          title: "Cadastrado com sucesso !",
          icon: "success",
        });
      });
      document.querySelector("form").reset();
    } catch (err) {
      hideLoader();
      const { data } = err.response;
      Swal.fire({
        title: "Erro ao cadastrar",
        text: data.message,
        icon: "error",
        confirmButtonText: "Voltar",
      });
    }
  }

  return (
    <div className="container">
      <div className="form__single-collumn">
        <div className="form__title">
          <h4>Cadastro de Filiais</h4>
          <hr />
        </div>

        <form onSubmit={handleNewFilial} id="formCreateFiliais">
          <label htmlFor="numeroFilial">Número da filial</label>
          <input type="number" name="numeroFilial" maxLength="10" required onChange={handleChange}></input>

          <label htmlFor="endereco">Endereço</label>
          <input type="text" name="endereco" maxLength="100" required onChange={handleChange}></input>

          <div className="row">
            <div className="col-width-6 mr-3">
              <label htmlFor="numeroEndereco">Número</label>
              <input type="number" name="numeroEndereco" required onChange={handleChange}></input>
            </div>

            <div className="col-width-10">
              <label htmlFor="complemento">Complemento</label>
              <input type="text" name="complemento" onChange={handleChange}></input>
            </div>
          </div>

          <div className="row">
            <div className="col-width-9 mr-3">
              <label htmlFor="cidade">Cidade</label>
              <input type="text" name="cidade" required onChange={handleChange}></input>
            </div>

            <div className="col-width-7 mr-3">
              <label htmlFor="estado">Estado</label>
              <select name="estado" required onChange={handleChange}>
                <option value="">Selecione</option>
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
            </div>
          </div>

          <label htmlFor="nomeFantasia">Nome Fantasia</label>
          <input type="text" name="nomeFantasia" placeholder="Exemplo: LD182" maxLength="20" required onChange={handleChange}></input>

          <button type="submit" className="btn btn--primary btn--medium mt-2">
            Cadastrar
          </button>
        </form>
        {loader}
      </div>
    </div>
  );
}
