import { Container, Form, Button, Row, Col } from "react-bootstrap";
import TableAuto from "./TableAuto";
import {
  DeleteMembro,
  GetMembros,
  PostMembro,
  PutMembro,
} from "../services/serviceMembros";
import { useState, useEffect } from "react";

export default function Membros() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [membroEditado, setMembroEditado] = useState(undefined);
  const [nomeValue, setNomeValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [telefoneValue, setTelefoneValue] = useState("");

  const handleNomeValueChange = (e) => {
    setNomeValue(e.target.value);
  };

  const handleEmailValueChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handleDateValueChange = (e) => {
    setDateValue(e.target.value);
  };

  const handleTelefoneValueChange = (e) => {
    setTelefoneValue(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await GetMembros();
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar membros:", error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const payload = {
      nome: nomeValue,
      email: emailValue,
      dataNascimento: dateValue,
      telefone: telefoneValue,
    };

    try {
      if (edit) {
        payload.id = membroEditado;
        await PutMembro(payload);
        setEdit(false);
      } else {
        await PostMembro(payload);
      }

      // Clear form fields
      setNomeValue("");
      setEmailValue("");
      setDateValue("");
      setTelefoneValue("");

      // Fetch updated data
      fetchData();
    } catch (error) {
      console.error("Erro ao salvar membro:", error);
    }
  };

  const handleClickEdit = (e) => {
    const membroId = e.target.getAttribute("item-id");
    const membroEditar = data.find((e) => e.id == membroId);

    setMembroEditado(membroId);

    setNomeValue(membroEditar.nome);
    setEmailValue(membroEditar.email);
    setDateValue(membroEditar.dataNascimento);
    setTelefoneValue(membroEditar.telefone);

    setEdit(true);
  };

  const handleClickDelete = async (e) => {
    const membroId = e.target.getAttribute("item-id");

    try {
      await DeleteMembro(membroId);
      // Fetch updated data
      fetchData();
    } catch (error) {
      console.error("Erro ao deletar membro:", error);
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
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    value={emailValue}
                    onChange={handleEmailValueChange}
                  />
                </Form.Group>
              </Row>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicDate">
                <Form.Label>Data de nascimento</Form.Label>
                <Form.Control
                  type="date"
                  value={dateValue}
                  onChange={handleDateValueChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicTelefone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  value={telefoneValue}
                  onChange={handleTelefoneValueChange}
                />
              </Form.Group>
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
            Novo membro
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
          />
        </Container>
      </Form>
    </div>
  );
}
