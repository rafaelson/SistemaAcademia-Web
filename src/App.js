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
                <Nav.Link href="#home">Membros</Nav.Link>
                <Nav.Link href="#link">Planos de Treino</Nav.Link>
                <Nav.Link href="#link">Treinadores</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Membros />
      </Stack>
    </>
  );
}

export default App;
