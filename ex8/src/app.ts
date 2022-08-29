import express from "express";
import "express-async-errors";

import prisma from "./lib/prisma/client";

const app = express();

app.use(express.json());

app.get("/gems", async (request, response) => {
    const gems = await prisma.gems.findMany();

    response.json(gems);
});

app.post("/gems", async (request, response) => {
    const gem = request.body;

    response.status(201).json(gem);
});

export default app;
