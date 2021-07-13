import { FastifyPluginAsync } from "fastify";
import { database } from "../../utilities/database";
import { validate_user_input } from "../../utilities/sanitize_inputs";
import { UserRequest } from "./types";

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/:user_id", async (req: UserRequest, rep) => {
    const user = database.user.findUnique({
      where: {
        id: Number(req.params.user_id)
      },
      include: {
        City: true
      }
    });

    if (!user) {
      return rep.notFound();
    }

    return user;
  });

  fastify.post("/", async (req: UserRequest, rep) => {
    const error = validate_user_input(req.body);

    if (error) {
      return rep.badRequest(error);
    }

    try {
      const res = await database.user.create({
        data: {
          email: req.body.email,
          name: req.body.name,
          phone_number: req.body.phone_number,
          city_id: req.body.city_id,
          province_id: req.body.province_id,
        }
      });

      rep.status(201);
      return res;
    } catch (error) {
      return rep.unprocessableEntity(error);
    }
  });
};

export default users;
