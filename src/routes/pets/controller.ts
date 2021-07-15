import { database } from "../../utilities/database";
import HttpStatusCode from "../../utilities/http";
import { validate_vaccine_input } from "../vaccines/helper";
import { PetReply, PetRequest, PetVaccineHistoryRequest } from "./types";

const PetController = {
  async Get(req: PetRequest, rep: PetReply) {
    const pet_id = +req.params.pet_id;
    if (!pet_id) return rep.notFound();

    try {
      const pet = await database.pet.findUnique({
        where: {
          id: pet_id
        },
        include: {
          VaccineHistory: {
            include: {
              vaccine_photo: true
            }
          }
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
      const user = await database.user.findUnique({
        where: {
          id: req.body.user_id
        }
      });
      if (!user) return rep.badRequest("user not found");
      console.log(user);
      
      const res = await database.pet.create({
        data: {
          name: req.body.name,
          user_id: user.id,
          breed: req.body.breed,
          is_cat_friendly: req.body.is_cat_friendly,
          is_child_friendly: req.body.is_child_friendly,
          color: req.body.color,
          date_of_birth: req.body.date_of_birth,
          is_dog_friendly: req.body.is_dog_friendly,
          gender: req.body.gender,
          is_microchipped: req.body.is_microchipped,
          is_neutered: req.body.is_neutered,
          species: req.body.species
        }
      });

      rep.status(HttpStatusCode.CREATED);
      return res;
    } catch (error) {
      console.log(error);
      
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
  },

  async AddVaccineHistory(req: PetVaccineHistoryRequest, rep: PetReply) {
    const pet_id = +req.params.pet_id;
    if (!pet_id) return rep.notFound();

    const error = validate_vaccine_input(req.body);
    if (error) return rep.badRequest(error);

    try {
      const pet = await database
        .pet
        .findUnique({ where: { id: pet_id } })
        .catch(error => {
          return rep.internalServerError(error)
        });
      if (!pet) return rep.notFound();

      const res = await database.vaccineHistory.create({
        data: {
          pet_id: pet.id,
          date_administered: new Date(req.body.date_administered || new Date()),
          date_valid_until: new Date(req.body.date_valid_until || new Date()),
          vaccine_type_id: req.body.vaccine_type_id
        }
      });

      rep.status(HttpStatusCode.CREATED);
      return res;
    } catch (error) {
      return rep.unprocessableEntity(error);
    }
  },

  async UploadPetPhoto() {
    
  }
};

export default PetController;
