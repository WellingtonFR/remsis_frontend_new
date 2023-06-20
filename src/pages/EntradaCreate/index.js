import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import api from "../../services/api";
import UseLoader from "../../hooks/UseLoader";

export default function EntradaCreate() {
  //#region useState

  //Parte superior do formulário
  const [dataAtual] = useState(new Date().toLocaleDateString("pt-br"));
  const [loader, showLoader, hideLoader] = UseLoader();

  const [conferente, setConferente] = useState("");
  const [filialOrigem, setFilialOrigem] = useState("");
  const [doca, setDoca] = useState("");
  const [conferentes, setConferentes] = useState([]);
  const [filiais, setFiliais] = useState([]);

  const [formFields, setFormFields] = useState([
    {
      dataAtual: dataAtual,
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
    setInitialValues();
  }, []);

  function setInitialValues() {
    fetchDataToOptions();
    removeFields(0);

    let filialOrigem = document.querySelector("select[name='filialOrigem']");
    let conferente = document.querySelector("select[name='nomeConferente']");
    let doca = document.querySelector("input[name='doca']");

    filialOrigem.removeAttribute("disabled");
    conferente.removeAttribute("disabled");
    doca.removeAttribute("disabled");
    setDoca("");

    filialOrigem.querySelector("option").selected = "selected";
    conferente.querySelector("option").selected = "selected";
  }

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
        dataAtual: dataAtual,
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
          timer: 2000,
          timerProgressBar: true,
        });

        setTimeout(() => {
          setInitialValues();
        }, 2000);
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
    <div className="form-create">
      <h4 className="form-header">Cadastro de entrada</h4>
      <form onSubmit={onSubmit} id="form_entrada">
        <hr />
        <div className="row">
          <div className="field-size-2 ml-3">
            <label htmlFor="dataAtual">Data</label>
            <input type="number" name="dataAtual" className="form-control" required disabled value={dataAtual} />
          </div>

          <div className="field-size-2 ml-3">
            <label htmlFor="filialOrigem">Filial origem</label>
            <select name="filialOrigem" className="form-control" required disabled={filialOrigem !== "" ? true : false} onChange={(e) => setFilialOrigem(e.target.value)}>
              <option value="">Selecione</option>
              {filiais.map((filial) => (
                <option value={filial.numeroFilial} key={filial.numeroFilial}>
                  {filial.numeroFilial}
                </option>
              ))}
            </select>
          </div>

          <div className="field-size-2 ml-3">
            <label htmlFor="nomeConferente">Conferente</label>
            <select name="nomeConferente" className="form-control" required disabled={conferente !== "" ? true : false} onChange={(e) => setConferente(e.target.value)}>
              <option value="">Selecione</option>
              {conferentes.map((conferente) => (
                <option value={conferente.nomeConferente} key={conferente.nomeConferente}>
                  {conferente.nomeConferente}
                </option>
              ))}
            </select>
          </div>

          <div className="field-size-1 ml-3">
            <label htmlFor="doca">Doca</label>
            <input type="number" name="doca" className="form-control" required value={doca} onBlur={(e) => e.target.setAttribute("disabled", "true")} onChange={(e) => setDoca(e.target.value)} />
          </div>

          <div className="">
            <button type="submit" className="btn btn-primary btn-submit" id="btn-submit" disabled style={{ height: "50px" }}>
              Inserir
            </button>
          </div>
        </div>

        <div className="form-lines">
          <div className="row Head">
            <div className="field-size-1">Nota fiscal</div>
            <div className="field-size-1">Código</div>
            <div className="field-size-2">Descrição</div>
            <div className="field-size-1">Quantidade</div>
            <div className="field-size-1">Filial Destino</div>
            <div className="field-size-2">Observação</div>
          </div>

          {formFields.map((form, index) => {
            return (
              <div className="row" key={index}>
                <div className="field-size-1">
                  <input
                    type="text"
                    name="notaFiscal"
                    className="form-control"
                    required
                    value={form.notaFiscal}
                    onChange={(event) => handleFormBodyChange(event, index)}
                    onClick={() => (document.querySelector("#btn-submit").disabled = false)}
                  />
                </div>
                <div className="field-size-1">
                  <input type="text" name="codigo" className="form-control" required value={form.codigo} onChange={(event) => handleFormBodyChange(event, index)} />
                </div>
                <div className="field-size-2">
                  <input type="text" name="descricaoProduto" className=" form-control" maxLength="50" value={form.descricaoProduto} required onChange={(event) => handleFormBodyChange(event, index)} />
                </div>
                <div className="field-size-1">
                  <input type="number" name="quantidadeProduto" className="form-control" required value={form.quantidadeProduto} onChange={(event) => handleFormBodyChange(event, index)} />
                </div>
                <div className="field-size-1">
                  <input type="number" name="filialDestino" className="form-control" required value={form.filialDestino} onChange={(event) => handleFormBodyChange(event, index)} />
                </div>
                <div className="field-size-2">
                  <input type="text" name="observacao" className="form-control" value={form.observacao} onChange={(event) => handleFormBodyChange(event, index)} />
                </div>
                <div className="field-size-1">
                  <button type="button" className="btn btn-primary" id="btn-remove-fields" style={{ height: "40px", paddingTop: "5px" }} onClick={() => removeFields(index)}>
                    <FiMinusCircle size="30" />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="row">
            <div className="col-md-1 p-0">
              <button type="button" className="btn btn-primary my-2" id="btn-add-fields" disabled={conferente === "" || filialOrigem === "" || doca === "" ? true : false} onClick={addFields}>
                <FiPlusCircle size="30" />
              </button>
            </div>
          </div>
        </div>
      </form>
      {loader}
    </div>
  );
}
