import { database } from "../../utilities/database";
import HttpStatusCode from "../../utilities/http";
import { PetReply, PetRequest } from "./types";

const PetController = {
  async Get(req: PetRequest, rep: PetReply) {
    const pet_id = +req.params.pet_id;
    if (!pet_id) return rep.notFound();

    try {
      const pet = await database.pet.findUnique({
        where: {
          id: pet_id
        }
      });

      if (!pet) {
        return rep.notFound();
      }

      return pet;
    } catch (error) {
      rep.internalServerError(error);
    }
  },

  async Add(req: PetRequest, rep: PetReply) {
    try {
      const res = await database.pet.create({
        data: {
          name: req.body.name,
          user_id: req.user.id,
          breed: req.body.breed,
          is_cat_friendly: req.body.is_cat_friendly,
          is_child_friendly: req.body.is_child_friendly,
          color: req.body.color,
          date_of_birth: req.body.date_of_birth,
          is_dog_friendly: req.body.is_dog_friendly,
          gender: req.body.gender,
          is_microchipped: req.body.is_microchipped,
          is_neutered: req.body.is_neutered,
        }
      });

      rep.status(HttpStatusCode.CREATED);
      return res;
    } catch (error) {
      return rep.unprocessableEntity(error);
    }
  },

  async Update(req: PetRequest, rep: PetReply) {
    const pet_id = +req.params.pet_id;
    if (!pet_id) return rep.notFound();

    try {
      const res = await database.pet.update({
        where: {
          id: pet_id
        },
        data: {
          name: req.body.name,
          breed: req.body.breed,
          is_cat_friendly: req.body.is_cat_friendly,
          is_child_friendly: req.body.is_child_friendly,
          color: req.body.color,
          date_of_birth: req.body.date_of_birth,
          is_dog_friendly: req.body.is_dog_friendly,
          gender: req.body.gender,
          is_microchipped: req.body.is_microchipped,
          is_neutered: req.body.is_neutered,
        }
      });

      rep.status(HttpStatusCode.OK);
      return res;
    } catch (error) {
      return rep.unprocessableEntity(error);
    }
  },

  async Delete(req: PetRequest, rep: PetReply) {
    const pet_id = +req.params.pet_id;
    if (!pet_id) return rep.notFound();

    try {
      await database.pet.delete({
        where: {
          id: pet_id
        },
      });
      
      return rep.status(HttpStatusCode.OK);
    } catch (error) {
      rep.notFound(error);
    }
  } 
};

export default PetController;
