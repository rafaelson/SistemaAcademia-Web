import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Container,
  Nav,
  Stack,
  Form,
  Button,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import { useState } from "react";

function App() {
  const [secaoAtual, setSecaoAtual] = useState(0);

  return (
    <>
      <Stack style={{ height: "100vh" }}>
        <Navbar
          style={{
            backgroundColor: "#2ec4b6",
            height: "80px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Container>
            <Nav>Academia</Nav>
          </Container>
        </Navbar>
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
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </Container>
          </Form>
        </div>
      </Stack>
    </>
  );
}

export default App;
