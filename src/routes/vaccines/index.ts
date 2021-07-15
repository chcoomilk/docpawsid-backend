import { FastifyPluginAsync } from "fastify";
import VaccineController from "./controller";

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", VaccineController.GetAllVaccineTypes);
  fastify.post("/", VaccineController.AddVaccineType);
  fastify.put("/history/:vaccine_history_id", VaccineController.UpdateVaccineHistory);
  fastify.post("/history/:vaccine_history_id", VaccineController.UploadVaccineHistoryPhoto);
};

export default users;
