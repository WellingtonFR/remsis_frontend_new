import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../services/api";
import UseLoader from "../../hooks/UseLoader";

export default function SaidaUpdate() {
  const [loader, showLoader, hideLoader] = UseLoader();
  const [saida, setSaida] = useState([]);
  const [transportadores, setTransportadores] = useState([]); //Preenche o option
  const [transportador, setTransportador] = useState([]); //Informação a ser salva no banco
  const [conferente, setConferente] = useState([]); //Informação a ser salva no banco
  const [conferentes, setConferentes] = useState([]); //Preenche o option
  const [placaVeiculo, setPlacaVeiculo] = useState("");

  const tipoOptions = [
    "PORTARIA",
    "DQS-PROD. CLIENTE",
    "DQS-PROD. ESTOQUE",
    "REMESSA DE PEÇA",
    "TRANSF. ENTRE LOJA",
    "TRANSF. IMOBILIZADO",
    "SUP-MAT. PROMOCIONAL",
    "SITE-VENDA",
    "SITE-CANCELAMENTO",
    "SUP-USO E CONSUMO",
  ];

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await api.get(`/saida/findById/${id}`).then((response) => {
        setSaida(response.data[0]);
        api.get(`/transportador/findByFilialAtendida/${response.data[0].filialDestino}`).then((response) => {
          setTransportadores(response.data);
        });
      });
      await api.get("transportador").then((response) => {
        setTransportadores(response.data);
      });
      await api.get("conferente").then((response) => {
        setConferentes(response.data);
      });
    })();
  }, [id]);

  async function handleTransportador(optionValue) {
    if (!optionValue || optionValue === "") {
      setPlacaVeiculo("");
      setTransportador("");
      return null;
    }
    showLoader();
    await api.get(`/transportador/findById/${optionValue}`).then((response) => {
      setPlacaVeiculo(response.data[0].placaVeiculo);
      setTransportador(response.data[0].nomeTransportador);
    });
  }

  const handleInputChange = (e) => {
    e.persist();
    setSaida({ ...saida, [e.target.name]: e.target.value });
  };

  async function handleNewSaida(e) {
    e.preventDefault();

    const data = {
      data: saida.data,
      numeroControle: saida.numeroControle,
      filialDestino: saida.filialDestino,
      nomeFilialDestino: saida.nomeFilialDestino,
      enderecoFilialDestino: saida.enderecoFilialDestino,
      transportador: transportador,
      placaVeiculo: placaVeiculo,
      conferente: conferente,
      //
      filialOrigem_1: saida.filialOrigem_1,
      notaFiscal_1: saida.notaFiscal_1,
      tipoOperacao_1: saida.tipoOperacao_1,
      codigo_1: saida.codigo_1,
      descricaoProduto_1: saida.descricaoProduto_1,
      quantidadeProduto_1: saida.quantidadeProduto_1,
      observacao_1: saida.observacao_1,
      //
      filialOrigem_2: saida.filialOrigem_2,
      notaFiscal_2: saida.notaFiscal_2,
      tipoOperacao_2: saida.tipoOperacao_2,
      codigo_2: saida.codigo_2,
      descricaoProduto_2: saida.descricaoProduto_2,
      quantidadeProduto_2: saida.quantidadeProduto_2,
      observacao_2: saida.observacao_2,
      //
      filialOrigem_3: saida.filialOrigem_3,
      notaFiscal_3: saida.notaFiscal_3,
      tipoOperacao_3: saida.tipoOperacao_3,
      codigo_3: saida.codigo_3,
      descricaoProduto_3: saida.descricaoProduto_3,
      quantidadeProduto_3: saida.quantidadeProduto_3,
      observacao_3: saida.observacao_3,
      //
      filialOrigem_4: saida.filialOrigem_4,
      notaFiscal_4: saida.notaFiscal_4,
      tipoOperacao_4: saida.tipoOperacao_4,
      codigo_4: saida.codigo_4,
      descricaoProduto_4: saida.descricaoProduto_4,
      quantidadeProduto_4: saida.quantidadeProduto_4,
      observacao_4: saida.observacao_4,
      //
      filialOrigem_5: saida.filialOrigem_5,
      notaFiscal_5: saida.notaFiscal_5,
      tipoOperacao_5: saida.tipoOperacao_5,
      codigo_5: saida.codigo_5,
      descricaoProduto_5: saida.descricaoProduto_5,
      quantidadeProduto_5: saida.quantidadeProduto_5,
      observacao_5: saida.observacao_5,
      //
      filialOrigem_6: saida.filialOrigem_6,
      notaFiscal_6: saida.notaFiscal_6,
      tipoOperacao_6: saida.tipoOperacao_6,
      codigo_6: saida.codigo_6,
      descricaoProduto_6: saida.descricaoProduto_6,
      quantidadeProduto_6: saida.quantidadeProduto_6,
      observacao_6: saida.observacao_6,
      //
      filialOrigem_7: saida.filialOrigem_7,
      notaFiscal_7: saida.notaFiscal_7,
      tipoOperacao_7: saida.tipoOperacao_7,
      codigo_7: saida.codigo_7,
      descricaoProduto_7: saida.descricaoProduto_7,
      quantidadeProduto_7: saida.quantidadeProduto_7,
      observacao_7: saida.observacao_7,
      //
      filialOrigem_8: saida.filialOrigem_8,
      notaFiscal_8: saida.notaFiscal_8,
      tipoOperacao_8: saida.tipoOperacao_8,
      codigo_8: saida.codigo_8,
      descricaoProduto_8: saida.descricaoProduto_8,
      quantidadeProduto_8: saida.quantidadeProduto_8,
      observacao_8: saida.observacao_8,
      //
      filialOrigem_9: saida.filialOrigem_9,
      notaFiscal_9: saida.notaFiscal_9,
      tipoOperacao_9: saida.tipoOperacao_9,
      codigo_9: saida.codigo_9,
      descricaoProduto_9: saida.descricaoProduto_9,
      quantidadeProduto_9: saida.quantidadeProduto_9,
      observacao_9: saida.observacao_9,
      //
      filialOrigem_10: saida.filialOrigem_10,
      notaFiscal_10: saida.notaFiscal_10,
      tipoOperacao_10: saida.tipoOperacao_10,
      codigo_10: saida.codigo_10,
      descricaoProduto_10: saida.descricaoProduto_10,
      quantidadeProduto_10: saida.quantidadeProduto_10,
      observacao_10: saida.observacao_10,
      //
      filialOrigem_11: saida.filialOrigem_11,
      notaFiscal_11: saida.notaFiscal_11,
      tipoOperacao_11: saida.tipoOperacao_11,
      codigo_11: saida.codigo_11,
      descricaoProduto_11: saida.descricaoProduto_11,
      quantidadeProduto_11: saida.quantidadeProduto_11,
      observacao_11: saida.observacao_11,
      //
      filialOrigem_12: saida.filialOrigem_12,
      notaFiscal_12: saida.notaFiscal_12,
      tipoOperacao_12: saida.tipoOperacao_12,
      codigo_12: saida.codigo_12,
      descricaoProduto_12: saida.descricaoProduto_12,
      quantidadeProduto_12: saida.quantidadeProduto_12,
      observacao_12: saida.observacao_12,
      //
      filialOrigem_13: saida.filialOrigem_13,
      notaFiscal_13: saida.notaFiscal_13,
      tipoOperacao_13: saida.tipoOperacao_13,
      codigo_13: saida.codigo_13,
      descricaoProduto_13: saida.descricaoProduto_13,
      quantidadeProduto_13: saida.quantidadeProduto_13,
      observacao_13: saida.observacao_13,
      //
      filialOrigem_14: saida.filialOrigem_14,
      notaFiscal_14: saida.notaFiscal_14,
      tipoOperacao_14: saida.tipoOperacao_14,
      codigo_14: saida.codigo_14,
      descricaoProduto_14: saida.descricaoProduto_14,
      quantidadeProduto_14: saida.quantidadeProduto_14,
      observacao_14: saida.observacao_14,
      //
      filialOrigem_15: saida.filialOrigem_15,
      notaFiscal_15: saida.notaFiscal_15,
      tipoOperacao_15: saida.tipoOperacao_15,
      codigo_15: saida.codigo_15,
      descricaoProduto_15: saida.descricaoProduto_15,
      quantidadeProduto_15: saida.quantidadeProduto_15,
      observacao_15: saida.observacao_15,
      //
      filialOrigem_16: saida.filialOrigem_16,
      notaFiscal_16: saida.notaFiscal_16,
      tipoOperacao_16: saida.tipoOperacao_16,
      codigo_16: saida.codigo_16,
      descricaoProduto_16: saida.descricaoProduto_16,
      quantidadeProduto_16: saida.quantidadeProduto_16,
      observacao_16: saida.observacao_16,
      //
      filialOrigem_17: saida.filialOrigem_17,
      notaFiscal_17: saida.notaFiscal_17,
      tipoOperacao_17: saida.tipoOperacao_17,
      codigo_17: saida.codigo_17,
      descricaoProduto_17: saida.descricaoProduto_17,
      quantidadeProduto_17: saida.quantidadeProduto_17,
      observacao_17: saida.observacao_17,
      //
      filialOrigem_18: saida.filialOrigem_18,
      notaFiscal_18: saida.notaFiscal_18,
      tipoOperacao_18: saida.tipoOperacao_18,
      codigo_18: saida.codigo_18,
      descricaoProduto_18: saida.descricaoProduto_18,
      quantidadeProduto_18: saida.quantidadeProduto_18,
      observacao_18: saida.observacao_18,
      //
      filialOrigem_19: saida.filialOrigem_19,
      notaFiscal_19: saida.notaFiscal_19,
      tipoOperacao_19: saida.tipoOperacao_19,
      codigo_19: saida.codigo_19,
      descricaoProduto_19: saida.descricaoProduto_19,
      quantidadeProduto_19: saida.quantidadeProduto_19,
      observacao_19: saida.observacao_19,
      //
      filialOrigem_20: saida.filialOrigem_20,
      notaFiscal_20: saida.notaFiscal_20,
      tipoOperacao_20: saida.tipoOperacao_20,
      codigo_20: saida.codigo_20,
      descricaoProduto_20: saida.descricaoProduto_20,
      quantidadeProduto_20: saida.quantidadeProduto_20,
      observacao_20: saida.observacao_20,
    };

    try {
      showLoader();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      await api.put(`/saida/update/${id}`, data).then(() => {
        hideLoader();
        Swal.fire({
          title: "Alterado com sucesso !",
          confirmButtonText: "Gerar relatório",
          icon: "success",
          preConfirm: () => {
            document.querySelector("form").reset();
            // eslint-disable-next-line react-hooks/exhaustive-deps
            history.push(`/saida/report/${id}`);
          },
        });
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
      <h4 className="form-header">Alterar saída</h4>
      <small>Altere os informações e clique em salvar</small>
      <form onSubmit={handleNewSaida}>
        <hr />
        <div className="row">
          <div className="field-size-2 ml-3">
            <label htmlFor="data">Data</label>
            <input type="text" name="data" className="form-control disabled" disabled value={saida.data} />
          </div>
          <div className="field-size-2 ml-3">
            <label htmlFor="numeroControle">Controle</label>
            <input type="text" name="numeroControle" className="form-control disabled" value={saida.numeroControle} disabled />
          </div>
        </div>

        <div className="row">
          <div className="field-size-2 ml-3">
            <label htmlFor="filialDestino">Unidade destino</label>
            <input name="filialDestino" className="form-control disabled" value={saida.filialDestino} disabled />
          </div>

          <div className="field-size-2 ml-3">
            <label htmlFor="nomeFilialDestino">Nome</label>
            <input name="nomeFilialDestino" type="text" className="form-control disabled" value={saida.nomeFilialDestino} disabled />
          </div>

          <div className="field-size-4 ml-3">
            <label htmlFor="enderecoFilialDestino">Endereço</label>
            <input name="enderecoFilialDestino" type="text" className="form-control disabled" value={saida.enderecoFilialDestino} disabled />
          </div>
        </div>

        <div className="row">
          <div className="field-size-2 ml-3">
            <label htmlFor="transportador">Transportador</label>
            <select name="transportador" className="form-control" required onChange={(e) => handleTransportador(e.target.value)}>
              <option value="">Selecione</option>
              {transportadores.map((transportador) => (
                <option value={transportador.id} key={transportador.id}>
                  {transportador.filialAtendida + " - " + transportador.nomeTransportador}
                </option>
              ))}
            </select>
          </div>

          <div className="field-size-2 ml-3">
            <label htmlFor="placaVeiculo">Placa do veículo</label>
            <input type="text" name="placaVeiculo" className="form-control" value={placaVeiculo} disabled required />
          </div>

          <div className="field-size-4 ml-3">
            <label htmlFor="nomeConferente">Conferente</label>
            <select name="nomeConferente" className="form-control" required onChange={(e) => setConferente(e.target.value)}>
              <option value="">Selecione</option>
              {conferentes.map((conferente) => (
                <option value={conferente.nomeConferente} key={conferente.id}>
                  {conferente.nomeConferente}
                </option>
              ))}
            </select>
          </div>

          <div className="">
            <Link to="/saida" className="btn btn-dark btn-cancel">
              Cancelar
            </Link>
          </div>

          <div className="">
            <button type="submit" className="btn btn-primary btn-submit">
              Salvar
            </button>
          </div>
        </div>

        <div className="form-lines">
          <div className="row Head">
            <div className="field-size-1">Filial origem</div>
            <div className="field-size-1">Nota fiscal</div>
            <div className="field-size-1">Tipo</div>
            <div className="field-size-1">Código</div>
            <div className="field-size-2">Descrição</div>
            <div className="field-size-1">Quantidade</div>
            <div className="field-size-2">Observação</div>
          </div>

          {/*Line1*/}
          <div className="row">
            <div className="field-size-1">
              <input type="text" name="filialOrigem_1" className="form-control" required value={saida.filialOrigem_1} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="text" name="notaFiscal_1" className="form-control" required value={saida.notaFiscal_1} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <select name="tipoOperacao_1" className="form-control" required value={saida.tipoOperacao_1} onChange={handleInputChange}>
                <option value="">Selecione</option>
                {tipoOptions.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="field-size-1">
              <input type="text" name="codigo_1" className="form-control" required value={saida.codigo_1} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="descricaoProduto_1" className="form-control" required value={saida.descricaoProduto_1} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="number" name="quantidadeProduto_1" className="form-control" required value={saida.quantidadeProduto_1} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="observacao_1" className="form-control" required value={saida.observacao_1} onChange={handleInputChange} />
            </div>
          </div>

          {/*Line2*/}
          <div className="row">
            <div className="field-size-1">
              <input type="text" name="filialOrigem_2" className="form-control" value={saida.filialOrigem_2} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="text" name="notaFiscal_2" className="form-control" value={saida.notaFiscal_2} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <select name="tipoOperacao_2" className="form-control" value={saida.tipoOperacao_2} onChange={handleInputChange}>
                <option value="">Selecione</option>
                {tipoOptions.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field-size-1">
              <input type="text" name="codigo_2" className="form-control" value={saida.codigo_2} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="descricaoProduto_2" className="form-control" value={saida.descricaoProduto_2} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="number" name="quantidadeProduto_2" className="form-control" value={saida.quantidadeProduto_2} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="observacao_2" className="form-control" value={saida.observacao_2} onChange={handleInputChange} />
            </div>
          </div>

          {/*Line3*/}
          <div className="row">
            <div className="field-size-1">
              <input type="text" name="filialOrigem_3" className="form-control" value={saida.filialOrigem_3} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="text" name="notaFiscal_3" className="form-control" value={saida.notaFiscal_3} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <select name="tipoOperacao_3" className="form-control" value={saida.tipoOperacao_3} onChange={handleInputChange}>
                <option value="">Selecione</option>
                {tipoOptions.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field-size-1">
              <input type="text" name="codigo_3" className="form-control" value={saida.codigo_3} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="descricaoProduto_3" className="form-control" value={saida.descricaoProduto_3} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="number" name="quantidadeProduto_3" className="form-control" value={saida.quantidadeProduto_3} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="observacao_3" className="form-control" value={saida.observacao_3} onChange={handleInputChange} />
            </div>
          </div>

          {/*Line4*/}
          <div className="row">
            <div className="field-size-1">
              <input type="text" name="filialOrigem_4" className="form-control" value={saida.filialOrigem_4} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="text" name="notaFiscal_4" className="form-control" value={saida.notaFiscal_4} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <select name="tipoOperacao_4" className="form-control" value={saida.tipoOperacao_4} onChange={handleInputChange}>
                <option value="">Selecione</option>
                {tipoOptions.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field-size-1">
              <input type="text" name="codigo_4" className="form-control" value={saida.codigo_4} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="descricaoProduto_4" className="form-control" value={saida.descricaoProduto_4} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="number" name="quantidadeProduto_4" className="form-control" value={saida.quantidadeProduto_4} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="observacao_4" className="form-control" value={saida.observacao_4} onChange={handleInputChange} />
            </div>
          </div>

          {/*Line5*/}
          <div className="row">
            <div className="field-size-1">
              <input type="text" name="filialOrigem_5" className="form-control" value={saida.filialOrigem_5} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="text" name="notaFiscal_5" className="form-control" value={saida.notaFiscal_5} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <select name="tipoOperacao_5" className="form-control" value={saida.tipoOperacao_5} onChange={handleInputChange}>
                <option value="">Selecione</option>
                {tipoOptions.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field-size-1">
              <input type="text" name="codigo_5" className="form-control" value={saida.codigo_5} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="descricaoProduto_5" className="form-control" value={saida.descricaoProduto_5} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="number" name="quantidadeProduto_5" className="form-control" value={saida.quantidadeProduto_5} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="observacao_5" className="form-control" value={saida.observacao_5} onChange={handleInputChange} />
            </div>
          </div>

          {/*Line6*/}
          <div className="row">
            <div className="field-size-1">
              <input type="text" name="filialOrigem_6" className="form-control" value={saida.filialOrigem_6} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="text" name="notaFiscal_6" className="form-control" value={saida.notaFiscal_6} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <select name="tipoOperacao_6" className="form-control" value={saida.tipoOperacao_6} onChange={handleInputChange}>
                <option value="">Selecione</option>
                {tipoOptions.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field-size-1">
              <input type="text" name="codigo_6" className="form-control" value={saida.codigo_6} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="descricaoProduto_6" className="form-control" value={saida.descricaoProduto_6} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="number" name="quantidadeProduto_6" className="form-control" value={saida.quantidadeProduto_6} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="observacao_6" className="form-control" value={saida.observacao_6} onChange={handleInputChange} />
            </div>
          </div>

          {/*Line7*/}
          <div className="row">
            <div className="field-size-1">
              <input type="text" name="filialOrigem_7" className="form-control" value={saida.filialOrigem_7} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="text" name="notaFiscal_7" className="form-control" value={saida.notaFiscal_7} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <select name="tipoOperacao_7" className="form-control" value={saida.tipoOperacao_7} onChange={handleInputChange}>
                <option value="">Selecione</option>
                {tipoOptions.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field-size-1">
              <input type="text" name="codigo_7" className="form-control" value={saida.codigo_7} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="descricaoProduto_7" className="form-control" value={saida.descricaoProduto_7} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="number" name="quantidadeProduto_7" className="form-control" value={saida.quantidadeProduto_7} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="observacao_7" className="form-control" value={saida.observacao_7} onChange={handleInputChange} />
            </div>
          </div>

          {/*Line8*/}
          <div className="row">
            <div className="field-size-1">
              <input type="text" name="filialOrigem_8" className="form-control" value={saida.filialOrigem_8} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="text" name="notaFiscal_8" className="form-control" value={saida.notaFiscal_8} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <select name="tipoOperacao_8" className="form-control" value={saida.tipoOperacao_8} onChange={handleInputChange}>
                <option value="">Selecione</option>
                {tipoOptions.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field-size-1">
              <input type="text" name="codigo_8" className="form-control" value={saida.codigo_8} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="descricaoProduto_8" className="form-control" value={saida.descricaoProduto_8} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="number" name="quantidadeProduto_8" className="form-control" value={saida.quantidadeProduto_8} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="observacao_8" className="form-control" value={saida.observacao_8} onChange={handleInputChange} />
            </div>
          </div>

          {/*Line9*/}
          <div className="row">
            <div className="field-size-1">
              <input type="text" name="filialOrigem_9" className="form-control" value={saida.filialOrigem_9} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="text" name="notaFiscal_9" className="form-control" value={saida.notaFiscal_9} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <select name="tipoOperacao_9" className="form-control" value={saida.tipoOperacao_9} onChange={handleInputChange}>
                <option value="">Selecione</option>
                {tipoOptions.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field-size-1">
              <input type="text" name="codigo_9" className="form-control" value={saida.codigo_9} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="descricaoProduto_9" className="form-control" value={saida.descricaoProduto_9} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="number" name="quantidadeProduto_9" className="form-control" value={saida.quantidadeProduto_9} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" name="observacao_9" className="form-control" value={saida.observacao_9} onChange={handleInputChange} />
            </div>
          </div>

          {/*Line10*/}
          <div className="row">
            <div className="field-size-1">
              <input type="text" name="filialOrigem_10" className="form-control" value={saida.filialOrigem_10} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="text" name="notaFiscal_10" className="form-control" value={saida.notaFiscal_10} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <select name="tipoOperacao_10" className="form-control" value={saida.tipoOperacao_10} onChange={handleInputChange}>
                <option value="">Selecione</option>
                {tipoOptions.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field-size-1">
              <input type="text" name="codigo_10" className="form-control" value={saida.codigo_10} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="descricaoProduto_10" className="form-control" value={saida.descricaoProduto_10} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="number" name="quantidadeProduto_10" className="form-control" value={saida.quantidadeProduto_10} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="observacao_10" className="form-control" value={saida.observacao_10} onChange={handleInputChange} />
            </div>
          </div>
          {/*Line11*/}
          <div className="row">
            <div className="field-size-1">
              <input type="text" name="filialOrigem_11" className="form-control" value={saida.filialOrigem_11} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="text" name="notaFiscal_11" className="form-control" value={saida.notaFiscal_11} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <select name="tipoOperacao_11" className="form-control" value={saida.tipoOperacao_11} onChange={handleInputChange}>
                <option value="">Selecione</option>
                {tipoOptions.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field-size-1">
              <input type="text" name="codigo_11" className="form-control" value={saida.codigo_11} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="descricaoProduto_11" className="form-control" value={saida.descricaoProduto_11} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="number" name="quantidadeProduto_11" className="form-control" value={saida.quantidadeProduto_11} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="observacao_11" className="form-control" value={saida.observacao_11} onChange={handleInputChange} />
            </div>
          </div>

          {/*Line12*/}
          <div className="row">
            <div className="field-size-1">
              <input type="text" name="filialOrigem_12" className="form-control" value={saida.filialOrigem_12} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="text" name="notaFiscal_12" className="form-control" value={saida.notaFiscal_12} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <select name="tipoOperacao_12" className="form-control" value={saida.tipoOperacao_12} onChange={handleInputChange}>
                <option value="">Selecione</option>
                {tipoOptions.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field-size-1">
              <input type="text" name="codigo_12" className="form-control" value={saida.codigo_12} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="descricaoProduto_12" className="form-control" value={saida.descricaoProduto_12} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="number" name="quantidadeProduto_12" className="form-control" value={saida.quantidadeProduto_12} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="observacao_12" className="form-control" value={saida.observacao_12} onChange={handleInputChange} />
            </div>
          </div>

          {/*Line13*/}
          <div className="row">
            <div className="field-size-1">
              <input type="text" name="filialOrigem_13" className="form-control" value={saida.filialOrigem_13} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="text" name="notaFiscal_13" className="form-control" value={saida.notaFiscal_13} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <select name="tipoOperacao_13" className="form-control" value={saida.tipoOperacao_13} onChange={handleInputChange}>
                <option value="">Selecione</option>
                {tipoOptions.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field-size-1">
              <input type="text" name="codigo_13" className="form-control" value={saida.codigo_13} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="descricaoProduto_13" className="form-control" value={saida.descricaoProduto_13} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="number" name="quantidadeProduto_13" className="form-control" value={saida.quantidadeProduto_13} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="observacao_13" className="form-control" value={saida.observacao_13} onChange={handleInputChange} />
            </div>
          </div>

          {/*Line14*/}
          <div className="row">
            <div className="field-size-1">
              <input type="text" name="filialOrigem_14" className="form-control" value={saida.filialOrigem_14} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="text" name="notaFiscal_14" className="form-control" value={saida.notaFiscal_14} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <select name="tipoOperacao_14" className="form-control" value={saida.tipoOperacao_14} onChange={handleInputChange}>
                <option value="">Selecione</option>
                {tipoOptions.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field-size-1">
              <input type="text" name="codigo_14" className="form-control" value={saida.codigo_14} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="descricaoProduto_14" className="form-control" value={saida.descricaoProduto_14} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="number" name="quantidadeProduto_14" className="form-control" value={saida.quantidadeProduto_14} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="observacao_14" className="form-control" value={saida.observacao_14} onChange={handleInputChange} />
            </div>
          </div>

          {/*Line15*/}
          <div className="row">
            <div className="field-size-1">
              <input type="text" name="filialOrigem_15" className="form-control" value={saida.filialOrigem_15} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="text" name="notaFiscal_15" className="form-control" value={saida.notaFiscal_15} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <select name="tipoOperacao_15" className="form-control" value={saida.tipoOperacao_15} onChange={handleInputChange}>
                <option value="">Selecione</option>
                {tipoOptions.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field-size-1">
              <input type="text" name="codigo_15" className="form-control" value={saida.codigo_15} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="descricaoProduto_15" className="form-control" value={saida.descricaoProduto_15} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="number" name="quantidadeProduto_15" className="form-control" value={saida.quantidadeProduto_15} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="observacao_15" className="form-control" value={saida.observacao_15} onChange={handleInputChange} />
            </div>
          </div>

          {/*Line16*/}
          <div className="row">
            <div className="field-size-1">
              <input type="text" name="filialOrigem_16" className="form-control" value={saida.filialOrigem_16} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="text" name="notaFiscal_16" className="form-control" value={saida.notaFiscal_16} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <select name="tipoOperacao_16" className="form-control" value={saida.tipoOperacao_16} onChange={handleInputChange}>
                <option value="">Selecione</option>
                {tipoOptions.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field-size-1">
              <input type="text" name="codigo_16" className="form-control" value={saida.codigo_16} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="descricaoProduto_16" className="form-control" value={saida.descricaoProduto_16} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="number" name="quantidadeProduto_16" className="form-control" value={saida.quantidadeProduto_16} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="observacao_16" className="form-control" value={saida.observacao_16} onChange={handleInputChange} />
            </div>
          </div>

          {/*Line17*/}
          <div className="row">
            <div className="field-size-1">
              <input type="text" name="filialOrigem_17" className="form-control" value={saida.filialOrigem_17} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="text" name="notaFiscal_17" className="form-control" value={saida.notaFiscal_17} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <select name="tipoOperacao_17" className="form-control" value={saida.tipoOperacao_17} onChange={handleInputChange}>
                <option value="">Selecione</option>
                {tipoOptions.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field-size-1">
              <input type="text" name="codigo_17" className="form-control" value={saida.codigo_17} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="descricaoProduto_17" className="form-control" value={saida.descricaoProduto_17} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="number" name="quantidadeProduto_17" className="form-control" value={saida.quantidadeProduto_17} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="observacao_17" className="form-control" value={saida.observacao_17} onChange={handleInputChange} />
            </div>
          </div>

          {/*Line18*/}
          <div className="row">
            <div className="field-size-1">
              <input type="text" name="filialOrigem_18" className="form-control" value={saida.filialOrigem_18} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="text" name="notaFiscal_18" className="form-control" value={saida.notaFiscal_18} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <select name="tipoOperacao_18" className="form-control" value={saida.tipoOperacao_18} onChange={handleInputChange}>
                <option value="">Selecione</option>
                {tipoOptions.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field-size-1">
              <input type="text" name="codigo_18" className="form-control" value={saida.codigo_18} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="descricaoProduto_18" className="form-control" value={saida.descricaoProduto_18} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="number" name="quantidadeProduto_18" className="form-control" value={saida.quantidadeProduto_18} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="observacao_18" className="form-control" value={saida.observacao_18} onChange={handleInputChange} />
            </div>
          </div>

          {/*Line19*/}
          <div className="row">
            <div className="field-size-1">
              <input type="text" name="filialOrigem_19" className="form-control" value={saida.filialOrigem_19} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="text" name="notaFiscal_19" className="form-control" value={saida.notaFiscal_19} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <select name="tipoOperacao_19" className="form-control" value={saida.tipoOperacao_19} onChange={handleInputChange}>
                <option value="">Selecione</option>
                {tipoOptions.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field-size-1">
              <input type="text" name="codigo_19" className="form-control" value={saida.codigo_19} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="descricaoProduto_19" className="form-control" value={saida.descricaoProduto_19} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="number" name="quantidadeProduto_19" className="form-control" value={saida.quantidadeProduto_19} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="observacao_19" className="form-control" value={saida.observacao_19} onChange={handleInputChange} />
            </div>
          </div>

          {/*Line20*/}
          <div className="row">
            <div className="field-size-1">
              <input type="text" name="filialOrigem_20" className="form-control" value={saida.filialOrigem_20} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="text" name="notaFiscal_20" className="form-control" value={saida.notaFiscal_20} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <select name="tipoOperacao_20" className="form-control" value={saida.tipoOperacao_20} onChange={handleInputChange}>
                <option value="">Selecione</option>
                {tipoOptions.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field-size-1">
              <input type="text" name="codigo_20" className="form-control" value={saida.codigo_20} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="descricaoProduto_20" className="form-control" value={saida.descricaoProduto_20} onChange={handleInputChange} />
            </div>
            <div className="field-size-1">
              <input type="number" name="quantidadeProduto_20" className="form-control" value={saida.quantidadeProduto_20} onChange={handleInputChange} />
            </div>
            <div className="field-size-2">
              <input type="text" maxLength="30" name="observacao_20" className="form-control" value={saida.observacao_20} onChange={handleInputChange} />
            </div>
          </div>

          {/*formBottomLines*/}
        </div>
        {/*saidaCreate*/}
      </form>
      {loader}
    </div>
  );
}
