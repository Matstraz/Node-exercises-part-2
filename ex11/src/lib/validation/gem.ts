import { Static, Type } from "@sinclair/typebox";

export const gemsSchema = Type.Object(
    {
        name: Type.String(),
        description: Type.Optional(Type.String()),
        clarity: Type.String(),
        value: Type.Integer(),
    },
    { additionalProperties: false }
);

export type GemsData = Static<typeof gemsSchema>;
