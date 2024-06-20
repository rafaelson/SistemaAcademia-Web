import Api from "../helpers/api";

export async function GetTreinadores() {
  return await Api.get("/api/Treinadores");
}

export async function GetTreinadorById(id) {
  return await Api.get(`/api/Treinadores/${id}`);
}

export async function PostTreinador(Treinador) {
  return await Api.post("/api/Treinadores/", Treinador);
}
export async function PutTreinador(Treinador) {
  return await Api.put("/api/Treinadores/", Treinador);
}

export async function DeleteTreinador(id) {
  return await Api.delete(`/api/Treinadores/${id}`);
}
