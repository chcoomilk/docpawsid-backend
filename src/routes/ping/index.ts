import { FastifyPluginAsync } from "fastify"

const ping: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (req, reply) {
    fastify.log.info(req.headers.authorization);
    if (req.headers.authorization) {
      reply.send("pong")
    } else {
      reply.unauthorized("no authorization provided")
    }
  });

  fastify.addHook("onSend", async (req, reply) => {
    fastify.log.info("sending")
  });
}

export default ping;
