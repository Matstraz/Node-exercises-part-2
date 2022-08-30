import express from "express";
import "express-async-errors";
import cors from "cors";

import prisma from "./lib/prisma/client";

import {
    validate,
    gemsSchema,
    GemsData,
    validationErrorMiddleware,
} from "./lib/validation";

import { initMulterMiddleware } from "./lib/middleware/multer";

const upload = initMulterMiddleware();

const corsOption = {
    origin: "http://localhost:8080",
};

const app = express();

app.use(cors(corsOption));

app.use(express.json());

app.get("/gems", async (request, response) => {
    const gems = await prisma.gems.findMany();

    response.json(gems);
});

app.get("/gems/:id(\\d+)", async (request, response, next) => {
    const gemId = Number(request.params.id);

    const gem = await prisma.gems.findUnique({
        where: { id: gemId },
    });

    if (!gem) {
        response.status(404);
        return next(`Cannot GET /planet/${gemId}`);
    }

    response.json(gem);
});

app.post("/gems", async (request, response) => {
    const gem = request.body;

    response.status(201).json(gem);
});

app.put(
    "/gems/:id(\\d+)",
    validate({ body: gemsSchema }),
    async (request, response, next) => {
        const gemId = Number(request.params.id);
        const gemData: GemsData = request.body;
        try {
            const gem = await prisma.gems.update({
                where: { id: gemId },
                data: gemData,
            });

            response.status(200).json(gem);
        } catch (error) {
            response.status(404);
            next(`Cannot PUT /gems/${gemId}`);
        }
    }
);

app.delete("/gems/:id(\\d+)", async (request, response, next) => {
    const gemsId = Number(request.params.id);
    try {
        await prisma.gems.delete({
            where: { id: gemsId },
        });

        response.status(204).end();
    } catch (error) {
        response.status(404);
        next(`Cannot DELETE /gems/${gemsId}`);
    }
});

app.post(
    "/gems/:id(\\d+)/photo",
    //il nome DEVE corrispondere con quello del NAME nel campo input del form
    upload.single("photo"),
    async (request, response, next) => {
        console.log("request.file", request.file);
        //Nel caso in cui NON sia presente il file da uploadare
        if (!request.file) {
            response.status(400);
            return next("No photo file uploaded");
        }
        //Nel caso in cui sia presente il file da uploadare
        const photoFilename = request.file.filename;

        response.status(201).json({ photoFilename });
    }
);

app.use(validationErrorMiddleware);

export default app;
