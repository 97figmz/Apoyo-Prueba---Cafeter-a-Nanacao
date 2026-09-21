const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    test("GET /cafes debe retornar status 200 y un arreglo con al menos un objeto", async () => {
        const response = await request(server).get("/cafes");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(typeof response.body[0]).toBe("object");
    });

    test("DELETE /cafes/:id debe retornar status 404 si el cafe no existe", async () => {
        const idInexistente = 999;

        const response = await request(server)
            .delete(`/cafes/${idInexistente}`)
            .set("Authorization", "token");

        expect(response.statusCode).toBe(404);
    });

    test("POST /cafes debe agregar un nuevo cafe y retornar status 201", async () => {
        const nuevoCafe = {
            id: 5,
            nombre: "Latte"
        };

        const response = await request(server)
            .post("/cafes")
            .send(nuevoCafe);

        expect(response.statusCode).toBe(201);
        expect(response.body).toContainEqual(nuevoCafe);
    });

    test("PUT /cafes/:id debe retornar status 400 si el id del parametro es diferente al del payload", async () => {
        const cafe = {
            id: 2,
            nombre: "Cafe actualizado"
        };

        const response = await request(server)
            .put("/cafes/1")
            .send(cafe);

        expect(response.statusCode).toBe(400);
    });

});