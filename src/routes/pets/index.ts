import { FastifyPluginAsync } from "fastify";
import PetController from "./controller";
// import { database } from "../../utilities/database";
// import { PetRequest } from "./types";

const pets: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/", PetController.Add);
  fastify.get("/:pet_id", PetController.Get);
  fastify.post("/:pet_id/history", PetController.AddVaccineHistory);
  fastify.put("/:pet_id", PetController.Update);
  fastify.post("/:pet_id", PetController.UploadPetPhoto)
  fastify.delete("/:pet_id", PetController.Delete);
  
  // fastify.addHook("onRequest", fastify.authenticate);
  // fastify.addHook("preValidation", async (req: PetRequest, rep) => {
  //   const id_params = +req.params.pet_id;
  //   if (!id_params) {
  //     if (req.routerPath != "/pets" && req.routerMethod != "POST") rep.badRequest();
  //   }

  //   try {
  //     const pet = await database.pet.findFirst({ where: { id: id_params, user_id: req.user.id }})
  //     if (!pet) return rep.forbidden();
  //   } catch (error) {
  //     return rep.internalServerError(error);
  //   }
  // });
};

export default pets;
