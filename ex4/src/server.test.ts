import supertest from "supertest";
import app from "./app";

const request = supertest(app);

test("GET /fruits", async () => {
  const response = await request
    .get("/fruits")
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8");

  const myBody = [
    { name: "Apples", quantity: "300" },
    { name: "Grapefruits", quantity: "400" },
    { name: "Bananas", quantity: "500" },
    { name: "Grape", quantity: "100" },
  ];

  expect(response.body).toEqual(myBody);
});
