import { VaccineHistory, VaccineType } from "@prisma/client";
import { FastifyRequest, FastifyReply } from "fastify";

export type VaccineRequest = FastifyRequest<{
  Params: {
    vaccine_id: number
  },
  Body: VaccineType
}>;

export type VaccineHistoryRequest = FastifyRequest<{
  Params: {
    vaccine_history_id: number
  },
  Body: VaccineHistory
}>;

export type VaccineHistoryPhotoRequest = FastifyRequest<{
  Params: {
    vaccine_history_id: number
  }
}>;

export type VaccineReply = FastifyReply;
