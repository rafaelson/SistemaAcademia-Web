import { Button, Table } from "react-bootstrap";

export default function TableAuto(props) {
  const populaColunas = (cols) => cols.map((col) => <th>{col}</th>);
  const numColunas = props.colunasTabela.length;

  const populaLinhas = (itens, entidade) =>
    itens.map((item) => {
      if (entidade == 0) {
        // membros
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
      } else if (entidade == 1) {
        // PlanosTreino
        return (
          <tr>
            <td>{item.id}</td>
            <td>{item.nome}</td>
            <td>{item.descricao}</td>
            {/* <td>{item.treinadorId}</td> */}
            <td>
              {props.treinadores.find((e) => e.id === item.treinadorId)?.nome ||
                "Treinador não encontrado"}
            </td>
            <td>
              {props.membros.find((e) => e.id === item.membroId)?.nome ||
                "Membro não encontrado"}
            </td>
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
      } else if (entidade == 2) {
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
      }
    });

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          {populaColunas(props.colunasTabela)}
        </tr>
      </thead>
      <tbody>{populaLinhas(props.membrosAtuais, props.entidade)}</tbody>
    </Table>
  );
}
