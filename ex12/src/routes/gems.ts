import express, { Router } from "express";

import prisma from "../lib/prisma/client";

import {
    validate,
    gemsSchema,
    GemsData,
    validationErrorMiddleware,
} from "../lib/middleware/validation";

import { initMulterMiddleware } from "../lib/middleware/multer";

const upload = initMulterMiddleware();

const router = Router();

router.get("/", async (request, response) => {
    const gems = await prisma.gems.findMany();

    response.json(gems);
});

router.get("/:id(\\d+)", async (request, response, next) => {
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

router.post("/", async (request, response) => {
    const gem = request.body;

    response.status(201).json(gem);
});

router.put(
    "/:id(\\d+)",
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

router.delete("/:id(\\d+)", async (request, response, next) => {
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

router.post(
    "/:id(\\d+)/photo",
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

export default router;
