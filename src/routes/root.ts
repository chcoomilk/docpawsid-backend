import { FastifyPluginAsync, FastifyRequest } from 'fastify'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  });

  fastify.get("/uploads/:file_name", async (req: FastifyRequest<{
    Params: {
      file_name: string
    }
  }>, rep) => {
    const file_name = req.params.file_name
    return rep.sendFile("users/" + file_name);
  });
}

export default root;
