import { FastifyPluginAsync } from "fastify";
import CityController from "./controller";

const provinces: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/cities", CityController.GetAllCities);
  fastify.post("/cities", CityController.AddCity);
  fastify.delete("/cities/:city_id", CityController.DeleteCity);
  fastify.get("/", CityController.GetAll);
  fastify.post("/", CityController.Add);
  fastify.delete("/:province_id", CityController.Delete)
};

export default provinces;
