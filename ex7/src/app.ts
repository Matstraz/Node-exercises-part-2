import express from "express";
import "express-async-errors";

import prisma from "./lib/prisma/client";

const app = express();

app.get("/gems", async (request, response) => {
    const planets = await prisma.gems.findMany();

    response.json(planets);
});

export default app;
