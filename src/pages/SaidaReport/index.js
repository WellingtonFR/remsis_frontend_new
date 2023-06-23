import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import logoMagalu from "../../img/logoMagalu.png";
// eslint-disable-next-line
import styles from "./styles.css";
import api from "../../services/api";

export default function TransferenciaReport() {
  const { id } = useParams();
  const [report, setReport] = useState("");
  const [dataDeImpressao] = useState(new Date().toLocaleDateString("pt-br") + " " + new Date().toLocaleTimeString("pt-br"));

  useEffect(() => {
    (async () => {
      await api.get(`/saida/findById/${id}`).then((response) => {
        setReport(response.data[0]);
      });
    })();
  }, [id]);

  async function handlePrint(e) {
    e.preventDefault();
    window.print();
  }

  return (
    <div className="report">
      <div className="overlay-print d-print-none">
        <button type="button" name="imprimir" className="btn btn-danger btn-print" onClick={handlePrint}>
          Imprimir
        </button>
      </div>
      <div className="report-header">
        <div className="row">
          <div className="col-sm">
            <img src={logoMagalu} className="img-fluid" alt="logoMagalu" />
          </div>
          <div className="col">
            <div className="label">Data</div>
            <div className="data">{report.data}</div>
            <div className="label">Controle</div>
            <div className="data">{report.numeroControle}</div>
          </div>
          <div className="col">
            <div className="label">Filial de destino</div>
            <div className="data">{report.nomeFilialDestino}</div>
            <div className="label">Endereço</div>
            <div className="data">{report.enderecoFilialDestino}</div>
          </div>

          <div className="col">
            <div className="label">Transportador</div>
            <div className="data">{report.transportador}</div>

            <div className="label">Placa do veículo</div>
            <div className="data">{report.placaVeiculo}</div>
          </div>
        </div>
      </div>

      <div className="row report-table-header">
        <div className="col">Relatório de remanejamento CD 94 - Londrina</div>
      </div>

      <div className="report-body">
        <table className="table table-report">
          <thead>
            <tr>
              <th>Origem</th>
              <th>NF</th>
              <th>Tipo</th>
              <th>Código</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Observação</th>
            </tr>
          </thead>

          <tbody>
            {report.filialOrigem_1 !== "" && (
              <tr>
                <td>{report.filialOrigem_1}</td>
                <td>{report.notaFiscal_1}</td>
                <td>{report.tipoOperacao_1}</td>
                <td>{report.codigo_1}</td>
                <td>{report.descricaoProduto_1}</td>
                <td>{report.quantidadeProduto_1}</td>
                <td>{report.observacao_1}</td>
              </tr>
            )}

            {report.filialOrigem_2 !== "" && (
              <tr>
                <td>{report.filialOrigem_2}</td>
                <td>{report.notaFiscal_2}</td>
                <td>{report.tipoOperacao_2}</td>
                <td>{report.codigo_2}</td>
                <td>{report.descricaoProduto_2}</td>
                <td>{report.quantidadeProduto_2}</td>
                <td>{report.observacao_2}</td>
              </tr>
            )}

            {report.filialOrigem_3 !== "" && (
              <tr>
                <td>{report.filialOrigem_3}</td>
                <td>{report.notaFiscal_3}</td>
                <td>{report.tipoOperacao_3}</td>
                <td>{report.codigo_3}</td>
                <td>{report.descricaoProduto_3}</td>
                <td>{report.quantidadeProduto_3}</td>
                <td>{report.observacao_3}</td>
              </tr>
            )}
            {report.filialOrigem_4 !== "" && (
              <tr>
                <td>{report.filialOrigem_4}</td>
                <td>{report.notaFiscal_4}</td>
                <td>{report.tipoOperacao_4}</td>
                <td>{report.codigo_4}</td>
                <td>{report.descricaoProduto_4}</td>
                <td>{report.quantidadeProduto_4}</td>
                <td>{report.observacao_4}</td>
              </tr>
            )}
            {report.filialOrigem_5 !== "" && (
              <tr>
                <td>{report.filialOrigem_5}</td>
                <td>{report.notaFiscal_5}</td>
                <td>{report.tipoOperacao_5}</td>
                <td>{report.codigo_5}</td>
                <td>{report.descricaoProduto_5}</td>
                <td>{report.quantidadeProduto_5}</td>
                <td>{report.observacao_5}</td>
              </tr>
            )}
            {report.filialOrigem_6 !== "" && (
              <tr>
                <td>{report.filialOrigem_6}</td>
                <td>{report.notaFiscal_6}</td>
                <td>{report.tipoOperacao_6}</td>
                <td>{report.codigo_6}</td>
                <td>{report.descricaoProduto_6}</td>
                <td>{report.quantidadeProduto_6}</td>
                <td>{report.observacao_6}</td>
              </tr>
            )}
            {report.filialOrigem_7 !== "" && (
              <tr>
                <td>{report.filialOrigem_7}</td>
                <td>{report.notaFiscal_7}</td>
                <td>{report.tipoOperacao_7}</td>
                <td>{report.codigo_7}</td>
                <td>{report.descricaoProduto_7}</td>
                <td>{report.quantidadeProduto_7}</td>
                <td>{report.observacao_7}</td>
              </tr>
            )}
            {report.filialOrigem_8 !== "" && (
              <tr>
                <td>{report.filialOrigem_8}</td>
                <td>{report.notaFiscal_8}</td>
                <td>{report.tipoOperacao_8}</td>
                <td>{report.codigo_8}</td>
                <td>{report.descricaoProduto_8}</td>
                <td>{report.quantidadeProduto_8}</td>
                <td>{report.observacao_8}</td>
              </tr>
            )}
            {report.filialOrigem_9 !== "" && (
              <tr>
                <td>{report.filialOrigem_9}</td>
                <td>{report.notaFiscal_9}</td>
                <td>{report.tipoOperacao_9}</td>
                <td>{report.codigo_9}</td>
                <td>{report.descricaoProduto_9}</td>
                <td>{report.quantidadeProduto_9}</td>
                <td>{report.observacao_9}</td>
              </tr>
            )}
            {report.filialOrigem_10 !== "" && (
              <tr>
                <td>{report.filialOrigem_10}</td>
                <td>{report.notaFiscal_10}</td>
                <td>{report.tipoOperacao_10}</td>
                <td>{report.codigo_10}</td>
                <td>{report.descricaoProduto_10}</td>
                <td>{report.quantidadeProduto_10}</td>
                <td>{report.observacao_10}</td>
              </tr>
            )}
            {report.filialOrigem_11 !== "" && (
              <tr>
                <td>{report.filialOrigem_11}</td>
                <td>{report.notaFiscal_11}</td>
                <td>{report.tipoOperacao_11}</td>
                <td>{report.codigo_11}</td>
                <td>{report.descricaoProduto_11}</td>
                <td>{report.quantidadeProduto_11}</td>
                <td>{report.observacao_11}</td>
              </tr>
            )}
            {report.filialOrigem_12 !== "" && (
              <tr>
                <td>{report.filialOrigem_12}</td>
                <td>{report.notaFiscal_12}</td>
                <td>{report.tipoOperacao_12}</td>
                <td>{report.codigo_12}</td>
                <td>{report.descricaoProduto_12}</td>
                <td>{report.quantidadeProduto_12}</td>
                <td>{report.observacao_12}</td>
              </tr>
            )}
            {report.filialOrigem_13 !== "" && (
              <tr>
                <td>{report.filialOrigem_13}</td>
                <td>{report.notaFiscal_13}</td>
                <td>{report.tipoOperacao_13}</td>
                <td>{report.codigo_13}</td>
                <td>{report.descricaoProduto_13}</td>
                <td>{report.quantidadeProduto_13}</td>
                <td>{report.observacao_13}</td>
              </tr>
            )}
            {report.filialOrigem_14 !== "" && (
              <tr>
                <td>{report.filialOrigem_14}</td>
                <td>{report.notaFiscal_14}</td>
                <td>{report.tipoOperacao_14}</td>
                <td>{report.codigo_14}</td>
                <td>{report.descricaoProduto_14}</td>
                <td>{report.quantidadeProduto_14}</td>
                <td>{report.observacao_14}</td>
              </tr>
            )}
            {report.filialOrigem_15 !== "" && (
              <tr>
                <td>{report.filialOrigem_15}</td>
                <td>{report.notaFiscal_15}</td>
                <td>{report.tipoOperacao_15}</td>
                <td>{report.codigo_15}</td>
                <td>{report.descricaoProduto_15}</td>
                <td>{report.quantidadeProduto_15}</td>
                <td>{report.observacao_15}</td>
              </tr>
            )}
            {report.filialOrigem_16 !== "" && (
              <tr>
                <td>{report.filialOrigem_16}</td>
                <td>{report.notaFiscal_16}</td>
                <td>{report.tipoOperacao_16}</td>
                <td>{report.codigo_16}</td>
                <td>{report.descricaoProduto_16}</td>
                <td>{report.quantidadeProduto_16}</td>
                <td>{report.observacao_16}</td>
              </tr>
            )}
            {report.filialOrigem_17 !== "" && (
              <tr>
                <td>{report.filialOrigem_17}</td>
                <td>{report.notaFiscal_17}</td>
                <td>{report.tipoOperacao_17}</td>
                <td>{report.codigo_17}</td>
                <td>{report.descricaoProduto_17}</td>
                <td>{report.quantidadeProduto_17}</td>
                <td>{report.observacao_17}</td>
              </tr>
            )}
            {report.filialOrigem_18 !== "" && (
              <tr>
                <td>{report.filialOrigem_18}</td>
                <td>{report.notaFiscal_18}</td>
                <td>{report.tipoOperacao_18}</td>
                <td>{report.codigo_18}</td>
                <td>{report.descricaoProduto_18}</td>
                <td>{report.quantidadeProduto_18}</td>
                <td>{report.observacao_18}</td>
              </tr>
            )}
            {report.filialOrigem_19 !== "" && (
              <tr>
                <td>{report.filialOrigem_19}</td>
                <td>{report.notaFiscal_19}</td>
                <td>{report.tipoOperacao_19}</td>
                <td>{report.codigo_19}</td>
                <td>{report.descricaoProduto_19}</td>
                <td>{report.quantidadeProduto_19}</td>
                <td>{report.observacao_19}</td>
              </tr>
            )}
            {report.filialOrigem_20 !== "" && (
              <tr>
                <td>{report.filialOrigem_20}</td>
                <td>{report.notaFiscal_20}</td>
                <td>{report.tipoOperacao_20}</td>
                <td>{report.codigo_20}</td>
                <td>{report.descricaoProduto_20}</td>
                <td>{report.quantidadeProduto_20}</td>
                <td>{report.observacao_20}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="report-footer">
        <div className="row">
          <div className="col footer-divisions">
            <div className="sign">
              <div className="label">Conferente do CD</div>
              <div className="sign-line">
                <h6>{report.conferente}</h6>
              </div>
            </div>
          </div>
          <div className="col footer-divisions">
            <div className="orientations">
              Declaro que efetuei a conferência dos produtos relacionados e que estes foram carregados em perfeitas condições e nas quantidades de acordo com o relatório descrito acima.
            </div>
            <div className="sign">
              <div className="label">Transportador</div>
              <div className="sign-line">_______________________________________________________________________________</div>
              <div className="label mt-2">RG ou CPF</div>
              <div className="sign-line">_______________________________________________________________________________</div>
            </div>
          </div>
          <div className="col footer-divisions">
            <div className="orientations">
              Declaro que efetuei a conferência dos produtos relacionados e que recebi em perfeitas condições e nas quantidades de acordo com o relatório descrito acima.
            </div>
            <div className="sign">
              <div className="label">Conferente de loja</div>
              <div className="sign-line">_______________________________________________________________________________</div>
              <div className="label mt-2">Data do recebimento</div>
              <div className="sign-line">__________ / __________ / _____________________</div>
            </div>
          </div>
        </div>
        <div className="row data mt-3">
          <div className="col">Impresso em {dataDeImpressao}</div>
        </div>
      </div>
    </div>
  );
}
