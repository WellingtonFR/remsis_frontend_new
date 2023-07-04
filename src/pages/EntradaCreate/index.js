import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import api from "../../services/api";
import UseLoader from "../../hooks/UseLoader";

export default function EntradaCreate() {
  const [data, setdata] = useState("");
  const [loader, showLoader, hideLoader] = UseLoader();

  const [conferente, setConferente] = useState("");
  const [filialOrigem, setFilialOrigem] = useState("");
  const [doca, setDoca] = useState("");
  const [conferentes, setConferentes] = useState([]);
  const [filiais, setFiliais] = useState([]);

  const [formFields, setFormFields] = useState([
    {
      data: data,
      filialOrigem: filialOrigem,
      conferente: conferente,
      doca: doca,
      notaFiscal: "",
      codigo: "",
      descricaoProduto: "",
      quantidadeProduto: "",
      filialDestino: "",
      observacao: "",
    },
  ]);

  useEffect(() => {
    (async () => {
      setFormFields([]);

      await api.get("filiais").then((response) => {
        setFiliais(response.data);
      });
      await api.get("conferente").then((response) => {
        setConferentes(response.data);
      });

      let filialOrigem = document.querySelector("select[name='filialOrigem']");
      let conferente = document.querySelector("select[name='nomeConferente']");
      let doca = document.querySelector("input[name='doca']");

      filialOrigem.removeAttribute("disabled");
      conferente.removeAttribute("disabled");
      doca.removeAttribute("disabled");
      setDoca("");
      setdata(new Date().toLocaleDateString("pt-br"));

      filialOrigem.querySelector("option").selected = "selected";
      conferente.querySelector("option").selected = "selected";
    })();
  }, []);

  const resetForm = async () => {
    fetchDataToOptions();

    setFormFields([]);

    let filialOrigem = document.querySelector("select[name='filialOrigem']");
    let conferente = document.querySelector("select[name='nomeConferente']");
    let doca = document.querySelector("input[name='doca']");

    filialOrigem.removeAttribute("disabled");
    conferente.removeAttribute("disabled");
    doca.removeAttribute("disabled");
    setDoca("");
    setdata(new Date().toLocaleDateString("pt-br"));

    filialOrigem.querySelector("option").selected = "selected";
    conferente.querySelector("option").selected = "selected";
  };

  async function fetchDataToOptions() {
    showLoader();
    await api.get("filiais").then((response) => {
      setFiliais(response.data);
    });
    await api.get("conferente").then((response) => {
      setConferentes(response.data);
    });
    hideLoader();
  }

  const handleFormBodyChange = (event, index) => {
    let { name, value } = event.target;
    let data = [...formFields];
    data[index][name] = value;
    setFormFields(data);
  };

  const addFields = () => {
    if (conferente !== "" && filialOrigem !== "") {
      let object = {
        data: data,
        filialOrigem: filialOrigem,
        conferente: conferente,
        doca: doca,
        notaFiscal: "",
        codigo: "",
        descricaoProduto: "",
        quantidadeProduto: "",
        filialDestino: "",
        observacao: "",
      };
      setFormFields([...formFields, object]);
    }
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  async function onSubmit(e) {
    e.preventDefault();

    const data = {
      formFields,
    };

    try {
      showLoader();
      await api.post("/entrada/create", data).then(() => {
        hideLoader();

        Swal.fire({
          title: "Inserido com sucesso !",
          showCancelButton: false,
          showConfirmButton: false,
          icon: "success",
          timer: 1000,
        });

        setTimeout(() => {
          resetForm();
        }, 1100);
      });
    } catch (err) {
      hideLoader();
      const { data } = err.response;
      Swal.fire({
        title: "Erro ao inserir",
        text: data.message,
        icon: "error",
        confirmButtonText: "Voltar",
      });
    }
  }

  return (
    <div className="form flex-center">
      <form onSubmit={onSubmit}>
        <h4 className="form__title uppercase">Cadastro de entrada</h4>
        <hr />
        <div className="form__search-bar mt-3">
          <div className="">
            <label htmlFor="data">Data</label>
            <input type="text" name="data" className="input input--width-1 text-center" required disabled value={data} />
          </div>

          <div className="ml-3">
            <label htmlFor="filialOrigem">Filial origem</label>
            <select name="filialOrigem" className="input input--width-2" required disabled={filialOrigem !== "" ? true : false} onChange={(e) => setFilialOrigem(e.target.value)}>
              <option value="">Selecione</option>
              {filiais.map((filial) => (
                <option value={filial.numeroFilial} key={filial.numeroFilial}>
                  {filial.numeroFilial}
                </option>
              ))}
            </select>
          </div>

          <div className="ml-3">
            <label htmlFor="nomeConferente">Conferente</label>
            <select name="nomeConferente" className="input input--width-5 " required disabled={conferente !== "" ? true : false} onChange={(e) => setConferente(e.target.value)}>
              <option value="">Selecione</option>
              {conferentes.map((conferente) => (
                <option value={conferente.nomeConferente} key={conferente.nomeConferente}>
                  {conferente.nomeConferente}
                </option>
              ))}
            </select>
          </div>

          <div className="ml-3">
            <label htmlFor="doca">Doca</label>
            <input type="number" name="doca" className="input input--width-2 " required value={doca} onChange={(e) => setDoca(e.target.value)} />
          </div>

          <div className="ml-3">
            <button type="submit" id="btn-submit" className="btn btn--primary btn--medium" disabled style={{ height: "50px" }}>
              Inserir
            </button>
          </div>
        </div>

        <div className="row mt-3">
          <div className="form__header col-width-1 mr-2 bold">Nota fiscal</div>
          <div className="form__header col-width-1 mr-2 bold">Código</div>
          <div className="form__header col-width-3 mr-2 bold">Descrição</div>
          <div className="form__header col-width-1 mr-2 bold">Quantidade</div>
          <div className="form__header col-width-1 mr-2 bold">Filial Destino</div>
          <div className="form__header col-width-3 mr-2 bold">Observação</div>
          <div className="form__header col-width-1"></div>
        </div>

        {formFields.map((form, index) => {
          return (
            <div key={index} className="row mt-1">
              <div className="col-width-1 mr-2">
                <input
                  type="text"
                  name="notaFiscal"
                  required
                  value={form.notaFiscal}
                  onChange={(event) => handleFormBodyChange(event, index)}
                  onClick={() => (document.querySelector("#btn-submit").disabled = false)}
                />
              </div>

              <div className="col-width-1 mr-2">
                <input type="text" name="codigo" maxLength="10" value={form.codigoProduto} required onChange={(event) => handleFormBodyChange(event, index)} />
              </div>

              <div className="col-width-3 mr-2">
                <input type="text" name="descricaoProduto" maxLength="30" value={form.descricaoProduto} required onChange={(event) => handleFormBodyChange(event, index)} />
              </div>

              <div className="col-width-1 mr-2">
                <input type="number" name="quantidadeProduto" required value={form.quantidadeProduto} onChange={(event) => handleFormBodyChange(event, index)} />
              </div>

              <div className="col-width-1 mr-2">
                <input type="number" name="filialDestino" required value={form.filialDestino} onChange={(event) => handleFormBodyChange(event, index)} />
              </div>

              <div className="col-width-3 mr-2">
                <input type="text" name="observacao" maxLength="30" value={form.observacao} onChange={(event) => handleFormBodyChange(event, index)} />
              </div>

              <div className="col-width-1 mr-2">
                <button type="button" className="btn btn--primary btn--icon" id="btn-remove-fields" onClick={() => removeFields(index)}>
                  <FiMinusCircle size="30" />
                </button>
              </div>
            </div>
          );
        })}

        <div className="row mt-2">
          <button className="btn btn--primary btn--icon" id="btn-add-fields" disabled={conferente === "" || filialOrigem === "" || doca === "" ? true : false} onClick={addFields}>
            <FiPlusCircle size="30" />
          </button>
        </div>
      </form>
      {loader}
    </div>
  );
}
