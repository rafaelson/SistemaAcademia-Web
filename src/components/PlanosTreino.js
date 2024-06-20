import { Container, Form, Button, Row, Col } from "react-bootstrap";
import TableAuto from "./TableAuto";
import {
  DeletePlanoDeTreino,
  GetPlanoDeTreinos,
  PostPlanoDeTreino,
  PutPlanoDeTreino,
} from "../services/servicePlanosDeTreino";
import { GetTreinadores } from "../services/serviceTreinadores";
import { GetMembros } from "../services/serviceMembros";
import { useState, useEffect } from "react";

export default function PlanosTreino() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [planoEditado, setPlanoEditado] = useState(undefined);
  const [nomeValue, setNomeValue] = useState("");
  const [descricaoValue, setDescricaoValue] = useState("");
  const [treinadores, setTreinadores] = useState([]);
  const [membros, setMembros] = useState([]);
  const [treinadorId, setTreinadorId] = useState("");
  const [membroId, setMembroId] = useState("");

  useEffect(() => {
    async function fetchTreinadoresAndMembros() {
      try {
        const treinadoresResponse = await GetTreinadores();
        setTreinadores(treinadoresResponse.data);

        const membrosResponse = await GetMembros();
        setMembros(membrosResponse.data);
      } catch (error) {
        console.error("Erro ao buscar treinadores e membros:", error);
      }
    }

    fetchTreinadoresAndMembros();
  }, []);

  const handleNomeValueChange = (e) => {
    setNomeValue(e.target.value);
  };

  const handleDescricaoValueChange = (e) => {
    setDescricaoValue(e.target.value);
  };

  const handleTreinadorIdChange = (e) => {
    setTreinadorId(e.target.value);
  };

  const handleMembroIdChange = (e) => {
    setMembroId(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await GetPlanoDeTreinos();
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar planos de treino:", error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const payload = {
      nome: nomeValue,
      descricao: descricaoValue,
      treinadorId: parseInt(treinadorId),
      membroId: parseInt(membroId),
    };

    try {
      if (edit) {
        payload.id = planoEditado;
        await PutPlanoDeTreino(payload);
        setEdit(false);
      } else {
        await PostPlanoDeTreino(payload);
      }

      // Clear form fields
      setNomeValue("");
      setDescricaoValue("");
      setTreinadorId("");
      setMembroId("");

      // Fetch updated data
      fetchData();
    } catch (error) {
      console.error("Erro ao salvar plano de treino:", error);
    }
  };

  const handleClickEdit = (e) => {
    const planoId = e.target.getAttribute("item-id");
    const planoEditar = data.find((e) => e.id == planoId);

    setPlanoEditado(planoId);

    setNomeValue(planoEditar.nome);
    setDescricaoValue(planoEditar.descricao);
    setTreinadorId(planoEditar.treinadorId.toString());
    setMembroId(planoEditar.membroId.toString());

    setEdit(true);
  };

  const handleClickDelete = async (e) => {
    const planoId = e.target.getAttribute("item-id");

    try {
      await DeletePlanoDeTreino(planoId);
      // Fetch updated data
      fetchData();
    } catch (error) {
      console.error("Erro ao deletar plano de treino:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Form>
        <Container>
          <Row>
            <Col>
              <Row>
                <Form.Group className="mb-3" controlId="formBasicNome">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    value={nomeValue}
                    onChange={handleNomeValueChange}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-3" controlId="formBasicTreinadorId">
                  <Form.Label>ID Treinador</Form.Label>
                  <Form.Control
                    as="select"
                    value={treinadorId}
                    onChange={handleTreinadorIdChange}
                  >
                    <option value="">Selecione um treinador...</option>
                    {treinadores.map((treinador) => (
                      <option key={treinador.id} value={treinador.id}>
                        {treinador.nome}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-3" controlId="formBasicMembroId">
                  <Form.Label>ID Membro</Form.Label>
                  <Form.Control
                    as="select"
                    value={membroId}
                    onChange={handleMembroIdChange}
                  >
                    <option value="">Selecione um membro...</option>
                    {membros.map((membro) => (
                      <option key={membro.id} value={membro.id}>
                        {membro.nome}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Row>
            </Col>
            <Col>
              <Row>
                <Form.Group className="mb-3" controlId="formBasicDescricao">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={descricaoValue}
                    onChange={handleDescricaoValueChange}
                  />
                </Form.Group>
              </Row>
            </Col>
          </Row>
          <Button
            variant="success"
            type="submit"
            onClick={handleClick}
            hidden={!edit}
          >
            Salvar
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleClick}
            hidden={edit}
          >
            Novo Plano de Treino
          </Button>
          <TableAuto
            colunasTabela={["Nome", "Descrição", "Treinador", "Membro", "Ação"]}
            membrosAtuais={data}
            handleClickEdit={handleClickEdit}
            handleClickDelete={handleClickDelete}
            entidade={1}
            membros={membros}
            treinadores={treinadores}
          />
        </Container>
      </Form>
    </div>
  );
}
