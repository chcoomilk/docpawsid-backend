import { Pet } from "@prisma/client";
import { FastifyRequest, FastifyReply } from "fastify";

export type PetRequest = FastifyRequest<{
  Params: {
    pet_id: number
  },
  Body: Pet
}>;

export type PetReply = FastifyReply;
