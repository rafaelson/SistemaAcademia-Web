import Api from "../helpers/api";

export async function GetPlanoDeTreinos() {
  return await Api.get("/api/PlanosTreino");
}

export async function GetPlanoDeTreinoById(id) {
  return await Api.get(`/api/PlanosTreino/${id}`);
}

export async function PostPlanoDeTreino(PlanoDeTreino) {
  return await Api.post("/api/PlanosTreino/", PlanoDeTreino);
}
export async function PutPlanoDeTreino(PlanoDeTreino) {
  return await Api.put("/api/PlanosTreino/", PlanoDeTreino);
}

export async function DeletePlanoDeTreino(id) {
  return await Api.delete(`/api/PlanosTreino/${id}`);
}
