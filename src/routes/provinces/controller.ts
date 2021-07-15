import { database } from "../../utilities/database";
import { FastifyRequest, FastifyReply } from "fastify";

const CityController = {
  async GetAll(req: FastifyRequest, rep: FastifyReply) {
    try {
      const provinces = await database.province.findMany();
      return provinces;
    } catch (error) {
      return rep.internalServerError(error);
    }
  },
  
  async GetAllCities(req: FastifyRequest, rep: FastifyReply) {
    try {
      const cities = await database.city.findMany();
      return cities;
    } catch (error) {
      return rep.internalServerError(error);
    }
  }
};

export default CityController;