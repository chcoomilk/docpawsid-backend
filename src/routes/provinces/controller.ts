import { database } from "../../utilities/database";
import { FastifyRequest, FastifyReply } from "fastify";
import { City, Province } from "@prisma/client";

const CityController = {
  async DeleteCity(req: FastifyRequest<{
    Params: {
      city_id: string
    }
  }>, rep: FastifyReply) {
    let res = await database.city.delete({
      where: {
        id: +req.params.city_id
      }
    });

    return res;
  },

  async Delete(req: FastifyRequest<{
    Params: {
      province_id: string
    }
  }>, rep: FastifyReply) {
    let res = await database.province.delete({
      where: {
        id: +req.params.province_id
      }
    });

    return res;
  },

  async Add(req: FastifyRequest<{
    Body: Province
  }>, rep: FastifyReply) {
    try {
      const province = await database.province.create({
        data: {
          name: req.body.name
        }
      });
      return province;
    } catch (error) {
      return rep.internalServerError(error);
    }
  },

  async AddCity(req: FastifyRequest<{
    Body: City
  }>, rep: FastifyReply) {
    try {
      const city = await database.city.create({
        data: {
          name: req.body.name
        }
      });
      return city;
    } catch (error) {
      console.log(error);
      
      return rep.internalServerError(error);
    }
  },

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