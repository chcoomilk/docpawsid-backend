import { database } from "../../utilities/database";
import { FastifyRequest, FastifyReply } from "fastify";

const CityController = {
  async GetAll(req: FastifyRequest, rep: FastifyReply) {
    const cities = await database.city.findMany();
    return cities;
  }
};

export default CityController;