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
import Membros from "./components/Membros";
import Treinadores from "./components/Treinadores";
import PlanosTreino from "./components/PlanosTreino";

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
            <Navbar.Brand href="#home">Academia</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick={() => setSecaoAtual(0)}>Membros</Nav.Link>
                <Nav.Link onClick={() => setSecaoAtual(1)}>
                  Planos de Treino
                </Nav.Link>
                <Nav.Link onClick={() => setSecaoAtual(2)}>
                  Treinadores
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {secaoAtual === 0 && <Membros />}
        {secaoAtual === 1 && <PlanosTreino />}
        {secaoAtual === 2 && <Treinadores />}
      </Stack>
    </>
  );
}

export default App;
