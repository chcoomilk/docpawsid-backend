import { Pet, VaccineHistory } from "@prisma/client";
import { FastifyRequest, FastifyReply } from "fastify";

export type PetRequest = FastifyRequest<{
  Params: {
    pet_id: number
  },
  Body: Pet
}>;

export type PetVaccineHistoryRequest = FastifyRequest<{
  Params: {
    pet_id: number,
  },
  Body: VaccineHistory
}>;

export type PetReply = FastifyReply;
