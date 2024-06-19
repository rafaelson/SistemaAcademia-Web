import { Button, Table } from "react-bootstrap";

export default function TableAuto(props) {
  const populaColunas = (cols) => cols.map((col) => <th>{col}</th>);
  const numColunas = props.colunasTabela.length;

  const populaLinhas = (itens) =>
    itens.map((item) => {
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.nome}</td>
          <td>{item.dataNascimento}</td>
          <td>{item.email}</td>
          <td>{item.telefone}</td>
          <td>
            <Button
              variant="danger"
              item-id={item.id}
              onClick={props.handleClickDelete}
            >
              Excluir
            </Button>
            <Button item-id={item.id} onClick={props.handleClickEdit}>
              Editar
            </Button>
          </td>
        </tr>
      );
    });

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          {populaColunas(props.colunasTabela)}
        </tr>
      </thead>
      <tbody>{populaLinhas(props.membrosAtuais)}</tbody>
    </Table>
  );
}
