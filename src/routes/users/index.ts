import { FastifyPluginAsync } from "fastify";
import UserController from "./controller";

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/:user_id", UserController.Get);
  fastify.put("/:user_id", UserController.Update);
  fastify.post("/register", UserController.Add);
  fastify.post("/login", UserController.Login);
};

export default users;
