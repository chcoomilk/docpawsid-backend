import { User } from "@prisma/client";
import { FastifyRequest, FastifyReply } from "fastify";

// update accordingly with database 
export const UserBody = {
  type: "object",
  required: ["username"]
};

export type UserRequest = FastifyRequest<{
  Headers: {
    id_token: string
  },
  Params: {
    user_id: number,
  },
  Body: User
}>;

export type UserReply = FastifyReply;
