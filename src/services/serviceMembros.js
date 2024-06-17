import Api from "../helpers/api";

export async function GetMembros() {
  return await Api.get("/api/Membros");
}

export async function GetMembroById(id) {
  return await Api.get(`/api/Membros/${id}`);
}

export async function PostMembro(Membro) {
  return await Api.post("/api/Membros/", Membro);
}
export async function PutMembro(Membro) {
  return await Api.put("/api/Membros/", Membro);
}

export async function DeleteMembro(id) {
  return await Api.delete(`/api/Membros/${id}`);
}

// export async function ListarTipos() {
//   return await Api.get("/Membro/GetTipos");
// }
