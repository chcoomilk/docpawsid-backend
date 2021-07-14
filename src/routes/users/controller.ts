import { database } from "../../utilities/database";
import HttpStatusCode from "../../utilities/http";
import { validate_user_input } from "./helper";
import { UserReply, UserRequest } from "./types";

const UserController = {
  async Get(req: UserRequest, rep: UserReply) {
    const user_id = +req.params.user_id;
    if (!user_id) return rep.notFound();

    try {
      const user = await database.user.findUnique({
        where: {
          id: user_id
        }
      });

      if (!user) {
        return rep.notFound();
      }

      return user;
    } catch (error) {
      rep.internalServerError(error);
    }
  },

  async Add(req: UserRequest, rep: UserReply) {
    const error = validate_user_input(req.body);
    if (error) return rep.badRequest(error);

    try {
      const res = await database.user.create({
        data: {
          email: req.body.email,
          username: req.body.username,
          name: req.body.name,
          phone_number: req.body.phone_number,
          city_id: req.body.city_id,
          province_id: req.body.province_id,
        }
      });

      rep.status(HttpStatusCode.CREATED);
      return res;
    } catch (error) {
      return rep.unprocessableEntity(error);
    }
  },

  async Update(req: UserRequest, rep: UserReply) {
    const user_id = +req.params.user_id;
    if (!user_id) return rep.notFound();

    const error = validate_user_input(req.body)
    if (error) return rep.badRequest(error);

    try {
      const res = await database.user.update({
        where: {
          id: user_id
        },
        data: {
          email: req.body.email,
          username: req.body.username,
          name: req.body.name,
          phone_number: req.body.phone_number,
          city_id: req.body.city_id,
          province_id: req.body.province_id,
        }
      });

      rep.status(HttpStatusCode.CREATED);
      return res;
    } catch (error) {
      return rep.unprocessableEntity(error);
    }
  },

  async Login(req: UserRequest, rep: UserReply) {
    return rep.notImplemented();
  }
}

export default UserController;
