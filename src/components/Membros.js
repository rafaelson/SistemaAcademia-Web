import { Container, Form, Button, Row, Col } from "react-bootstrap";
import TableAuto from "./TableAuto";
import { GetMembros } from "../services/serviceMembros";
import { useState, useEffect } from "react";

export default function Membros() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Função assíncrona para buscar os dados
    const fetchData = async () => {
      try {
        const response = await GetMembros();
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar membros:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Form>
        <Container>
          <Row>
            <Col>
              <Row>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" />
                </Form.Group>
              </Row>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Data de nascimento</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Telefone</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="success" type="submit">
            Salvar
          </Button>
          <Button variant="primary" type="submit">
            Novo membro
          </Button>
          <TableAuto
            colunasTabela={["Nome", "Data de Nascimento", "Email", "Telefone"]}
            membrosAtuais={data}
          />
        </Container>
      </Form>
    </div>
  );
}
