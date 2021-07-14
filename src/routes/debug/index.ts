import { FastifyPluginAsync } from "fastify";

const debug: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (req, reply) {
    fastify.log.info(req.user.id);
    if (req.headers.authorization) {
      reply.send("pong");
    } else {
      reply.unauthorized("no authorization provided");
    }
  });

  fastify.addHook("onRequest", (req) => req.jwtVerify());
}

export default debug;
