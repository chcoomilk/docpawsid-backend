import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify";
import fp from "fastify-plugin";

export default fp(async (fastify) => {
  fastify.decorate("verify_token", (req: FastifyRequest, reply: FastifyReply, done: () => void) => {
    fastify.log.info(`here is the token: ${req.headers.authorization}`);
    req.headers.authorization = "user_id";
    done();
  });
});

declare module "fastify" {
  export interface FastifyInstance {
    verify_token(): string;
  }
};
