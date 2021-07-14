import { FastifyPluginAsync } from "fastify";
import CityController from "./controller";

const cities: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", CityController.GetAll);
};

export default cities;
