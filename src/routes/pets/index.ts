import { FastifyPluginAsync } from "fastify";
import PetController from "./controller";

const pets: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/:pet_id", PetController.Get);
  fastify.post("/", PetController.Add);
  fastify.post("/:pet_id/history", PetController.AddVaccineHistory)
  fastify.put("/:pet_id", PetController.Update);
  fastify.post("/:pet_id", PetController.UploadPetPhoto)
  fastify.delete("/:pet_id", PetController.Delete);
};

export default pets;
