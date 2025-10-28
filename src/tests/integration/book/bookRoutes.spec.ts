import request from "supertest";
import app from "../../../app";

describe("Book Routes", () => {
  it("deve retornar lista de livros disponíveis", async () => {
    const response = await request(app).get("/api/books");
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("deve cadastrar um novo livro (mock)", async () => {
 
    const mockUser = { _id: "123abc", nome: "Maria" };

  
    const response = await request(app)
      .post("/api/books")
      .send({
        titulo: "O Pequeno Príncipe",
        autor: "Antoine de Saint-Exupéry",
        condicao: "Usado"
      });


    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });
});
