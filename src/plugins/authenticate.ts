import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify";
import fp from "fastify-plugin";

export default fp(async (fastify) => {
  fastify.decorate("authenticate", async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      await req.jwtVerify(); 
    } catch (error) {
      return reply.unauthorized(error);
    }
  });
});

declare module "fastify" {
  export interface FastifyInstance {
    authenticate(): string;
  }
};
