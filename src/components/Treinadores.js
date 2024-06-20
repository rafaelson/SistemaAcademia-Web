import { Container, Form, Button, Row, Col } from "react-bootstrap";
import TableAuto from "./TableAuto";
import {
  DeleteTreinador,
  GetTreinadores,
  PostTreinador,
  PutTreinador,
} from "../services/serviceTreinadores";
import { useState, useEffect } from "react";

export default function Treinadores() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [treinadorEditado, setTreinadorEditado] = useState(undefined);
  const [nomeValue, setNomeValue] = useState("");
  const [dataNascimentoValue, setDataNascimentoValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [telefoneValue, setTelefoneValue] = useState("");

  const handleNomeValueChange = (e) => {
    setNomeValue(e.target.value);
  };

  const handleDataNascimentoValueChange = (e) => {
    setDataNascimentoValue(e.target.value);
  };

  const handleEmailValueChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handleTelefoneValueChange = (e) => {
    setTelefoneValue(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await GetTreinadores();
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar treinadores:", error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const payload = {
      nome: nomeValue,
      dataNascimento: dataNascimentoValue,
      email: emailValue,
      telefone: telefoneValue,
    };

    try {
      if (edit) {
        payload.id = treinadorEditado;
        await PutTreinador(payload);
        setEdit(false);
      } else {
        await PostTreinador(payload);
      }

      // Clear form fields
      setNomeValue("");
      setDataNascimentoValue("");
      setEmailValue("");
      setTelefoneValue("");

      // Fetch updated data
      fetchData();
    } catch (error) {
      console.error("Erro ao salvar treinador:", error);
    }
  };

  const handleClickEdit = (e) => {
    const treinadorId = e.target.getAttribute("item-id");
    const treinadorEditar = data.find((e) => e.id == treinadorId);

    setTreinadorEditado(treinadorId);

    setNomeValue(treinadorEditar.nome);
    setDataNascimentoValue(treinadorEditar.dataNascimento);
    setEmailValue(treinadorEditar.email);
    setTelefoneValue(treinadorEditar.telefone);

    setEdit(true);
  };

  const handleClickDelete = async (e) => {
    const treinadorId = e.target.getAttribute("item-id");

    try {
      await DeleteTreinador(treinadorId);
      // Fetch updated data
      fetchData();
    } catch (error) {
      console.error("Erro ao deletar treinador:", error);
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
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={emailValue}
                    onChange={handleEmailValueChange}
                  />
                </Form.Group>
              </Row>
            </Col>
            <Col>
              <Row>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicDataNascimento"
                >
                  <Form.Label>Data de Nascimento</Form.Label>
                  <Form.Control
                    type="date"
                    value={dataNascimentoValue}
                    onChange={handleDataNascimentoValueChange}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-3" controlId="formBasicTelefone">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    type="text"
                    value={telefoneValue}
                    onChange={handleTelefoneValueChange}
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
            Novo Treinador
          </Button>
          <TableAuto
            colunasTabela={[
              "Nome",
              "Data de Nascimento",
              "Email",
              "Telefone",
              "Ação",
            ]}
            membrosAtuais={data}
            handleClickEdit={handleClickEdit}
            handleClickDelete={handleClickDelete}
            entidade={2}
          />
        </Container>
      </Form>
    </div>
  );
}
