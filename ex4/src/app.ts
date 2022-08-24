import express from "express";
import "express-async-errors";

const app = express();

app.get("/fruits", (request, response) => {
  response.statusCode = 200; //OPZIONALE, TEST SUPERATO ANCHE SE MANCANTE

  response.setHeader("Content-Type", "application/json"); //OPZIONALE, TEST SUPERATO ANCHE SE MANCANTE

  response.json([
    { name: "Apples", quantity: "300" },
    { name: "Grapefruits", quantity: "400" },
    { name: "Bananas", quantity: "500" },
    { name: "Grape", quantity: "100" },
  ]);

  //ALTERNATIVA

  /*   const jsonMe = JSON.stringify([
    { name: "Apples", quantity: "300" },
    { name: "Grapefruits", quantity: "400" },
    { name: "Bananas", quantity: "500" },
    { name: "Grape", quantity: "100" },
  ])

  response.send(jsonMe) */
});

export default app;
