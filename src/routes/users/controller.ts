import { FastifyInstance } from "fastify";
import { database } from "../../utilities/database";
import { oAuth2Client } from "../../utilities/google";
import HttpStatusCode from "../../utilities/http";
import { validate_user_input } from "./helper";
import { UserReply, UserRequest } from "./types";

const UserController = {
  async Delete(req: UserRequest, rep: UserReply) {
    const user = await database.user.delete({
      where: {
        id: +req.params.user_id
      }
    });

    return { "uid": user.uid }
  },

  async GetAll(req: UserRequest, rep: UserReply) {
    const users = await database.user.findMany({
      select: {
        id: false,
        uid: true,
        city_id: true,
        email: true,
        name: true,
        phone_number: true,
        profile_picture_url: true,
        province_id: true,
        username: true
      }
    });
    return users;
  },

  async Get(req: UserRequest, rep: UserReply) {
    const user_id = +req.params.user_id;
    if (!user_id) return rep.notFound();

    try {
      const user = await database.user.findUnique({
        where: {
          uid: user_id.toString()
        },
        select: {
          id: false,
          uid: true,
          city_id: false,
          email: true,
          name: true,
          phone_number: true,
          profile_picture_url: true,
          province_id: false,
          username: true,
          City: true,
          Province: true,
          Pet: true
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
          uid: req.body.uid,
          email: req.body.email,
          username: req.body.username,
          name: req.body.name,
          phone_number: req.body.phone_number,
          city_id: req.body.city_id,
          province_id: req.body.province_id,
        }
      });

      const removed_id: any = res;
      delete removed_id.id;
      rep.status(HttpStatusCode.CREATED);
      return removed_id;
    } catch (error) {
      return rep.unprocessableEntity(error);
    }
  },

  async Update(req: UserRequest, rep: UserReply) {
    const user_id = +req.params.user_id;

    try {
      const res = await database.user.update({
        where: {
          id: user_id
        },
        data: {
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
  },

  async GoogleLogin(fastify: FastifyInstance, req: UserRequest, rep: UserReply) {
    const id_token = req.headers.id_token;
    try {
      const ticket = await oAuth2Client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.email) {
        return rep.internalServerError("Cannot get user's email address");
      }

      let user = await database.user.findUnique({
        where: {
          email: payload.email
        }
      });

      if (!user) {
        user = await database.user.create({
          data: {
            uid: "fix this",
            email: payload.email,
            username: payload.given_name,
            name: payload.name,
            profile_picture_url: payload.picture
          }
        });
      }

      const token = fastify.jwt.sign({
        id: user.id
      });

      return { token };
    } catch (error) {
      return rep.internalServerError(error);
    }
  }
}

export default UserController;
