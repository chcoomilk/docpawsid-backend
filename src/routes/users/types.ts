import { User } from "@prisma/client";
import { FastifyRequest, FastifyReply } from "fastify";

export type UserRequest = FastifyRequest<{
  Params: {
    user_id: number
  },
  Body: User
}>;

export type UserReply = FastifyReply;
